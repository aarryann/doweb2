import React from 'react';
import { IBoard } from '../pipes/boards/interfaces.board';

interface IBoardCardProps extends IBoard {
  handleViewBoard(boardId: number): void;
}

export default class BoardCard extends React.Component<IBoardCardProps, any> {
  constructor(props: IBoardCardProps) {
    super(props);

    this._handleViewBoard = this._handleViewBoard.bind(this);
  }

  public render() {
    return (
      <div
        id={`${this.props.id}`}
        className="card board"
        onClick={this._handleViewBoard}
      >
        <div className="card-body inner">
          <h4>{this.props.name}</h4>
        </div>
      </div>
    );
  }

  public _handleViewBoard() {
    this.props.handleViewBoard(this.props.id);
  }
}
