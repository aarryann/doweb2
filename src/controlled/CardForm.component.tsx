import React from 'react';
import PageClick from 'react-page-click';
import { IBoard } from '../pipes/boards/interfaces.board';
import { renderErrorsFor } from '../services/component.helpers';

interface IBoardFormProps {
  errors: any;
  handleFormCancel(): void;
  dispatch(action: string, payload: any): void;
}

export default class BoardForm extends React.Component<IBoardFormProps, any> {
  constructor(props: IBoardFormProps) {
    super(props);

    this.state = {
      boardName: '',
      submitted: false
    };

    this._handleChange = this._handleChange.bind(this);
    this._handleFormCancel = this._handleFormCancel.bind(this);
    this._handleCreateBoard = this._handleCreateBoard.bind(this);
  }

  public render() {
    const { errors } = this.props;
    const { boardName } = this.state;

    return (
      <PageClick notify={this._handleFormCancel}>
        <div className="board form card card-tile">
          <div className="card-body inner">
            <h4>Register</h4>
            <form id="new_board_form" onSubmit={this._handleCreateBoard}>
              <input
                autoFocus={true}
                name="firstName"
                id="first_name"
                type="text"
                placeholder="First name"
                required={true}
                value={boardName}
                onChange={this._handleChange}
              />
              <input
                autoFocus={true}
                name="lastName"
                id="last_name"
                type="text"
                placeholder="Last name"
                required={true}
                value={boardName}
                onChange={this._handleChange}
              />
              {renderErrorsFor(errors, 'name')}
              <button type="submit">Create board</button> or{' '}
              <a href="#" onClick={this._handleFormCancel}>
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

  public _handleCreateBoard(e: any) {
    e.preventDefault();

    const { boardName } = this.state;

    const data: Partial<IBoard> = {
      name: boardName
    };

    this.props.dispatch('createBoard', data);
  }

  public _handleFormCancel(e: any) {
    e.preventDefault();

    this.props.handleFormCancel();
  }
}
