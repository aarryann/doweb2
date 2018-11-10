import gql from 'graphql-tag';

export const queries = {
  currentUser: gql`
    query {
      currentUser {
        user {
          id
          email
        }
      }
    }
  `
};

export const mutations = {
  login: gql`
    mutation Login($email: String!, $password: String!) {
      login(email: $email, password: $password) {
        token
        user {
          id
          email
        }
      }
    }
  `,
  register: gql`
    mutation Login($email: String!, $password: String!) {
      login(email: $email, password: $password) {
        token
        user {
          id
          email
        }
      }
    }
  `
};
