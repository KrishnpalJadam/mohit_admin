// ** Graphql
import { gql } from "@apollo/client";

export const GET_PRODUCT_SETTINGS = gql`
  query {
    getProductSettings {
      _id
      categories
      variants {
        _id
        name
        options {
          _id
          value
          meta
        }
      }
      productCardType
    }
  }
`;

export const PRODUCT_SETTINGS = gql`
  mutation ($id: String, $categories: [String], $productCardType: String) {
    productSettings(
      id: $id
      categories: $categories
      productCardType: $productCardType
    ) {
      _id
      categories
      variants {
        _id
        name
        options {
          _id
          value
          meta
        }
      }
      productCardType
      status
      message
    }
  }
`;

export const PRODUCT_VARIANTS = gql`
  mutation ($id: String!, $variant: variantInputType!) {
    productVariants(id: $id, variant: $variant) {
      _id
      categories
      variants {
        _id
        name
        options {
          value
          meta
        }
      }
      productCardType
      status
      message
    }
  }
`;

export const DELETE_PRODUCT_VARIANT = gql`
  mutation ($id: String!, $variantId: String!) {
    deleteProductVariant(id: $id, variantId: $variantId) {
      _id
      categories
      variants {
        _id
        name
        options {
          _id
          value
          meta
        }
      }
      productCardType
      status
      message
    }
  }
`;
