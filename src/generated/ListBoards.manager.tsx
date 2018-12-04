// tslint:disable
import React from 'react';

import * as Boards from '../data/boards';
import { IManagerProps } from '../controlled/interfaces';

import ListComponent from '../controlled/List.component';

export default function ListBoardsManager(props: IManagerProps) {
  const props0000 = props.children['0000'].props;
  const props0100 = props.children['0100'].props;
  // Combine data and fetch into single state
  const [data0000, fetching0000] = Boards.useSubOwnBoard(props.client);
  const [data0100, fetching0100] = Boards.useSubOtherBoard(props.client);

  const dispatch = (action: string, payload: any) => {
    switch (action) {
      case 'createBoard': {
        Boards.createBoard(payload);
        break;
      }
      case 'viewBoard': {
        Boards.viewBoard(payload);
        break;
      }
      default: {
      }
    }
  };

  return (
    <>
      <ListComponent
        fetching={fetching0000}
        dataSource={data0000}
        dispatch={dispatch}
        {...props0000}
      />
      <ListComponent
        fetching={fetching0100}
        dataSource={data0100}
        dispatch={dispatch}
        {...props0100}
      />
    </>
  );
}
