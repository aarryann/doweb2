/* eslint-disable react-hooks/exhaustive-deps */
// tslint:disable:no-console
// tslint:disable:prefer-for-of
// tslint:disable:jsx-no-lambda
import React from 'react';
import { withApollo } from 'react-apollo';

import appConfig from '../config/viewconfig.yaml';
import { ComponentPlugins } from '../plugins';

const findMatchedRoute = (path: string) => {
  //const routeKeys: string[] = Object.keys(routes);
  const routeKeys: string[] = Object.keys(appConfig.Routes);
  let matchedRoute = path;
  // Look for anything preceded by a colon - for param variable
  // prettier-ignore
  const re1 = new RegExp('/:[A-Za-z0-9]+');
  // match the corresponding routepath for the window path
  for (let i = 0; i < routeKeys.length; i++) {
    matchedRoute = routeKeys[i];
    const reStr = matchedRoute.replace(re1, '/[A-Za-z0-9]+');
    const re2 = new RegExp('^' + reStr + '$');
    const test = re2.test(path);
    if (test) {
      break;
    }
  }
  return matchedRoute;
};

const extractParams = (path: string, matchedRoute: string) => {
  // Extract params from window path
  const params: any = {};
  if (matchedRoute.indexOf(':') >= 1) {
    const templateArr = matchedRoute.split('/');
    const pathArr = path.split('/');
    for (let i = 0; i < templateArr.length; i++) {
      if (templateArr[i].indexOf(':') !== 0) {
        continue;
      }
      params[templateArr[i]] = pathArr[i];
    }
  }

  return params;
};

const appendProps = (props: any, matchedRoute: string, params: any) => {
  const match: any = {};
  match.location = props.pathname;
  match.url = matchedRoute;
  match.params = params;
  match.fnURL = function(newUrl: string) {
    return (this.location + newUrl).replace(/\/\//g, '/');
  };

  const newProps: any = Object.assign({}, props);
  newProps.match = match;
  newProps.view = appConfig.Routes[matchedRoute];

  return newProps;
};

function ViewLoader(props: any) {
  const matchedRoute: string = findMatchedRoute(props.pathname);
  const params: string = extractParams(props.pathname, matchedRoute);
  const newProps: any = appendProps(props, matchedRoute, params);

  const LoadedComponent = (ComponentPlugins as any)[
    newProps.view.entity + newProps.view.category
  ];
  return <LoadedComponent {...newProps} />;
}

function areEqual(prevProps: any, nextProps: any) {
  return prevProps.pathname === nextProps.pathname;
}

export default withApollo(React.memo(ViewLoader, areEqual));
