import React from 'react';

import { Components } from '../controlled';
import { IManagerProps } from '../controlled/interfaces';
import { Datasources } from '../data';

export default function BoardDetailsMgen(props: IManagerProps) {
  const props0000 = props.children['0000'].props;

  // Combine data and fetch into single state
  const [results0000, setResults0000] = Datasources.useSubBoardDetails(props.client);


  undefined

  return (
    <>
      undefined
    </>
  );
}
