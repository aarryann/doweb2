// tslint:disable:no-console
// tslint:disable:prefer-for-of
// tslint:disable:jsx-no-lambda
import React from 'react';
import { withApollo } from 'react-apollo';

import appConfig from '../config/viewconfig.yaml';
import { Components } from '../controlled';

function ViewLoader(props: any) {
  // console.log(props);
  const path = props.pathname;
  const routeKeys: string[] = Object.keys(appConfig.Routes);
  let template = path;
  // prettier-ignore
  const re1 = new RegExp('/:[A-Za-z0-9]+');
  // Find the corresponding routepath for the window path
  for (let i = 0; i < routeKeys.length; i++) {
    template = routeKeys[i];
    const reStr = template.replace(re1, '/[A-Za-z0-9]+');
    const re2 = new RegExp('^' + reStr + '$');
    const test = re2.test(path);
    if (test) {
      break;
    }
  }
  // Extract params from window path
  const params: any = {};
  if (template.indexOf(':') >= 1) {
    const templateArr = template.split('/');
    const pathArr = path.split('/');
    for (let i = 0; i < templateArr.length; i++) {
      if (templateArr[i].indexOf(':') !== 0) {
        continue;
      }
      params[templateArr[i]] = pathArr[i];
    }
  }

  const matchedView = appConfig.Routes[template];

  const match: any = {};
  match.location = props.pathname;
  match.url = template;
  match.params = params;

  const LoadedComponent = (Components as any)[
    matchedView.entity + matchedView.category
  ];
  // console.log(LoadedComponent);

  return <LoadedComponent {...props} match={match} view={matchedView} />;
}

function areEqual(prevProps: any, nextProps: any) {
  return prevProps.pathname === nextProps.pathname;
}

export default React.memo(withApollo(ViewLoader), areEqual);
