import React from 'react';

import { Plugins } from '../../plugins';
import { IManagerProps } from '../app/interfaces';
import { Datasources } from '../data';

export default function <=ROOT.entity><=ROOT.category>(props: IManagerProps) {
  <$REPEAT=$1 $1=ROOT.children>const props<=$1:KEY> = props.view.children['<=$1:KEY>'].props;<$ENDREPEAT>
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
      <$REPEAT=$1>
        <Plugins.<=$1:CONTENTS.component>
          dataSource={results<=$1:KEY>}
          dispatch={dispatch<=$1:KEY>}
          match={props.match}
          client={props.client}
          {...props<=$1:KEY>}
        />
      <$ENDREPEAT>
    </>
  );
}
