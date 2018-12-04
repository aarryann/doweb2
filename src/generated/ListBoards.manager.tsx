// tslint:disable
import React from 'react';

import * as DataSources from '../data/datasources';
import { IManagerProps } from '../controlled/interfaces';

import ListComponent from '../controlled/List.component';

export default function ListBoardsManager(props: IManagerProps) {
  const [data0000, fetching0000] = DataSources.useSubscriptionOwnBoard(
    props.client
  );
  const [data0100, fetching0100] = DataSources.useSubscriptionOtherBoard(
    props.client
  );
  const props0000 = props.children['0000'].props;
  const props0100 = props.children['0100'].props;

  return (
    <>
      <ListComponent
        fetching={fetching0000}
        dataSource={data0000}
        {...props0000}
      />
      <ListComponent
        fetching={fetching0100}
        dataSource={data0100}
        {...props0100}
      />
    </>
  );
}
