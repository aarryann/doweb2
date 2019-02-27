import React from 'react';

import { Components } from '../controlled';
import { IManagerProps } from '../controlled/interfaces';
import { Datasources } from '../data';

export default function ListCasesMgen(props: IManagerProps) {
  const props0000 = props.view.children['0000'].props;

  // Combine data and fetch into single state
  const [results0000, setResults0000] = Datasources.Case.useCases(props.client);

  const dispatch0000 = (action: string, payload: any) => {
    switch (action) {
      case 'viewBoard': {
        Datasources.Case.viewCase(payload, results0000, setResults0000);
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
        match={props.match}
        client={props.client}
        {...props0000}
      />
    </>
  );
}
