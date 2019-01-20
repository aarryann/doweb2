import React from 'react';
import { withApollo } from 'react-apollo';
import { Redirect } from 'react-router-dom';

import labels from '../config/labels.en';
import Actions from '../data/actions.session';
import SignIn from './SignIn.component';

declare const process: IProcess;
interface ISignInManagerProps {
  client: any;
}

class SignInManager extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      toHome: false,
      errors: null
    };
    this._handleSignIn = this._handleSignIn.bind(this);
    localStorage.removeItem(process.env.REACT_APP_TOKEN_NAME);
  }

  public render() {
    if (this.state.toHome === true) {
      return <Redirect to="/" />;
    }
    return (
      <SignIn
        title={labels.signIn.title}
        handleSignIn={this._handleSignIn}
        error={this.state.error}
        {...this.props}
      />
    );
  }

  public _handleSignIn(email: string, password: string) {
    Actions.signIn(this.props.client, email, password).then(({ error }) => {
      if (error) {
        this.setState(() => ({ errors: error }));
      } else {
        this.setState(() => ({ toHome: true }));
      }
    });
  }
}

export default withApollo(SignInManager);
