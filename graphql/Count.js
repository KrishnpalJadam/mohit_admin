// ** Graphql
import { gql } from "@apollo/client";

export const GET_COUNT = gql`
  query ($model: String) {
    getCount(model: $model) {
      count
    }
  }
`;
