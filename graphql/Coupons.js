// ** Graphql
import { gql } from "@apollo/client";

export const GET_COUPONS = gql`
  query {
    getCoupons {
      _id
      couponCode
      couponType
      discount
      limitPerUser
      maxValue
      minValue
      validFrom
      validTo
      isEnabled
    }
  }
`;

export const COUPONS = gql`
  mutation (
    $id: String
    $couponCode: String!
    $couponType: String!
    $discount: Float!
    $limitPerUser: Float!
    $maxValue: Float!
    $minValue: Float!
    $validFrom: String
    $validTo: String
    $isEnabled: Boolean!
  ) {
    coupons(
      id: $id
      couponCode: $couponCode
      couponType: $couponType
      discount: $discount
      limitPerUser: $limitPerUser
      maxValue: $maxValue
      minValue: $minValue
      validFrom: $validFrom
      validTo: $validTo
      isEnabled: $isEnabled
    ) {
      _id
      couponCode
      couponType
      discount
      limitPerUser
      maxValue
      minValue
      validFrom
      validTo
      isEnabled
      status
      message
    }
  }
`;

export const DELETE_COUPON = gql`
  mutation ($id: String!) {
    deleteCoupon(id: $id) {
      _id
      status
      message
    }
  }
`;
