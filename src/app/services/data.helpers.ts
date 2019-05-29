import { useRef, useState, useEffect } from 'react';
import { objToKey } from './common.helpers';
import {
  ApolloClient,
  ApolloError,
  OperationVariables,
  SubscriptionOptions
} from 'apollo-client';

export type OnSubscriptionData<TData> = (
  subscriptionData: TData,
  cacheData: TData
) => TData;

export interface SubscriptionHookResult<TData> {
  data?: TData;
  error?: ApolloError;
  fetching: boolean;
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
    fetching: true
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
    const sub = client
      .subscribe({
        ...sQuery
      })
      .subscribe(
        subscriptionResult => {
          let cacheResultData = client.readQuery({
            ...cQuery
          });
          if (onSubscriptionDataRef.current) {
            cacheResultData = onSubscriptionDataRef.current(
              subscriptionResult.data,
              cacheResultData
            );
            client.writeQuery({
              query: cacheQuery,
              data: cacheResultData,
              ...cOptions
            });
          }
        },
        error => {
          setResultBase({ fetching: false, error });
        }
      );
    return () => {
      sub.unsubscribe();
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
        ...cQuery
      })
      .subscribe(cacheResult => {
        // Set state data on updates to subject data
        // Set fetching to false, for UI fetching icon at first time load
        const newResult: SubscriptionHookResult<TData> = {
          data: cacheResult.data,
          error: undefined,
          fetching: false
        };
        setResultBase(newResult);
      });

    return () => {
      setResultBase({ fetching: true });
      sub.unsubscribe();
    };
  }, [cacheQuery, cOptions && objToKey(cOptions)]);

  return result;
}
