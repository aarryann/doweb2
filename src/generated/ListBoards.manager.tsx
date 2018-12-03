// tslint:disable
import React from 'react';

import * as DataSources from '../data/datasources';
import { IManagerProps } from '../controlled/interfaces';

import ListComponent from '../controlled/List.component';

export default function ListBoardsManager(props: IManagerProps) {
  const [data, fetching] = DataSources.useSubscriptionBoard(props.client);
  console.log(data);
  console.log(fetching);

  return (
    <>
      <ListComponent fetching={fetching} dataSource={data} />
    </>
  );
}
