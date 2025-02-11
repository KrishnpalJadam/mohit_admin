// ** Graphql
import { gql } from "@apollo/client";

export const GET_PRODUCTS = gql`
  query (
    $page: Int!
    $limit: Int!
    $category: [String]
    $priceRange: [String]
    $trending: Boolean
    $inStock: Boolean
    $sortBy: String
  ) {
    getProducts(
      page: $page
      limit: $limit
      category: $category
      priceRange: $priceRange
      trending: $trending
      inStock: $inStock
      sortBy: $sortBy
    ) {
      totalCount
      products {
        _id
        name
        description
        category
        productType
        images
        regularPrice
        salePrice
        tax
        stock
        variants {
          _id
          attributes
          images
          regularPrice
          salePrice
          tax
          stock
        }
        trending
      }
    }
  }
`;

export const PRODUCTS = gql`
  mutation (
    $id: String
    $name: String!
    $description: String!
    $category: String!
    $productType: String!
    $images: [String!]!
    $regularPrice: Float!
    $salePrice: Float!
    $tax: Float
    $stock: Int
    $variants: [variantCombinationInputType]
  ) {
    products(
      id: $id
      name: $name
      description: $description
      category: $category
      productType: $productType
      images: $images
      regularPrice: $regularPrice
      salePrice: $salePrice
      tax: $tax
      stock: $stock
      variants: $variants
    ) {
      _id
      name
      description
      category
      productType
      images
      regularPrice
      salePrice
      tax
      stock
      variants {
        _id
        attributes
        images
        regularPrice
        salePrice
        tax
        stock
      }
      trending
      status
      message
    }
  }
`;

export const GET_PRODUCT_BY_ID = gql`
  mutation ($id: String!) {
    getProductById(id: $id) {
      _id
      name
      description
      category
      productType
      images
      regularPrice
      salePrice
      tax
      stock
      variants {
        _id
        attributes
        images
        regularPrice
        salePrice
        tax
        stock
      }
      trending
    }
  }
`;

export const SET_TRENDING_PRODUCTS = gql`
  mutation ($id: String!, $trending: Boolean!) {
    setTrendingProduct(id: $id, trending: $trending) {
      _id
      trending
      status
      message
    }
  }
`;

export const DELETE_PRODUCT = gql`
  mutation ($id: String!) {
    deleteProduct(id: $id) {
      _id
      status
      message
    }
  }
`;

export const GET_NEW_PRODUCTS = gql`
  query {
    getNewProducts {
      name
    }
  }
`;

export const OUT_OF_STOCK_PRODUCTS = gql`
  query {
    getOutOfStockProducts {
      name
    }
  }
`;
