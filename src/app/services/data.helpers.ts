import { useRef, useState, useEffect } from 'react';
import { useApolloClient } from 'react-apollo-hooks';
import { Omit, objToKey } from './common.helpers';
import { DocumentNode } from 'graphql';
import {
  ApolloClient,
  ApolloError,
  OperationVariables,
  SubscriptionOptions
} from 'apollo-client';
import { Subscription } from 'react-apollo';

export type OnSubscriptionData<TData> = (
  options: OnSubscriptionDataOptions<TData>
) => TData;

export interface OnSubscriptionDataOptions<TData> {
  client: ApolloClient<any>;
  subscriptionData: SubscriptionHookResult<TData>;
}

export interface SubscriptionHookResult<TData> {
  data?: TData;
  subscriptionData?: TData;
  cacheData?: TData;
  error?: ApolloError;
  loading: boolean;
}

export interface SubscriptionHookOptions<TData, TCache = object> {
  client: ApolloClient<TCache>;
  skip?: boolean;
  onSubscriptionData?: OnSubscriptionData<TData>;
}

export function useSubscription<
  TData = any,
  TVariables = OperationVariables,
  TCache = object
>(
  { query: subscriptionQuery, ...sOptions }: SubscriptionOptions<TVariables>,
  { query: cacheQuery, ...cOptions }: SubscriptionOptions<TVariables>,
  { onSubscriptionData, ...hOptions }: SubscriptionHookOptions<TData, TCache>
): SubscriptionHookResult<TData> {
  const onSubscriptionDataRef = useRef<
    OnSubscriptionData<TData> | null | undefined
  >(null);
  const [result, setResultBase] = useState<SubscriptionHookResult<TData>>({
    loading: true
  });

  const sQuery = <SubscriptionOptions<TVariables>>{
    query: subscriptionQuery,
    ...sOptions
  };
  const cQuery = <SubscriptionOptions<TVariables>>{
    query: cacheQuery,
    ...cOptions
  };
  const client = hOptions.client;

  onSubscriptionDataRef.current = onSubscriptionData;

  useEffect(() => {
    if (hOptions.skip === true) {
      return;
    }
    const subscription = client
      .subscribe({
        ...sQuery
      })
      .subscribe(
        subscriptionResult => {
          let cacheResult = client.readQuery({
            query: cacheQuery,
            ...cOptions
          });
          const newResult = {
            subscriptionData: subscriptionResult.data,
            cacheData: cacheResult,
            error: undefined,
            loading: false
          };
          // setResultBase(newResult);
          if (onSubscriptionDataRef.current) {
            cacheResult = onSubscriptionDataRef.current({
              client,
              subscriptionData: newResult
            });
            client.writeQuery({
              query: cacheQuery,
              data: cacheResult,
              ...cOptions
            });
          }
        },
        error => {
          setResultBase({ loading: false, data: result.data, error });
        }
      );
    return () => {
      // setResultBase({ loading: true });
      subscription.unsubscribe();
    };
  }, [subscriptionQuery, sOptions && objToKey(sOptions)]);

  // Watch for updates to Apollo client cache. Uses the default cache-first
  // client policy, to check Apollo client cache for any data followed by
  // network/database.
  useEffect(() => {
    if (hOptions.skip) {
      return;
    }
    const sub = client
      .watchQuery({
        query: cacheQuery,
        ...cOptions
      })
      .subscribe({
        next({ data }: { data: any }) {
          // Set state data on updates to subject data
          // Set fetching to false, for UI fetching icon at first time load
          const newResult = {
            data,
            error: undefined,
            loading: false
          };
          setResultBase(newResult);
        }
      });

    return () => {
      setResultBase({ loading: true });
      sub.unsubscribe();
    };
  }, [cacheQuery, cOptions && objToKey(cOptions)]);
  return result;
}
