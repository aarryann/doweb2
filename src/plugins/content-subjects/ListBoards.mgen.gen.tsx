import React from 'react';

import { Plugins } from '../../plugins';
import { IManagerProps } from '../../app/interfaces/interfaces';
import { Datasources } from '../../data';

export default function ListBoardsMgen(props: IManagerProps) {
  const props0000 = props.view.children['0000'].props;
  const props0100 = props.view.children['0100'].props;

  // Combine data and fetch into single state
  const [results0000, setResults0000] = Datasources.Board.useSubOwnBoard(
    props.client
  );
  const [results0100, setResults0100] = Datasources.Board.useSubOtherBoard(
    props.client
  );

  const dispatch0000 = (action: string, payload: any) => {
    switch (action) {
      case 'createBoard': {
        Datasources.Board.createBoard(payload, results0000, setResults0000);
        break;
      }

      case 'viewBoard': {
        Datasources.Board.viewBoard(payload, results0000, setResults0000);
        break;
      }

      default: {
        break;
      }
    }
  };

  const dispatch0100 = (action: string, payload: any) => {
    switch (action) {
      case 'viewBoard': {
        Datasources.Board.viewBoard(payload, results0100, setResults0100);
        break;
      }

      default: {
        break;
      }
    }
  };

  return (
    <>
      <Plugins.ListComponent
        dataSource={results0000}
        dispatch={dispatch0000}
        match={props.match}
        client={props.client}
        {...props0000}
      />

      <Plugins.ListComponent
        dataSource={results0100}
        dispatch={dispatch0100}
        match={props.match}
        client={props.client}
        {...props0100}
      />
    </>
  );
}
