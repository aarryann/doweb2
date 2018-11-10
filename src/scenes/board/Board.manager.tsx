// tslint:disable
import React from 'react';
import { withApollo } from 'react-apollo';
import { Redirect } from 'react-router-dom';

import Actions from '../../pipes/boards/actions.board';
import { IBoard } from '../../pipes/boards/interfaces.board';
import BoardComponent from './List.component';

interface IBoardManagerProps {
  client: any;
}

class BoardManager extends React.Component<IBoardManagerProps, any> {
  private boardHandle: any;
  constructor(props: IBoardManagerProps) {
    super(props);
    this.state = {
      boardPath: '',
      ownedBoards: [],
      otherBoards: [],
      errors: null,
      fetching: true
    };
    this._handleViewBoard = this._handleViewBoard.bind(this);
    this._handleCreateBoard = this._handleCreateBoard.bind(this);
  }

  public componentDidMount() {
    this.setState(() => ({ fetching: true }));
    Actions.watchBoards(this.props.client, (data: any) => {
      this.setState(() => ({
        ownedBoards: data.currentUser.user.ownedBoards,
        otherBoards: data.currentUser.user.otherBoards,
        fetching: false
      }));
    }).then(handle => {
      this.boardHandle = handle;
    });
  }

  public componentWillUnmount() {
    this.boardHandle.unsubscribe();
  }

  public render() {
    if (this.state.boardPath.length > 0) {
      return <Redirect to={this.state.boardPath} />;
    }
    return (
      <BoardComponent
        handleViewBoard={this._handleViewBoard}
        handleCreateBoard={this._handleCreateBoard}
        ownedBoards={this.state.ownedBoards}
        otherBoards={this.state.otherBoards}
        fetching={this.state.fetching}
        errors={this.state.errors}
      />
    );
  }

  public _handleViewBoard(boardId: number) {
    this.setState(() => ({ boardPath: `/boards/${boardId}` }));
  }

  public _handleCreateBoard(boardData: IBoard) {
    Actions.create(this.props.client, boardData).then(board => {
      if (board.data) {
        this.setState(() => ({
          // ownedBoards: [board.data].concat(this.state.ownedBoards),
          boardPath: `/boards/${board.data.id}`
        }));
      } else {
        this.setState(() => ({ errors: board.error }));
      }
    });
  }
}

export default withApollo(BoardManager);
