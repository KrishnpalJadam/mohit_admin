// ** Graphql
import { gql } from "@apollo/client";

export const GET_ROLES_PRIVILEGES = gql`
  query {
    getRolesPrivileges {
      _id
      name
      privileges
    }
  }
`;

export const ROLES_PRIVILEGES = gql`
  mutation ($id: String, $name: String, $privileges: [String]) {
    rolesPrivileges(id: $id, name: $name, privileges: $privileges) {
      _id
      name
      privileges
      status
      message
    }
  }
`;

export const DELETE_ROLE = gql`
  mutation ($id: String!) {
    deleteRole(id: $id) {
      _id
      status
      message
    }
  }
`;
