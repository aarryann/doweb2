// tslint:disable
import React from 'react';

import { Link } from 'react-router-dom';
import { IBoard } from '../pipes/boards/interfaces.board';
import * as CardTemplates from './Card.template';

import * as StringHelpers from '../services/string.helpers';

interface IBoardCardProps extends IBoard {
  cUrl: string;
  cLayout: string;
  details(show: boolean): void;
  dispatch(action: string, payload: any): void;
}

export default function BoardCard(props: IBoardCardProps) {
  // prettier-ignore
  const cUrl = props.cUrl?StringHelpers.replaceMatches(props.cUrl, '\{', '\}', props):"#";
  const CardContents = (CardTemplates as any)[props.cLayout];
  const detailsPane = () => {
    console.log('Details Pane clicked');
  };
  return (
    <Link
      id={`${props.id}`}
      to={cUrl}
      onClick={detailsPane}
      className="card card-tile"
    >
      <div className="card-body inner">
        <CardContents {...props} />
      </div>
    </Link>
  );
}
