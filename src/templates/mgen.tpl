import React from 'react';

import { Components } from '../controlled';
import { IManagerProps } from '../controlled/interfaces';
import { Datasources } from '../data';

export default function <=ROOT.entity><=ROOT.category>(props: IManagerProps) {
  <$REPEAT=$1 $1=ROOT.children>const props<=$1:ITEMVALUE> = props.children['<=$1:ITEMVALUE>'].props;<$ENDREPEAT>
  // Combine data and fetch into single state
  <$REPEAT=$1 $1=ROOT.children>const [results<=$1:ITEMVALUE>, setResults<=$1:ITEMVALUE>] = Datasources.<=$1:ITEMNODE.dataSource>(props.client);<$ENDREPEAT>

  <$REPEAT=$1 $1=ROOT.children>
    const dispatch<=$1:ITEMVALUE> = (action: string, payload: any) => {
      switch (action) {
        <$REPEAT=$2 $2=$1:ITEMNODE.actions>
          case '<=$2:ITEMVALUE>': {
            Datasources.<=$2:ITEMNODE>(payload, results<=$1:ITEMVALUE>, setResults<=$1:ITEMVALUE>);
            break;
          }
        <$ENDREPEAT>
        default: {
          break;
        }
      }
    };
  <$ENDREPEAT>

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
