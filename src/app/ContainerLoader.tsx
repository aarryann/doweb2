// tslint:disable
// tslint:disable:jsx-no-lambda
import React from 'react';
import { withApollo } from 'react-apollo';

import appConfig from '../config/appconfig.yaml';
import Waterfall from '../containers/Waterfall';

function Container(props: any) {
  const currentPath = props.location.pathname;
  const matchedComponentConfig = appConfig[currentPath];
  // console.log(matchedComponentConfig);

  return <Waterfall {...props} {...matchedComponentConfig} />;
}

export default withApollo(Container);
