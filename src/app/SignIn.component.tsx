import React from 'react';
import { Link } from 'react-router-dom';

import { setDocumentTitle } from '../services/component.helpers';

interface ISignInComponentProps {
  title: string;
  error: string;
  handleSignIn(email: string, password: string): void;
}

export default class SignInComponent extends React.Component<
  ISignInComponentProps,
  any
> {
  constructor(props: ISignInComponentProps) {
    super(props);

    this.state = {
      user: {
        email: '',
        password: ''
      },
      submitted: false
    };
    this._handleChange = this._handleChange.bind(this);
    this._handleSignIn = this._handleSignIn.bind(this);
  }

  public componentDidMount() {
    setDocumentTitle(this.props.title);
  }

  public render() {
    const { user } = this.state;
    return (
      <div className="container-fluid mt-5 pt-5">
        <div className="row">
          <div className="col-md-4 mx-auto">
            <div className="card mb-4">
              <div className="card-header text-center">
                <h3 className="title">Sign in to DoApp</h3>
                <small>Start being extremely productive!!</small>
              </div>
              <div className="card-body">
                <form onSubmit={this._handleSignIn}>
                  {this._renderError()}
                  <div className="form-group">
                    <input
                      type="Email"
                      name="email"
                      placeholder="Email"
                      required={true}
                      className="form-control with-border"
                      value={user.email}
                      onChange={this._handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="password"
                      name="password"
                      placeholder="Password"
                      required={true}
                      className="form-control with-border"
                      value={user.password}
                      onChange={this._handleChange}
                    />
                  </div>
                  <button type="submit" className="btn btn-success btn-block">
                    Sign in
                  </button>
                  <Link
                    to="/sign_up"
                    className="btn btn-outline-default btn-block"
                  >
                    Sign up
                  </Link>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  public _handleChange(e: any) {
    const { name, value } = e.target;
    const { user } = this.state;
    this.setState({
      user: {
        ...user,
        [name]: value
      }
    });
  }

  public _handleSignIn(e: any) {
    e.preventDefault();

    this.setState({ submitted: true });
    const { user } = this.state;

    // tslint:disable-next-line:no-console
    // console.log(user.email + ':' + user.password);
    if (user.email && user.password) {
      this.props.handleSignIn(user.email, user.password);
    }
  }

  public _renderError() {
    const { error } = this.props;
    if (!error) {
      return false;
    }

    return <div className="error">{error}</div>;
  }
}
