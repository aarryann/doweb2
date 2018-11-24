// tslint:disable
import React from 'react';
import { lazy } from 'react';
import DynamicComponent from '../framework/DynamicComponent';

function Waterfall(props: any) {
  const DynamicModule = (language: string) => {
    switch (language) {
      case 'Dynamic.ExampleFunctionComponent': {
        return lazy(() => import('../compound/ExampleFunctionComponent'));
      }
      // ...etc
      // We know the list of languages, because we created a source file for each one!
    }
  };

  function renderDynamicComponents(children: any) {
    const keys = Object.keys(children);
    return keys.map((key: string) => {
      return <DynamicComponent component={children[key].component} />;
    });
  }

  console.log('Waterfall');
  //console.log(props);
  const componentList = props.children;
  console.log(componentList);
  console.log(componentList['0000']);
  return <>{renderDynamicComponents(componentList)}</>;
}

export default Waterfall;
