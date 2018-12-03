// tslint:disable
// tslint:disable:jsx-no-lambda
import React from 'react';
import { withApollo } from 'react-apollo';

import appConfig from '../config/appconfig.yaml';
import * as Controlled from '../controlled';
import * as Generated from '../generated';

function ViewLoader(props: any) {
  const matchedConfig = appConfig[props.location.pathname];

  let LoadedComponent;
  if (matchedConfig.generator)
    LoadedComponent = (Generated as any).default[
      matchedConfig.generator + 'Manager'
    ];
  else
    LoadedComponent = (Controlled as any).default[
      matchedConfig.component + 'Component'
    ];
  return <LoadedComponent {...props} {...matchedConfig} />;
}

export default withApollo(ViewLoader);
