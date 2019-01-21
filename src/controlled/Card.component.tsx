// tslint:disable
import React from 'react';

import { Link } from 'react-router-dom';
import { IBoard } from '../pipes/boards/interfaces.board';
import CardTemplates from './Card.template';

import * as StringHelpers from '../services/string.helpers';

interface IBoardCardProps extends IBoard {
  cUrl: string;
  cLayout: string;
  dispatch(action: string, payload: any): void;
}

export default function BoardCard(props: IBoardCardProps) {
  // prettier-ignore
  const cUrl = StringHelpers.replaceMatches(props.cUrl, '\{', '\}', props);
  return (
    <Link id={`${props.id}`} to={cUrl} className="card card-tile">
      <div className="card-body inner">{CardTemplates.titleOnly(props)}</div>
    </Link>
  );
}
