// tslint:disable
import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
  split
} from 'apollo-boost';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import { OperationDefinitionNode } from 'graphql';
import React from 'react';
import { ApolloProvider } from 'react-apollo';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import * as serviceWorker from './serviceWorker';

import './include/bootstrap'
import './assets/css/index.scss';

import App from './app/App';

declare const process: IProcess;

if (process.env.NODE_ENV !== 'production') {
  // const {whyDidYouUpdate} = require('why-did-you-update');
  // whyDidYouUpdate(React);
}

const httpLink = new HttpLink({ uri: process.env.REACT_APP_API_URL });

const wsLink = new WebSocketLink({
  uri: process.env.REACT_APP_SOCKET_URL,
  options: {
    reconnect: true
  }
});

const authLink = new ApolloLink((operation, forward) => {
  // Retrieve the authorization token from local storage.
  const token = localStorage.getItem(process.env.REACT_APP_TOKEN_NAME);

  // Use the setContext method to set the HTTP headers.
  operation.setContext({
    headers: {
      authorization: token ? `Bearer ${token}` : ''
    }
  });

  // Call the next link in the middleware chain.
  if (forward) {
    return forward(operation);
  } else {
    return null;
  }
});

const terminatingLink = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(
      query
    ) as OperationDefinitionNode;
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  wsLink,
  httpLink
);

const link = ApolloLink.from([terminatingLink]);

const clientOptions = () => {
  return {
    link: authLink.concat(link),
    cache: new InMemoryCache()
  };
};

const client = new ApolloClient(clientOptions());
const startApp = () => {
  ReactDOM.render(
    <BrowserRouter>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </BrowserRouter>,
    document.getElementById('root')
  );
};

startApp();
// registerServiceWorker();
serviceWorker.unregister();
