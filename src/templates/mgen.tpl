import React from 'react';

import { Components } from '../controlled';
import { IManagerProps } from '../controlled/interfaces';
import { Datasources } from '../data';

export default function <=ROOT.entity><=ROOT.category>(props: IManagerProps) {
  <$REPEAT=ROOT.children>const props<=ROOT.children.ALL> = props.children['<=ROOT.children.ALL>'].props;<$ENDREPEAT>
  // Combine data and fetch into single state
  const [results0000, setResults0000] = Datasources.Boards.useSubOwnBoard(
    props.client
  );
  const [results0100, setResults0100] = Datasources.Boards.useSubOtherBoard(
    props.client
  );

  const dispatch0000 = (action: string, payload: any) => {
    switch (action) {
      case 'createBoard': {
        Datasources.Boards.createBoard(payload, results0000, setResults0000);
        break;
      }
      case 'viewBoard': {
        Datasources.Boards.viewBoard(payload, results0000, setResults0000);
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
        Datasources.Boards.viewBoard(payload, results0100, setResults0100);
        break;
      }
      default: {
        break;
      }
    }
  };

  return (
    <>
      <Components.ListComponent
        dataSource={results0000}
        dispatch={dispatch0000}
        {...props0000}
      />
      <Components.ListComponent
        dataSource={results0100}
        dispatch={dispatch0100}
        {...props0100}
      />
    </>
  );
}
