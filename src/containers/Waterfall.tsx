// tslint:disable
import React from 'react';
import LoadedComponent from '../app/ControlLoader';

function Waterfall(props: any) {
  console.log('Waterfall');
  console.log(props);
  const componentList = props.children;
  // console.log(componentList);
  // console.log(componentList['0000']);
  const keys = Object.keys(componentList);

  const rows = [];
  for (let i = 0; i < keys.length; i++) {
    rows.push(
      <LoadedComponent key={i} component={componentList[keys[i]].component} />
    );
  }
  return <>{rows}</>;
}

export default Waterfall;
