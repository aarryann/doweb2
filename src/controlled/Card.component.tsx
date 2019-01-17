import React from 'react';

import { Link } from 'react-router-dom';
import { IBoard } from '../pipes/boards/interfaces.board';

interface IBoardCardProps extends IBoard {
  dispatch(action: string, payload: any): void;
}

export default class BoardCard extends React.Component<IBoardCardProps, any> {
  constructor(props: IBoardCardProps) {
    super(props);
  }

  public render() {
    return (
      <Link
        id={`${this.props.id}`}
        to={`/boards/${this.props.id}`}
        className="card card-tile"
      >
        <div className="card-body inner">
          <h4>{this.props.name}</h4>
        </div>
      </Link>
    );
  }
}
