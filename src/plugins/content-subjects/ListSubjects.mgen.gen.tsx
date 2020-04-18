// tslint:disable
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';

import { ComponentPlugins } from '../../plugins';
import { IManagerProps } from '../../app/interfaces/interfaces';
import { DatasourcePlugins } from '../';

export default function ListSubjectsMgen(props: IManagerProps) {
  const props0100 = props.view.children['0100'].props;

  // Combine data and fetch into single state
  const [pending, isPending] = DatasourcePlugins.Context.useCheckContext(
    props.client,
    ['studyId', 'siteId']
  );
  const [contextPending, setPending]: [any, any] = useState(isPending);
  // Combine data and fetch into single state
  const [
    results0100,
    setResults0100
  ] = DatasourcePlugins.Visit.useSubscribeSubjects(
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
        DatasourcePlugins.Visit.addSubject(
          payload,
          results0100,
          setResults0100
        );
        break;
      }

      case 'viewSubject': {
        DatasourcePlugins.Visit.viewSubject(
          payload,
          results0100,
          setResults0100
        );
        break;
      }

      default: {
        break;
      }
    }
  };

  return (
    <>
      <ComponentPlugins.PageContextComponent dispatch={dispatch0000} />
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
