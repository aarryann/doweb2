// tslint:disable
import { useEffect, useState } from 'react';
import { queries, subscriptions } from './queries.visit';

/*
 ** Subscribe to Subjects
 */
export const useSubSubjects = (client: any) => {
  const [results, setResults]: [any, any] = useState({
    fetching: true,
    data: []
  });

  // Subscribe to new boards
  useEffect(() => {
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
  // Extract and pass only owned boards
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
