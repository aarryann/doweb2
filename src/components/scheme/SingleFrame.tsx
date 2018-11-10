// tslint:disable
import React from 'react';
import { withApollo } from 'react-apollo';

import appConfig from '../../../config/appConfig.yaml';

interface ISingleFrameProps {
  client: any;
}

function SingleFrame(props: ISingleFrameProps) {
  console.log(appConfig);
  return <></>;
}

export default withApollo(SingleFrame);
