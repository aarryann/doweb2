// tslint:disable
import React, { useState } from 'react';

import { Link } from 'react-router-dom';
import { IBoard } from '../pipes/boards/interfaces.board';
import * as CardTemplates from './Card.template';

import * as StringHelpers from '../services/string.helpers';

interface IBoardCardProps extends IBoard {
  cUrl: string;
  cLayout: string;
  match: any;
  details(id: string): void;
  dispatch(action: string, payload: any): void;
}

export default function BoardCard(props: IBoardCardProps) {
  const [detailPane, setDetailPane] = useState(false);
  // prettier-ignore
  const cUrl = props.cUrl?props.match.fnURL(StringHelpers.replaceMatches(props.cUrl, '\{', '\}', props)):{state: {detailPane:true}};
  console.log(cUrl);
  const CardContents = (CardTemplates as any)[props.cLayout];
  return (
    <Link
      id={`${props.id}`}
      to={cUrl}
      onClick={props.details.bind('', `${props.id}`)}
      className="card card-tile"
    >
      <div className="card-body inner">
        <CardContents {...props} />
      </div>
    </Link>
  );
}
