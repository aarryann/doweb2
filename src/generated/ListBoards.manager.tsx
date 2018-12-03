// tslint:disable
import React from 'react';

import * as DataSources from '../data/datasources';
import { IManagerProps } from '../controlled/interfaces';

import ListComponent from '../controlled/List.component';

export default function ListBoardsManager(props: IManagerProps) {
  const [data0000, fetching0000] = DataSources.useSubscriptionBoard(
    props.client
  );
  console.log(data0000);
  console.log(fetching0000);
  const props0000 = props.children['0000'].props;
  console.log(props0000);

  return (
    <>
      <ListComponent
        fetching={fetching0000}
        dataSource={data0000}
        {...props0000}
      />
    </>
  );
}
