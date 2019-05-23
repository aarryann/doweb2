import { useRef, useState, useEffect } from 'react';
import { useApolloClient } from 'react-apollo-hooks';
import { objToKey } from './common.helpers';
import { DocumentNode } from 'graphql';
import {
  ApolloClient,
  ApolloError,
  OperationVariables,
  SubscriptionOptions
} from 'apollo-client';

export type OnSubscriptionData<TData> = (
  options: OnSubscriptionDataOptions<TData>
) => any;

export interface OnSubscriptionDataOptions<TData> {
  client: ApolloClient<any>;
  subscriptionData: SubscriptionHookResult<TData>;
}

export interface SubscriptionHookOptions<TData, TVariables, TCache = object> {
  skip?: boolean;
  onSubscriptionData?: OnSubscriptionData<TData>;
  client?: ApolloClient<TCache>;
}

export interface SubscriptionHookResult<TData> {
  data?: TData;
  error?: ApolloError;
  loading: boolean;
}

export function useSubscription<
  TData = any,
  TVariables = OperationVariables,
  TCache = object
>(
  query: DocumentNode,
  {
    onSubscriptionData,
    client: overrideClient,
    ...options
  }: SubscriptionHookOptions<TData, TVariables, TCache> = {}
): SubscriptionHookResult<TData> {
  const client = useApolloClient(overrideClient);
  const onSubscriptionDataRef = useRef<
    OnSubscriptionData<TData> | null | undefined
  >(null);
  const [result, setResultBase] = useState<SubscriptionHookResult<TData>>({
    loading: true
  });

  onSubscriptionDataRef.current = onSubscriptionData;

  useEffect(() => {
    if (options.skip === true) {
      return;
    }
    const subscription = client
      .subscribe({
        ...options,
        query
      })
      .subscribe(
        nextResult => {
          const newResult = {
            data: nextResult.data,
            error: undefined,
            loading: false
          };
          setResultBase(newResult);
          if (onSubscriptionDataRef.current) {
            onSubscriptionDataRef.current({
              client,
              subscriptionData: newResult
            });
          }
        },
        error => {
          setResultBase({ loading: false, data: result.data, error });
        }
      );
    return () => {
      setResultBase({ loading: true });
      subscription.unsubscribe();
    };
  }, [query, options && objToKey(options)]);

  return result;
}
