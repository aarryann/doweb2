// tslint:disable
// tslint:disable:jsx-no-lambda
import React from 'react';
import { withApollo } from 'react-apollo';

import appConfig from '../config/appConfig.yaml';
import Waterfall from '../components/scheme/Waterfall';

// import Components from '../components/components';

function Container(props: any) {
  console.log(props);
  console.log(appConfig);
  const currentPath = props.location.pathname;
  const matchedComponentConfig = appConfig[currentPath];
  // console.log(matchedComponentConfig);

  return <Waterfall {...props} {...matchedComponentConfig} />;
}

export default withApollo(Container);
