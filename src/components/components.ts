import { lazy } from 'react';

export default {
  ListManager: lazy(() => import('./compound/ExampleFunctionComponent')),
  ListComponent: lazy(() => import('./compound/ExampleFunctionComponent')),
  ListInform: lazy(() => import('./compound/ExampleFunctionComponent')),
  TabForm: lazy(() => import('./compound/ExampleFunctionComponent'))
};
