// ** Graphql
import { gql } from "@apollo/client";

export const GET_STATIC_PAGES = gql`
  query {
    getStaticPages {
      _id
      pageName
      pageContent
    }
  }
`;

export const STATIC_PAGES = gql`
  mutation ($id: String, $pageName: String!, $pageContent: String!) {
    staticPages(id: $id, pageName: $pageName, pageContent: $pageContent) {
      _id
      pageName
      pageContent
      status
      message
    }
  }
`;

export const DELETE_STATIC_PAGE = gql`
  mutation ($id: String!) {
    deleteStaticPage(id: $id) {
      _id
      status
      message
    }
  }
`;
