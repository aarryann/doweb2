// tslint:disable
// tslint:disable:jsx-no-lambda
import React from 'react';
import { withApollo } from 'react-apollo';

import appConfig from '../config/appConfig.yaml';

// import Components from '../components/components';

function Container(props: any) {
  console.log(appConfig);

  return <></>;
}

export default withApollo(Container);
