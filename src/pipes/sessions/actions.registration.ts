import { mutations } from './queries.session';

declare const process: IProcess;

const Actions = {
  signUp: async (client: any, registrationData: any) => {
    try {
      await client.resetStore();
      const results = await client.mutate({
        mutation: mutations.register,
        variables: registrationData
      });
      if (results.error) {
        return { error: results.error.message };
      }
      const data = results.data.register;
      // httpPost('/api/v1/registrations', { user: data }) .then(results => {
      localStorage.setItem(process.env.REACT_APP_TOKEN_NAME, data.jwt);
      return { data: data.user };
      // dispatch({ type: Constants.CURRENT_USER, currentUser: results.user });
      // dispatch(pushPath('/'));
      // dispatch({ type: Constants.REGISTRATIONS_ERROR, errors: errorJSON.errors });
    } catch (e) {
      // tslint:disable-next-line:no-console
      console.log(e);
      return { error: e.message };
    }
  }
};

export default Actions;
