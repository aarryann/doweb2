import React from 'react';

import { ComponentPlugins } from '../../plugins';
import { IManagerProps } from '../../app/interfaces/interfaces';
import { DatasourcePlugins } from '../';

export default function ListBoardsMgen(props: IManagerProps) {
  const props0000 = props.view.children['0000'].props;
  const props0100 = props.view.children['0100'].props;

  // Combine data and fetch into single state
  const [results0000, setResults0000] = DatasourcePlugins.Board.useSubOwnBoard(
    props.client
  );
  const [
    results0100,
    setResults0100
  ] = DatasourcePlugins.Board.useSubOtherBoard(props.client);

  const dispatch0000 = (action: string, payload: any) => {
    switch (action) {
      case 'createBoard': {
        DatasourcePlugins.Board.createBoard(
          payload,
          results0000,
          setResults0000
        );
        break;
      }

      case 'viewBoard': {
        DatasourcePlugins.Board.viewBoard(payload, results0000, setResults0000);
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
        DatasourcePlugins.Board.viewBoard(payload, results0100, setResults0100);
        break;
      }

      default: {
        break;
      }
    }
  };

  return (
    <>
      <ComponentPlugins.ListComponent
        dataSource={results0000}
        dispatch={dispatch0000}
        match={props.match}
        client={props.client}
        {...props0000}
      />

      <ComponentPlugins.ListComponent
        dataSource={results0100}
        dispatch={dispatch0100}
        match={props.match}
        client={props.client}
        {...props0100}
      />
    </>
  );
}
