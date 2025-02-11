// ** Graphql
import { gql } from "@apollo/client";

export const GET_CUSTOMERS = gql`
  query {
    getCustomers {
      customers {
        _id
        firstName
        lastName
        avatar
        email
        phoneNumber
        gender
        dob
        address {
          address1
          address2
          city
          state
          country
          postal_code
        }
        customerStatus
      }
      status
      message
    }
  }
`;

export const GET_CUSTOMER_BY_ID = gql`
  mutation ($id: String!) {
    getCustomerById(id: $id) {
      _id
      firstName
      lastName
      avatar
      email
      phoneNumber
      gender
      dob
      address {
        address1
        address2
        city
        state
        country
        postal_code
      }
      customerStatus
      status
      message
    }
  }
`;

export const CUSTOMERS = gql`
  mutation ($id: String, $customerStatus: String) {
    customers(id: $id, customerStatus: $customerStatus) {
      _id
      firstName
      lastName
      avatar
      email
      phoneNumber
      gender
      dob
      address {
        address1
        address2
        city
        state
        country
        postal_code
      }
      customerStatus
      status
      message
    }
  }
`;

export const GET_NEW_CUSTOMERS = gql`
  query {
    getNewCustomers {
      email
    }
  }
`;

export const GET_SUSPENDED_CUSTOMERS = gql`
  query {
    getSuspendedCustomers {
      email
    }
  }
`;
