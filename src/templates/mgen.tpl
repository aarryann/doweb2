import React from 'react';

import { Components } from '../controlled';
import { IManagerProps } from '../controlled/interfaces';
import { Datasources } from '../data';

export default function <=ROOT.entity><=ROOT.category>(props: IManagerProps) {
  <$REPEAT=$1 $1=ROOT.children>const props<=$1:KEY> = props.children['<=$1:KEY>'].props;<$ENDREPEAT>
  // Combine data and fetch into single state
  <$REPEAT=$1>const [results<=$1:KEY>, setResults<=$1:KEY>] = Datasources.<=$1:CONTENTS.dataSource>(props.client);<$ENDREPEAT>

  <$REPEAT=$1>
    const dispatch<=$1:KEY> = (action: string, payload: any) => {
      switch (action) {
        <$REPEAT=$2 $2=$1:CONTENTS.actions>
          case '<=$2:KEY>': {
            Datasources.<=$2:CONTENTS>(payload, results<=$1:KEY>, setResults<=$1:KEY>);
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
