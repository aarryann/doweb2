/* eslint-disable no-useless-escape */
// tslint:disable
import React from 'react';

import { Link } from 'react-router-dom';
import { IBoard } from './interfaces.board';
import * as ConfigTemplates from '../../config/viewconfig.template';
import { CardConstants } from '../../config/constants';

import * as SH from '../../services/string.helpers';

interface IBoardCardProps extends IBoard {
  altData: string;
  altAction: string;
  data: string;
  match: any;
  details(id: string): void;
  dispatch(action: string, payload: any): void;
}

export default function BoardCard(props: IBoardCardProps) {
  let cUrl;
  console.log(props);
  if (props.altAction === CardConstants.DRILLDOWN_URL) {
    // prettier-ignore
    cUrl = props.match.fnURL(SH.replaceMatches(props.altData, '\{', '\}', props));
  } else if (
    props.altAction === CardConstants.SHOW_PANE_DATA ||
    props.altAction === CardConstants.SHOW_PANE_CALL
  ) {
    cUrl = { state: { detailPane: true } };
  }
  console.log(cUrl);
  const CardContents = (ConfigTemplates as any)[props.data];
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
