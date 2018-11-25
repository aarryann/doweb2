// tslint:disable
// tslint:disable:jsx-no-lambda
import decode from 'jwt-decode';
import React, { lazy } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import { routePaths } from '../../config/paths';
import Header from '../../app/Header';

declare const process: IProcess;
const isAuthenticated = () => {
  const token = localStorage.getItem(process.env.REACT_APP_TOKEN_NAME);
  // const refreshToken = localStorage.getItem('refreshToken');
  try {
    if (token) {
      decode(token);
    } else {
      return false;
    }
    // const { exp } = decode(refreshToken);
    // if (Date.now() / 1000 > exp) {
    //   return false;
    // }
  } catch (err) {
    return false;
  }

  return true;
};

interface IPrivateRouteProps {
  component: any;
  exact: boolean;
  path: string;
}

const PrivateRoute = ({
  component: Component,
  ...rest
}: IPrivateRouteProps) => {
  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated() ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: routePaths.login }} />
        )
      }
    />
  );
};

const AsyncHome = lazy(() => import('../board/Board.manager'));
const AsyncRegister = lazy(() => import('../session/SignIn.manager'));
const AsyncLogin = lazy(() => import('../session/SignIn.manager'));
const AsyncPlaceHolderReactComponent = lazy(() =>
  import('./ExampleReactComponent')
);

class App extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this._handleSignOut = this._handleSignOut.bind(this);
    this._handleSearchTermChange = this._handleSearchTermChange.bind(this);
  }

  public _handleSignOut() {
    localStorage.removeItem(process.env.REACT_APP_TOKEN_NAME);
  }

  public _handleSearchTermChange() {
    // TODO: Incorporate search term change
  }

  public render() {
    return (
      <React.Fragment>
        {this._renderHeader(isAuthenticated())}
        <div id="content-wrapper" className="main-container">
          <Switch>
            <Route
              exact={true}
              path={routePaths.login}
              component={AsyncLogin}
            />
            <Route
              exact={true}
              path={routePaths.register}
              component={AsyncRegister}
            />
            <PrivateRoute
              exact={true}
              path={routePaths.home}
              component={AsyncHome}
            />
            <Route
              path={routePaths.board}
              render={({ match: { url } }) => (
                <React.Fragment>
                  <Route
                    path={`${url}/:bid`}
                    component={AsyncPlaceHolderReactComponent}
                  />
                  <Route
                    path={`${url}/:bid/cards/:cid`}
                    component={AsyncPlaceHolderReactComponent}
                  />
                </React.Fragment>
              )}
            />
          </Switch>
        </div>
      </React.Fragment>
    );
  }

  private _renderHeader(authed: boolean) {
    if (!authed) {
      return false;
    }

    return <Header handleSignOut={this._handleSignOut} {...this.props} />;
  }
}

export default App;
