import gql from 'graphql-tag';

export const queries = {
  getOwnBoards: gql`
    query AllSubjects($study: ID, $site: ID) {
      allSubjects(study: $study, site: $site) {
        firstName
      }
    }
  `,
  getOtherBoards: gql`
    query {
      currentUser {
        user {
          otherBoards {
            id
            name
          }
        }
      }
    }
  `
};

export const mutations = {
  createBoard: gql`
    mutation CreateBoard($name: String!, $owner: ID) {
      createBoard(name: $name, owner: $owner) {
        id
        name
      }
    }
  `
};

export const subscriptions = {
  createBoard: gql`
    subscription {
      boardCreated {
        id
        name
      }
    }
  `
};
