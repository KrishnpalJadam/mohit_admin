// ** Graphql
import { gql } from "@apollo/client";

export const GET_SHIPPING = gql`
  query {
    getShipping {
      _id
      fees
      minValue
      expectedDelivery
    }
  }
`;

export const SHIPPING = gql`
  mutation (
    $id: String
    $fees: Float!
    $minValue: Float!
    $expectedDelivery: Float!
  ) {
    shipping(
      id: $id
      fees: $fees
      minValue: $minValue
      expectedDelivery: $expectedDelivery
    ) {
      _id
      fees
      minValue
      expectedDelivery
      status
      message
    }
  }
`;
