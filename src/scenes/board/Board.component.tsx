// tslint:disable
import classnames from 'classnames';
import React from 'react';

import labels from '../../config/labels.en';
import { IBoard } from '../../pipes/boards/interfaces.board';
import { setDocumentTitle } from '../../services/utils/component.helpers';
import BoardCard from './Card.component';
import BoardForm from './Form.component';

import './Board.component.css';

interface IBoardComponentProps {
  otherBoards: IBoard[];
  ownedBoards: IBoard[];
  fetching: boolean;
  errors: string;
  handleViewBoard(boardId: number): void;
  handleCreateBoard(data: IBoard): void;
}

export default class BoardComponent extends React.Component<
  IBoardComponentProps,
  any
> {
  constructor(props: IBoardComponentProps) {
    super(props);
    this.state = {
      showForm: false
    };

    this._handleShowForm = this._handleShowForm.bind(this);
    this._handleFormCancel = this._handleFormCancel.bind(this);
  }

  public componentDidMount() {
    setDocumentTitle(labels.boards.title);
  }

  public render() {
    return (
      <div className="view-container boards index">
        {this._renderOwnedBoards()}
        {this._renderOtherBoards()}
      </div>
    );
  }

  public _renderBoards(boards: IBoard[]) {
    return boards.map((board: IBoard) => {
      return (
        <BoardCard
          key={board.id}
          handleViewBoard={this.props.handleViewBoard}
          {...board}
        />
      );
    });
  }

  public _renderOwnedBoards() {
    const { fetching, ownedBoards } = this.props;

    let content = null;

    const iconClasses = classnames({
      fa: true,
      'fa-user': !fetching,
      'fa-spinner': fetching,
      'fa-spin': fetching
    });

    if (!fetching) {
      content = (
        <div className="boards-wrapper">
          {this._renderBoards(ownedBoards)}
          {this._renderAddNewBoard()}
        </div>
      );
    }

    return (
      <section id="myBoards">
        <header className="view-header">
          <h3>
            <i className={iconClasses} /> My boards
          </h3>
        </header>
        {content}
      </section>
    );
  }

  public _renderOtherBoards() {
    const { otherBoards } = this.props;

    if (otherBoards.length === 0) {
      return false;
    }

    return (
      <section id="otherBoards">
        <header className="view-header">
          <h3>
            <i className="fa fa-users" /> Other boards
          </h3>
        </header>
        <div className="boards-wrapper">{this._renderBoards(otherBoards)}</div>
      </section>
    );
  }

  public _renderAddNewBoard() {
    const { errors } = this.props;

    if (!this.state.showForm) {
      return this._renderAddButton();
    }

    return (
      <BoardForm
        handleCreateBoard={this.props.handleCreateBoard}
        errors={errors}
        handleFormCancel={this._handleFormCancel}
      />
    );
  }

  public _renderAddButton() {
    return (
      <div className="card board add-new" onClick={this._handleShowForm}>
        <div className="card-body inner">
          <a id="add_new_board">Add new board...</a>
        </div>
      </div>
    );
  }

  public _handleShowForm() {
    // this.props.handleShowForm(true);
    this.setState(() => ({ showForm: true }));
  }

  public _handleFormCancel() {
    // this.props.handleShowForm(false);
    this.setState(() => ({ showForm: false }));
  }
}
