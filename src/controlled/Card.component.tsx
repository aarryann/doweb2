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
  details(): void;
  dispatch(action: string, payload: any): void;
}

export default function BoardCard(props: IBoardCardProps) {
  const [detailPane, setDetailPane] = useState(false);
  // prettier-ignore
  const cUrl = props.cUrl?props.match.fnURL(StringHelpers.replaceMatches(props.cUrl, '\{', '\}', props)):"{detailPane:true}";
  const CardContents = (CardTemplates as any)[props.cLayout];
  return (
    <Link
      id={`${props.id}`}
      to={props.match.fnURL(cUrl)}
      onClick={props.details}
      className="card card-tile"
    >
      <div className="card-body inner">
        <CardContents {...props} />
      </div>
    </Link>
  );
}
