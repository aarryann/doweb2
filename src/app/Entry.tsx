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

function isAuthed(token: string | null) {
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

function App(props: any) {
  const token = localStorage.getItem(process.env.REACT_APP_TOKEN_NAME);

  if (!isAuthed(token)) {
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
      {renderHeader()}
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
            <Route component={(props: any) => <AsyncContainer {...props} />} />
          </Switch>
        </Suspense>
      </div>
    </>
  );

  function handleSignOut() {
    localStorage.removeItem(process.env.REACT_APP_TOKEN_NAME);
  }

  function renderHeader() {
    return <Header handleSignOut={handleSignOut} {...props} />;
  }
}

export default App;
