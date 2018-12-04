import { useEffect, useState } from 'react';
import { queries, subscriptions } from './queries.board';

export const useSubscriptionOwnBoard = (client: any) => {
  const [boards, setBoards]: [any, any] = useState([]);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    const unsub = client
      .subscribe({
        query: subscriptions.createBoard
      })
      .subscribe({
        next(boardData: any) {
          // tslint:disable-next-line
          const data = client.readQuery({ query: queries.getOwnBoards });
          data.currentUser.user.ownedBoards.push(boardData.data.boardCreated);
          client.writeQuery({
            query: queries.getOwnBoards,
            data
          });
          setFetching(false);
        }
      });

    return () => {
      unsub.unsubscribe();
    };
  }, []);

  useEffect(() => {
    client
      .watchQuery({
        query: queries.getOwnBoards
      })
      .subscribe({
        next({ data }: { data: any }) {
          setBoards(data);
          setFetching(false);
        }
      });
  }, []);

  let data: any = boards;
  if (data.currentUser) {
    data = data.currentUser.user.ownedBoards;
  }

  return [data, fetching];
};

export const useSubscriptionOtherBoard = (client: any) => {
  const [boards, setBoards]: [any, any] = useState([]);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    const unsub = client
      .subscribe({
        query: subscriptions.createBoard
      })
      .subscribe({
        next(boardData: any) {
          // tslint:disable-next-line
          const data = client.readQuery({ query: queries.getOtherBoards });
          data.currentUser.user.otherBoards.push(boardData.data.boardCreated);
          client.writeQuery({
            query: queries.getOtherBoards,
            data
          });
          setFetching(false);
        }
      });

    return () => {
      unsub.unsubscribe();
    };
  }, []);

  useEffect(() => {
    client
      .watchQuery({
        query: queries.getOtherBoards
      })
      .subscribe({
        next({ data }: { data: any }) {
          setBoards(data);
          setFetching(false);
        }
      });
  }, []);

  let data: any = boards;
  if (data.currentUser) {
    data = data.currentUser.user.otherBoards;
  }

  return [data, fetching];
};
