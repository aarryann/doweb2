// tslint:disable
import React, { useState } from 'react';

import { Link } from 'react-router-dom';
import { IBoard } from '../pipes/boards/interfaces.board';
import * as CardTemplates from './Card.template';
import { CardComponent } from '../config/constants';

import * as StringHelpers from '../services/string.helpers';

interface IBoardCardProps extends IBoard {
  altData: string;
  altAction: string;
  data: string;
  match: any;
  details(id: string): void;
  dispatch(action: string, payload: any): void;
}

export default function BoardCard(props: IBoardCardProps) {
  const [detailPane, setDetailPane] = useState(false);
  // prettier-ignore
  const cUrl = props.url?props.match.fnURL(StringHelpers.replaceMatches(props.url, '\{', '\}', props)):{state: {detailPane:true}};
  const cUrl = props.url
    ? props.match.fnURL(
        StringHelpers.replaceMatches(props.url, '{', '}', props)
      )
    : { state: { detailPane: true } };
  let cURL;
  if (props.altAction === CardComponent.DRILLDOWN_URL) {
  }
  console.log(cUrl);
  const CardContents = (CardTemplates as any)[props.layout];
  return (
    <Link
      id={`${props.id}`}
      to={cUrl}
      onClick={props.details.bind('', `${props.id}`)}
      className="card card-tile"
    >
      <div className="card-body inner box">
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
          <line className="top" x1="0" y1="0" x2="900" y2="0" />
          <line className="left" x1="0" y1="178" x2="0" y2="-920" />
          <line className="bottom" x1="298" y1="178" x2="-600" y2="178" />
          <line className="right" x1="298" y1="0" x2="298" y2="1380" />
        </svg>
        <CardContents {...props} />
      </div>
    </Link>
  );
}
