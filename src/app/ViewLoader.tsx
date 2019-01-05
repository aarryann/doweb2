// tslint:disable:no-console
// tslint:disable:prefer-for-of
// tslint:disable:jsx-no-lambda
import React from 'react';
import { withApollo } from 'react-apollo';

import appConfig from '../config/viewconfig.yaml';
import { Components } from '../controlled';

function ViewLoader(props: any) {
  const path = props.location.pathname;
  // console.log(path);
  const routeKeys: string[] = Object.keys(appConfig.Routes);
  let template = path;
  // prettier-ignore
  const re1 = new RegExp('/:[A-Za-z0-9]+');
  let re2;
  let reStr;
  let test;
  for (let i = 0; i < routeKeys.length; i++) {
    template = routeKeys[i];
    // console.log(template);
    reStr = template.replace(re1, '/[A-Za-z0-9]');
    re2 = new RegExp('^' + reStr + '$');
    // console.log(re2);
    test = re2.test(path);
    // console.log(test);
    if (test) {
      break;
    }
  }

  const params: any = {};
  if (template.indexOf(':') >= 1) {
    const templateArr = template.split('/');
    const pathArr = path.split('/');
    // console.log(templateArr);
    // console.log(pathArr);
    for (let i = 0; i < templateArr.length; i++) {
      if (templateArr[i].indexOf(':') !== 0) {
        continue;
      }
      params[templateArr[i]] = pathArr[i];
    }
  }
  // console.log(params);

  const matchedView = appConfig.Routes[template];
  console.log(matchedView);

  const LoadedComponent = (Components as any)[
    matchedView.entity + matchedView.category
  ];

  // console.log(props);
  // console.log(matchedView);
  return <LoadedComponent {...props} {...params} {...matchedView} />;
}

export default withApollo(ViewLoader);
