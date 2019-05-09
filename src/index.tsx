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
import { ApolloProvider as ApolloHooksProvider } from 'react-apollo-hooks';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import * as serviceWorker from './serviceWorker';

import 'sanitize.css';
import 'typeface-roboto';
import './assets/scss/index.scss';
import './include/bootstrap';

import App from './app/App';

declare const process: IProcess;

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

console.log('Index entered');
const client = new ApolloClient(clientOptions());
const Root = () => (
  <Router>
    <ApolloProvider client={client}>
      <ApolloHooksProvider client={client}>
        <App />
      </ApolloHooksProvider>
    </ApolloProvider>
  </Router>
);

const rootElement = document.getElementById('root');
ReactDOM.render(<Root />, rootElement);

// registerServiceWorker();
serviceWorker.unregister();
