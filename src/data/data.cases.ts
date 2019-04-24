/* eslint-disable @typescript-eslint/no-unused-vars */
// tslint:disable
import { useEffect, useState } from 'react';
import { queries, subscriptions } from './queries.board';

/*
 ** Subscribe to Own Cases
 */
export const useCases = (client: any) => {
  const [results, setResults]: [any, any] = useState({
    fetching: true,
    data: []
  });

  // Subscribe to new cases
  useEffect(() => {
    const sub = client
      .subscribe({
        query: subscriptions.createBoard
      })
      .subscribe({
        next(caseData: any) {
          // Write new cases to Apollo client cache
          const data = client.readQuery({ query: queries.getOwnBoards });
          data.currentUser.user.ownedBoards.push(caseData.data.boardCreated);
          client.writeQuery({
            query: queries.getOwnBoards,
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
        query: queries.getOwnBoards
      })
      .subscribe({
        next({ data }: { data: any }) {
          // Set state data on updates to case data
          // Set fetching to false, applicable for first time load
          setResults({ data, fetching: false });
        }
      });

    return () => {
      sub.unsubscribe();
    };
  }, []);

  let filteredResults: any = results;
  // Extract and pass only owned cases
  if (results.data.currentUser) {
    filteredResults.data = results.data.currentUser.user.ownedBoards;
  }

  return [filteredResults, setResults];
};

/*
 ** Create Case
 */
export const createCase = (payload: any, results: any, setResults: any) => {};

/*
 ** View Case
 */
export const viewCase = (payload: any, results: any, setResults: any) => {
  console.log('View clicked ' + payload);
};
