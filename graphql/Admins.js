// ** Graphql
import { gql } from "@apollo/client";

export const ADMIN_LOGIN = gql`
  mutation ($email: String!, $password: String!) {
    adminLogin(email: $email, password: $password) {
      role {
        name
        privileges
      }
      status
      message
    }
  }
`;

export const GET_ADMINS = gql`
  query {
    getAdmins {
      _id
      name
      email
      role {
        _id
        name
        privileges
      }
    }
  }
`;

export const ADMINS = gql`
  mutation (
    $id: String
    $name: String
    $email: String!
    $password: String!
    $role: String!
  ) {
    admins(
      id: $id
      name: $name
      email: $email
      password: $password
      role: $role
    ) {
      _id
      name
      email
      role {
        _id
        name
        privileges
      }
      status
      message
    }
  }
`;

export const DELETE_ADMIN = gql`
  mutation ($id: String!) {
    deleteAdmin(id: $id) {
      _id
      status
      message
    }
  }
`;

export const LOGOUT = gql`
  mutation {
    logout {
      status
      message
    }
  }
`;
