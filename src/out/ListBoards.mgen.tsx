import React from 'react';

import { Components } from '../controlled';
import { IManagerProps } from '../controlled/interfaces';
import { Datasources } from '../data';

export default function ListBoardsMgen(props: IManagerProps) {
  const props0000 = props.children['0000'].props;
  const props0100 = props.children['0100'].props;

  // Combine data and fetch into single state
  const [results0000, setResults0000] = Datasources.Boards.useSubOwnBoard(
    props.client
  );
  const [results0100, setResults0100] = Datasources.Boards.useSubOtherBoard(
    props.client
  );

  return <></>;
}
