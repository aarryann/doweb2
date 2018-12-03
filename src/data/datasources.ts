import { useEffect, useState } from 'react';
import { queries, subscriptions } from './queries.board';

export const useSubscriptionBoard = (client: any) => {
  const [boards, setBoards] = useState([]);

  useEffect(() => {
    const unsub = client
      .subscribe({
        query: subscriptions.createBoard
      })
      .subscribe({
        next(boardData: any) {
          // tslint:disable-next-line
          console.log('actions:watchboards:beforequery');
          const data = client.readQuery({ query: queries.fetchBoards });
          data.currentUser.user.ownedBoards.push(boardData.data.boardCreated);
          client.writeQuery({
            query: queries.fetchBoards,
            data
          });
        }
      });

    return () => {
      unsub.unsubscribe();
    };
  }, []);

  useEffect(() => {
    client
      .watchQuery({
        query: queries.fetchBoards
      })
      .subscribe({
        next({ data }: { data: any }) {
          setBoards(data);
        }
      });
  }, []);

  return boards;
};
