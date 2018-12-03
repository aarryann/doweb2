import gql from 'graphql-tag';

export const queries = {
  fetchBoards: gql`
    query {
      currentUser {
        user {
          ownedBoards {
            id
            name
          }
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
