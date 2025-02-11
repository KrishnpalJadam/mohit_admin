// ** Graphql
import { gql } from "@apollo/client";

export const CHANGE_ADMIN_PASSWORD = gql`
  mutation (
    $email: String!
    $newPassword: String!
    $confirmNewPassword: String!
  ) {
    changeAdminPassword(
      email: $email
      newPassword: $newPassword
      confirmNewPassword: $confirmNewPassword
    ) {
      status
      message
    }
  }
`;
