import gql from 'graphql-tag';

export const queries = {
  getAllSubjects: gql`
    query AllSubjects($studyId: ID!, $siteId: ID!) {
      allSubjects(studyId: $studyId, siteId: $siteId) {
        id
        firstName
      }
    }
  `,
  getOneSubject: gql`
    query {
      oneSubject {
        id
        firstName
      }
    }
  `
};

export const mutations = {
  addSubject: gql`
    mutation AddSubject($name: String!, $owner: ID) {
      addSubject(name: $name, owner: $owner) {
        id
        firstName
      }
    }
  `
};

export const subscriptions = {
  subjectAdded: gql`
    subscription {
      subjectAdded {
        id
        firstName
        lastName
      }
    }
  `
};
