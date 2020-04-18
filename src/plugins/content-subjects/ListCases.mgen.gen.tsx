import React from 'react';

import { ComponentPlugins } from '../../plugins';
import { IManagerProps } from '../../app/interfaces/interfaces';
import { DatasourcePlugins } from '../';

export default function ListCasesMgen(props: IManagerProps) {
  const props0000 = props.view.children['0000'].props;

  // Combine data and fetch into single state
  const [results0000, setResults0000] = DatasourcePlugins.Case.useCases(
    props.client
  );

  const dispatch0000 = (action: string, payload: any) => {
    switch (action) {
      case 'viewBoard': {
        DatasourcePlugins.Case.viewCase(payload, results0000, setResults0000);
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
    </>
  );
}
