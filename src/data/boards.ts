// tslint:disable
import { useEffect, useState } from 'react';
import { queries, subscriptions } from './queries.board';

/*
 ** Subscribe to Own Boards
 */
export const useSubOwnBoard = (client: any) => {
  const [boards, setBoards]: [any, any] = useState([]);
  const [fetching, setFetching] = useState(true);

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
          console.log(data);
          // Set state data on updates to board data
          setBoards(data);
          // Set fetching to false, applicable for first time load
          setFetching(false);
        }
      });

    return () => {
      sub.unsubscribe();
    };
  }, []);

  let data: any = boards;
  // Extract and pass only owned boards
  if (data.currentUser) {
    data = data.currentUser.user.ownedBoards;
  }

  return [data, fetching];
};

/*
 ** Create Board
 */
export const createBoard = (payload: any) => {};

/*
 ** View Board
 */
export const viewBoard = (payload: any) => {};

/*
 ** Subscribe to Other Boards
 */
export const useSubOtherBoard = (client: any) => {
  const [boards, setBoards]: [any, any] = useState([]);
  const [fetching, setFetching] = useState(true);

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
          setBoards(data);
          // Set fetching to false, applicable for first time load
          setFetching(false);
        }
      });

    return () => {
      sub.unsubscribe();
    };
  }, []);

  let data: any = boards;
  // Extract and pass only owned boards
  if (data.currentUser) {
    data = data.currentUser.user.otherBoards;
  }

  return [data, fetching];
};
