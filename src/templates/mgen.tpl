import React from 'react';

import { Components } from '../controlled';
import { IManagerProps } from '../controlled/interfaces';
import { Datasources } from '../data';

export default function ListBoardsMgen(props: IManagerProps) {
  #DECLARE_PROPS#
  // Combine data and fetch into single state
  #DECLARE_DATASOURCE#

  #DECLARE_ACTIONS#

  return (
    <>
      #LIST_COMPONENTS#
    </>
  );
}
