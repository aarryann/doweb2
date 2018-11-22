// tslint:disable
// tslint:disable:jsx-no-lambda
import decode from 'jwt-decode';
import React, { Suspense, lazy } from 'react';
import { Route, Switch } from 'react-router-dom';

import { routePaths } from '../config/paths';
import Header from '../components/framework/Header';

declare const process: IProcess;

const Loading = <div>...loading</div>;
const AsyncContainer = lazy(() => import('./Container'));
const AsyncRegister = lazy(() => import('../scenes/session/SignIn.manager'));
const AsyncLogin = lazy(() => import('../scenes/session/SignIn.manager'));

class App extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.handleSignOut = this.handleSignOut.bind(this);
  }

  public isAuthed(token: string | null) {
    try {
      if (token) {
        decode(token);
        return true;
      } else {
        return false;
      }
    } catch (err) {
      return false;
    }
  }
  public render() {
    const token = localStorage.getItem(process.env.REACT_APP_TOKEN_NAME);

    if (!this.isAuthed(token)) {
      return (
        <div id="content-wrapper" className="main-container">
          <Suspense fallback={Loading}>
            <Switch>
              <Route
                exact={true}
                path={routePaths.register}
                component={(props: any) => <AsyncRegister {...props} />}
              />
              <Route component={(props: any) => <AsyncLogin {...props} />} />
            </Switch>
          </Suspense>
        </div>
      );
    }
    return (
      <>
        {this.renderHeader()}
        <div id="content-wrapper" className="main-container">
          <Suspense fallback={Loading}>
            <Switch>
              <Route
                exact={true}
                path={routePaths.login}
                component={(props: any) => <AsyncLogin {...props} />}
              />
              <Route
                exact={true}
                path={routePaths.register}
                component={(props: any) => <AsyncRegister {...props} />}
              />
              <Route
                component={(props: any) => <AsyncContainer {...props} />}
              />
            </Switch>
          </Suspense>
        </div>
      </>
    );
  }

  public handleSignOut() {
    localStorage.removeItem(process.env.REACT_APP_TOKEN_NAME);
  }

  public renderHeader() {
    return <Header handleSignOut={this.handleSignOut} {...this.props} />;
  }
}

export default App;
