/* eslint-disable react-hooks/exhaustive-deps */
// tslint:disable:no-console
// tslint:disable:prefer-for-of
// tslint:disable:jsx-no-lambda
import React, { useMemo } from 'react';
import { withApollo } from 'react-apollo';

import appConfig from '../config/viewconfig.yaml';
import { Components } from '../controlled';

const GetLoader = (props: any) => {
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

  const match: any = {};
  match.location = props.pathname;
  match.url = template;
  match.params = params;
  match.fnURL = function(newUrl: string) {
    return (this.location + newUrl).replace(/\/\//g, '/');
  };

  const newProps: any = Object.assign({}, props);
  newProps.match = match;
  newProps.view = appConfig.Routes[template];

  return newProps;
};

function ViewLoader(props: any) {
  const newProps: any = useMemo(() => GetLoader(props), [props.pathname]);

  const LoadedComponent = (Components as any)[
    newProps.view.entity + newProps.view.category
  ];
  return <LoadedComponent {...newProps} />;
}

function areEqual(prevProps: any, nextProps: any) {
  return prevProps.pathname === nextProps.pathname;
}

export default withApollo(React.memo(ViewLoader, areEqual));
