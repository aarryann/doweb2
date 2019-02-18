// tslint:disable
import { mutations, queries } from './queries.session';

declare const process: IProcess;

const Actions = {
  // Get tenant
  getTenantByUrl: async (client: any, url: string) => {
    try {
      // client.clearStore();
      const payload = {
        query: queries.tenantByUrl,
        variables: {
          url
        }
      };
      const results = await client.query({
        query: payload.query,
        variables: payload.variables
      });
      if (results.error) {
        console.log(results.error);
        return { error: results.error.message };
      }
      const tenant = results.data.tenantByUrl;
      // tslint:disable-next-line:no-console
      console.log(JSON.stringify(results, null, ' '));
      return { data: tenant.id };
    } catch (e) {
      // tslint:disable-next-line:no-console
      console.log(e);
      return { error: e.message };
    }
  },
  // On signin click
  signIn: async (client: any, email: string, password: string) => {
    try {
      // client.clearStore();
      const payload = {
        mutation: mutations.login,
        variables: {
          email,
          password
        }
      };
      const results = await client.mutate({
        mutation: payload.mutation,
        variables: payload.variables
      });
      if (results.error) {
        return { error: results.error.message };
      }
      const data = results.data.login;
      // tslint:disable-next-line:no-console
      console.log(JSON.stringify(results, null, ' '));
      localStorage.setItem(process.env.REACT_APP_TOKEN_NAME, data.token);
      Actions.setCurrentUser(client, data.user);
      return { data: data.user };
    } catch (e) {
      // tslint:disable-next-line:no-console
      console.log(e);
      return { error: e.message };
    }
  },

  // If user refreshes browser or revisits signin without logging out ... the
  // current user will need to be regenerated to put currentUser in store
  // TODO: Use apollo-cache-persist
  currentUser: async (client: any) => {
    const results = await client.mutate({ query: queries.currentUser });
    try {
      const data = results.data.currentUser;
      Actions.setCurrentUser(client, data.user);
    } catch (e) {
      // tslint:disable-next-line:no-console
      console.log(e);
    }
  },

  signOut: (client: any) => {
    const tokenName = process.env.REACT_APP_TOKEN_NAME;
    if (localStorage.getItem(tokenName)) {
      localStorage.removeItem(tokenName);
    }
    // client.resetStore();
    client.clearStore();
  },

  setCurrentUser: async (client: any, user: any) => {
    /*
    const socket = new Socket(process.env.REACT_APP_SOCKET_URL + '/socket', {
      params: {
        token: localStorage.getItem(process.env.REACT_APP_TOKEN_NAME)
      },
      logger: (kind: string, msg: string, data: string) => {
        // tslint:disable-next-line:no-console
        console.log(`${kind}: ${msg}`, data);
      }
    });

    socket.connect();

    const channel = socket.channel(`users:${user.id}`);

    if (channel['state'] !== 'joined') {
      channel.join().receive('ok', () => {
        // dispatch({ type: SessionConstants.CURRENT_USER, currentUser: user, socket:
        // socket, channel: channel });
      });
    }

    // eslint-disable-next-line
    channel.on('boards:add', msg => {
      // dispatch({ type: BoardConstants.BOARDS_ADDED, board: msg.board });
    });
  */
  }
};

export default Actions;
