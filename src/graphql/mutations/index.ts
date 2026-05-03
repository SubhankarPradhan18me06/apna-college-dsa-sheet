import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      user {
        id
        name
        email
        avatar
        role
        createdAt
      }
      message
    }
  }
`;

export const REGISTER = gql`
  mutation Register($name: String!, $email: String!, $password: String!) {
    register(name: $name, email: $email, password: $password) {
      user {
        id
        name
        email
        avatar
        role
        createdAt
      }
      message
    }
  }
`;

export const LOGOUT = gql`
  mutation Logout {
    logout
  }
`;

export const TOGGLE_PROGRESS = gql`
  mutation ToggleProgress($problemId: ID!) {
    toggleProgress(problemId: $problemId) {
      problemId
      completed
    }
  }
`;
