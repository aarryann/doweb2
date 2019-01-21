import React from "react";

import { Components } from "../controlled";
import { IManagerProps } from "../controlled/interfaces";
import { Datasources } from "../data";

export default function BoardDetailsMgen(props: IManagerProps) {
  const props0000 = props.children["0000"].props;

  // Combine data and fetch into single state
  const [results0000, setResults0000] = Datasources.Boards.useSubOwnBoard(
    props.client
  );

  const dispatch0000 = (action: string, payload: any) => {
    switch (action) {
      case "viewBoard": {
        Datasources.Boards.viewBoard(payload, results0000, setResults0000);
        break;
      }

      default: {
        break;
      }
    }
  };

  return (
    <>
      <Components.ExampleFunctionComponent
        dataSource={results0000}
        dispatch={dispatch0000}
        {...props0000}
      />
    </>
  );
}
