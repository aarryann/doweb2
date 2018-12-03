// tslint:disable
import React from 'react';

import * as DataSources from '../data/datasources';
import { IManagerProps } from '../controlled/interfaces';

import ListComponent from '../controlled/List.component';

export default function ListBoardsManager(props: IManagerProps) {
  const subscriptionBoard = DataSources.useSubscriptionBoard(props.client);

  return (
    <>
      <ListComponent dataSource={subscriptionBoard} />
    </>
  );
}
