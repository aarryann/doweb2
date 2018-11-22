// tslint:disable
import React from 'react';
import { withApollo } from 'react-apollo';

function Waterfall(props: any) {
  console.log('Waterfall');
  //console.log(props);
  const componentList = props.children;
  console.log(componentList);
  console.log(componentList['0000']);
  let componentName;
  for (let value in componentList) {
    console.log(value);
  }
  return <></>;
}

export default Waterfall;
