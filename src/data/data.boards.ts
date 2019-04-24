/* eslint-disable @typescript-eslint/no-unused-vars */
// tslint:disable
import { useEffect, useState } from 'react';
import { queries, subscriptions } from './queries.board';

/*
 ** Subscribe to Own Boards
 */
export const useSubOwnBoard = (client: any) => {
  const [results, setResults]: [any, any] = useState({
    fetching: true,
    data: []
  });

  // Subscribe to new boards
  useEffect(() => {
    const sub = client
      .subscribe({
        query: subscriptions.createBoard
      })
      .subscribe({
        next(boardData: any) {
          // Write new boards to Apollo client cache
          const data = client.readQuery({ query: queries.getOwnBoards });
          data.currentUser.user.ownedBoards.push(boardData.data.boardCreated);
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
          // Set state data on updates to board data
          // Set fetching to false, applicable for first time load
          setResults({ data, fetching: false });
        }
      });

    return () => {
      sub.unsubscribe();
    };
  }, []);

  let filteredResults: any = results;
  // Extract and pass only owned boards
  if (results.data.currentUser) {
    filteredResults.data = results.data.currentUser.user.ownedBoards;
  }

  return [filteredResults, setResults];
};

/*
 ** Create Board
 */
export const createBoard = (payload: any, results: any, setResults: any) => {};

/*
 ** View Board
 */
export const viewBoard = (payload: any, results: any, setResults: any) => {
  console.log('View clicked ' + payload);
};

/*
 ** Subscribe to Other Boards
 */
export const useSubOtherBoard = (client: any) => {
  const [results, setResults]: [any, any] = useState({
    fetching: true,
    data: []
  });

  // Subscribe to new boards
  useEffect(() => {
    const sub = client
      .subscribe({
        query: subscriptions.createBoard
      })
      .subscribe({
        next(boardData: any) {
          // Write new boards to Apollo client cache
          const data = client.readQuery({ query: queries.getOtherBoards });
          data.currentUser.user.otherBoards.push(boardData.data.boardCreated);
          client.writeQuery({
            query: queries.getOtherBoards,
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
        query: queries.getOtherBoards
      })
      .subscribe({
        next({ data }: { data: any }) {
          // Set state data on updates to board data
          // Set fetching to false, applicable for first time load
          setResults({ data, fetching: false });
        }
      });

    return () => {
      sub.unsubscribe();
    };
  }, []);

  let filteredResults: any = results;
  // Extract and pass only owned boards
  if (results.data.currentUser) {
    filteredResults.data = results.data.currentUser.user.otherBoards;
  }

  return [filteredResults, setResults];
};
