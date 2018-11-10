import { IBoard } from './interfaces.board';
import { mutations, queries, subscriptions } from './queries.board';

const Actions = {
  watchBoards: async (client: any, assignState: any) => {
    const unsub = await client
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
    // tslint:disable-next-line
    // console.log(unsub.unsubscribe());

    client
      .watchQuery({
        query: queries.fetchBoards
      })
      .subscribe({
        next({ data }: { data: any }) {
          assignState(data);
        }
      });

    return unsub;
  },

  fetchBoards: async (client: any) => {
    await client
      .subscribe({
        query: subscriptions.createBoard
      })
      .subscribe({
        next(boardData: any) {
          const data = client.readQuery({ query: queries.fetchBoards });
          data.currentUser.user.ownedBoards.push(boardData.data.boardCreated);
          client.writeQuery({
            query: queries.fetchBoards,
            data
          });
        }
      });
    try {
      await client.query({
        query: queries.fetchBoards
      });
    } catch (e) {
      // return { error: e.message };
    }
  },

  create: async (client: any, boardData: IBoard) => {
    try {
      // TODO: Change refetchQueries to incremental cache.readQuery
      // tslint:disable-next-line
      console.log('boardactions:create:beforemutate');
      const results = await client.mutate({
        mutation: mutations.createBoard,
        refetchQueries: [{ query: queries.fetchBoards }],
        variables: boardData
      });
      // tslint:disable-next-line
      console.log('boardactions:create:aftermutate');
      if (results.error) {
        return { error: results.error };
      } else {
        return { data: results.data.createBoard };
      }
    } catch (e) {
      // tslint:disable-next-line:no-console
      console.log(e);
      return { error: e.message };
    }
  }
};

export default Actions;
