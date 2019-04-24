// tslint:disable
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';

import { Components } from '../controlled';
import { IManagerProps } from '../controlled/interfaces';
import { Datasources } from '../data';

export default function ListSubjectsMgen(props: IManagerProps) {
  const props0100 = props.view.children['0100'].props;

  // Combine data and fetch into single state
  const [pending, isPending] = Datasources.App.useCheckContext(props.client, [
    'studyId',
    'siteId'
  ]);
  const [contextPending, setPending]: [any, any] = useState(isPending);
  // Combine data and fetch into single state
  const [results0100, setResults0100] = Datasources.Visit.useSubscribeSubjects(
    props.client,
    contextPending
  );
  const [theme, setTheme]: [any, any] = useState({});

  const dispatch0000 = (action: string, payload: any) => {
    switch (action) {
      case 'setClipCss': {
        setTheme((t: any) => {
          t.clipped = payload;
          return t;
        });
        break;
      }

      default: {
        break;
      }
    }
  };
  const dispatch0100 = (action: string, payload: any) => {
    switch (action) {
      case 'addSubject': {
        Datasources.Visit.addSubject(payload, results0100, setResults0100);
        break;
      }

      case 'viewSubject': {
        Datasources.Visit.viewSubject(payload, results0100, setResults0100);
        break;
      }

      default: {
        break;
      }
    }
  };

  return (
    <>
      <Components.PageContextComponent dispatch={dispatch0000} />
      <Components.ListComponent
        dataSource={results0100}
        dispatch={dispatch0100}
        match={props.match}
        client={props.client}
        {...props0100}
      />
    </>
  );
}
