import React from 'react';

import { Link } from 'react-router-dom';
import { IBoard } from '../pipes/boards/interfaces.board';

interface IBoardCardProps extends IBoard {
  dispatch(action: string, payload: any): void;
}

export default function BoardCard(props: IBoardCardProps) {
  return (
    <a
      id={`${props.id}`}
      href={`/boards/${props.id}`}
      className="card card-tile"
    >
      <div className="card-body inner">
        <h4>{props.name}</h4>
      </div>
    </a>
  );
}
