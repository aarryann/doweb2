import React from 'react';
import PageClick from 'react-page-click';
import { IBoard } from '../pipes/boards/interfaces.board';
import { renderErrorsFor } from '../services/component.helpers';

interface IAddCardProps {
  errors: any;
  handleFormCancel(): void;
  dispatch(action: string, payload: any): void;
}

export default class BoardForm extends React.Component<IAddCardProps, any> {
  constructor(props: IAddCardProps) {
    super(props);

    this.state = {
      firstName: '',
      lastName: '',
      currentGender: '',
      dob: '',
      submitted: false
    };

    this._handleChange = this._handleChange.bind(this);
    this._handleCancel = this._handleCancel.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
  }

  public render() {
    const { errors } = this.props;
    const { firstName, lastName, currentGender, dob } = this.state;

    return (
      <PageClick notify={this._handleCancel}>
        <div className="board form card card-tile">
          <div className="card-body inner">
            <h4>Register</h4>
            <form id="new_board_form" onSubmit={this._handleSubmit}>
              <input
                autoFocus={true}
                name="firstName"
                id="first_name"
                type="text"
                placeholder="First name"
                required={true}
                value={firstName}
                onChange={this._handleChange}
              />
              <input
                name="lastName"
                id="last_name"
                type="text"
                placeholder="Last name"
                required={true}
                value={lastName}
                onChange={this._handleChange}
              />
              <input
                name="gender"
                id="gender"
                type="text"
                placeholder="Gender"
                required={true}
                value={currentGender}
                onChange={this._handleChange}
              />
              <input
                name="dob"
                id="dob"
                type="text"
                placeholder="DOB"
                required={true}
                value={dob}
                onChange={this._handleChange}
              />
              {renderErrorsFor(errors, 'name')}
              <button type="submit">Create board</button> or{' '}
              <a href="#" onClick={this._handleCancel}>
                cancel
              </a>
            </form>
          </div>
        </div>
      </PageClick>
    );
  }

  public _handleChange(e: any) {
    // const target = e.target;
    // const value = target.type === 'checkbox' ? target.checked : target.value;
    // const name = target.name;
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  }

  public _handleSubmit(e: any) {
    e.preventDefault();

    const { firstName, lastName, currentGender, dob } = this.state;

    const data: any = {
      firstName,
      lastName,
      currentGender,
      dob
    };

    this.props.dispatch('registerSubject', data);
  }

  public _handleCancel(e: any) {
    e.preventDefault();

    this.props.handleFormCancel();
  }
}
