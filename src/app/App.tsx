// tslint:disable:jsx-no-lambda
import decode from 'jwt-decode';
import React, { lazy, Suspense } from 'react';

import { routePaths } from '../config/paths';
import Header from './Header';
import RSidebar from './RSidebar';

declare const process: IProcess;

const Loading = <div>...loading</div>;
const ViewLoader = lazy(() => import('./ViewLoader'));
const AsyncRegister = lazy(() => import('./SignIn.manager'));
const AsyncLogin = lazy(() => import('./SignIn.manager'));

class App extends React.Component<any, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      showForm: false
    };

    this.handleSignOut = this.handleSignOut.bind(this);
    this.showRSidebar = this.showRSidebar.bind(this);
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

  public getComponent(pathname: string, authed: boolean) {
    if (pathname === routePaths.register) {
      return AsyncRegister;
    } else {
      return AsyncLogin;
    }
  }

  public render() {
    const token = localStorage.getItem(process.env.REACT_APP_TOKEN_NAME);
    const authed = this.isAuthed(token);
    const pathname = window.location.pathname;

    const AsyncAuthContainer = this.getComponent(
      window.location.pathname,
      authed
    );

    if (
      !authed ||
      pathname === routePaths.register ||
      pathname === routePaths.login
    ) {
      return (
        <div id="content-wrapper" className="main-container">
          <Suspense fallback={Loading}>
            <AsyncAuthContainer {...this.props} />
          </Suspense>
        </div>
      );
    }
    return (
      <>
        {this.renderHeader()}
        {this.renderRightSideBar()}
        <div id="content-wrapper" className="main-container">
          <Suspense fallback={Loading}>
            <ViewLoader pathname={pathname} {...this.props} />
          </Suspense>
        </div>
      </>
    );
  }

  public handleSignOut() {
    localStorage.removeItem(process.env.REACT_APP_TOKEN_NAME);
  }

  public showRSidebar() {
    this.setState({
      showForm: !this.state.showForm
    });
  }

  public renderHeader() {
    return (
      <Header
        handleSignOut={this.handleSignOut}
        showRSidebar={this.showRSidebar}
        {...this.props}
      />
    );
  }

  public renderRightSideBar() {
    return (
      <RSidebar
        showForm={this.state.showForm}
        showSidebar={this.showRSidebar}
        {...this.props}
      />
    );
  }
}

export default App;
