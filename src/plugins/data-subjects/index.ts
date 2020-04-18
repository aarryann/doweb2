/* eslint-disable react-hooks/exhaustive-deps */
// tslint:disable
import { useEffect, useState } from 'react';
import { queries, subscriptions } from './queries.visit';
import {
  useSubscription,
  SubscriptionHookResult
} from '../../app/services/data.helpers';
import ApolloClient from 'apollo-client';
/*
 ** Subscribe to Subjects
 */
export function useSubscribeSubject<TData = any, TCache = object>(
  client: ApolloClient<TCache>,
  skip: boolean = false
): any {
  const [results, setResults] = useState<SubscriptionHookResult<TData>>({
    fetching: true
  });
  const subscribedResult = useSubscription(
    { query: subscriptions.subjectAdded },
    {
      query: queries.getAllSubjects,
      variables: { studyId: 1, siteId: 1 },
      fetchPolicy: 'cache-first'
    },
    {
      client,
      skip,
      onSubscriptionData: (subscriptionData, cacheData) => {
        cacheData.allSubjects.push(subscriptionData.subjectAdded);
        return cacheData;
      }
    }
  );
  setResults(subscribedResult);

  let filteredResults: any = results;
  filteredResults.skip = skip;
  // Extract and pass only subjects
  if (filteredResults.data.allSubjects) {
    filteredResults.data = filteredResults.data.allSubjects;
  }

  return [filteredResults, setResults];
}

export const useSubscribeSubjects = (client: any, skip: boolean) => {
  const [results, setResults]: [any, any] = useState({
    hide: false,
    fetching: true,
    data: []
  });

  // Subscribe to new boards
  useEffect(() => {
    if (skip) {
      return;
    }
    const sub = client
      .subscribe({
        query: subscriptions.subjectAdded
      })
      .subscribe({
        next(subjectData: any) {
          const data = client.readQuery({
            query: queries.getAllSubjects,
            variables: { studyId: 1, siteId: 1 }
          });
          // Add subjects received from subscription to Apollo client cache
          data.allSubjects.push(subjectData.data.subjectAdded);
          client.writeQuery({
            query: queries.getAllSubjects,
            variables: { studyId: 1, siteId: 1 },
            data
          });
        }
      });

    return () => {
      sub.unsubscribe();
    };
  }, []);

  // Watch for updates to Apollo client cache. Uses the default cache-first
  // client policy, to check Apollo client cache for any data followed by
  // network/database.
  useEffect(() => {
    if (skip) {
      return;
    }
    const sub = client
      .watchQuery({
        query: queries.getAllSubjects,
        variables: { studyId: 1, siteId: 1 }
      })
      .subscribe({
        next({ data }: { data: any }) {
          // Set state data on updates to subject data
          // Set fetching to false, for UI fetching icon at first time load
          setResults({ data, fetching: false });
        }
      });
    return () => {
      sub.unsubscribe();
    };
  }, []);

  let filteredResults: any = results;
  filteredResults.hide = skip;
  // Extract and pass only subjects
  if (results.data.allSubjects) {
    filteredResults.data = results.data.allSubjects;
  }

  return [filteredResults, setResults];
};

/*
 ** Add Subject
 */
export const addSubject = (payload: any, results: any, setResults: any) => {};

/*
 ** View Subject
 */
export const viewSubject = (payload: any, results: any, setResults: any) => {
  console.log('View clicked ' + payload);
};
