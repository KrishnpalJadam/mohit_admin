// ** Graphql
import { gql } from "@apollo/client";

export const GET_ORDERS = gql`
  query {
    getOrders {
      _id
      customer {
        customerId
        name
        email
        phoneNumber
        address {
          address1
          address2
          city
          state
          country
          postal_code
        }
      }
      products {
        productId
        name
        images
        price
        tax
        variantId
        variantName
        quantity
      }
      appliedCoupon
      couponDiscount
      paymentMethod
      paymentStatus
      deliveryStatus
      dateOfPurchase
      mrp
      taxes
      totalAmount
      shippingFees
      expectedDelivery
    }
  }
`;

export const EDIT_ORDER = gql`
  mutation (
    $id: String!
    $paymentStatus: String
    $deliveryStatus: String
    $trackingLink: String
  ) {
    editOrder(
      id: $id
      paymentStatus: $paymentStatus
      deliveryStatus: $deliveryStatus
      trackingLink: $trackingLink
    ) {
      _id
      customer {
        customerId
        name
        email
        phoneNumber
        address {
          address1
          address2
          city
          state
          country
          postal_code
        }
      }
      products {
        productId
        name
        images
        price
        tax
        variantId
        variantName
        quantity
      }
      appliedCoupon
      couponDiscount
      paymentMethod
      paymentStatus
      deliveryStatus
      dateOfPurchase
      mrp
      taxes
      totalAmount
      shippingFees
      expectedDelivery
      trackingLink
      status
      message
    }
  }
`;

export const GET_ORDER_BY_ID = gql`
  mutation ($id: String!) {
    getOrderById(id: $id) {
      _id
      customer {
        customerId
        name
        email
        phoneNumber
        address {
          address1
          address2
          city
          state
          country
          postal_code
        }
      }
      products {
        productId
        name
        images
        price
        tax
        variantId
        variantName
        quantity
      }
      appliedCoupon
      couponDiscount
      paymentMethod
      paymentStatus
      deliveryStatus
      dateOfPurchase
      mrp
      taxes
      totalAmount
      shippingFees
      expectedDelivery
      status
      message
    }
  }
`;

export const GET_CUSTOMER_ORDERS = gql`
  mutation ($customerId: String) {
    getOrdersByCustomerId(customerId: $customerId) {
      _id
      customer {
        customerId
        name
        email
        phoneNumber
        address {
          address1
          address2
          city
          state
          country
          postal_code
        }
      }
      products {
        productId
        name
        images
        price
        tax
        variantId
        variantName
        quantity
      }
      appliedCoupon
      couponDiscount
      paymentMethod
      paymentStatus
      deliveryStatus
      dateOfPurchase
      mrp
      taxes
      totalAmount
      shippingFees
      expectedDelivery
      status
      message
    }
  }
`;

export const TOTAL_REVENUE = gql`
  query {
    getRevenue {
      totalAmount
    }
  }
`;

export const PRODUCTS_SOLD = gql`
  query {
    getSoldProducts {
      products {
        quantity
      }
    }
  }
`;

export const GET_PREV_MONTH_ORDERS = gql`
  query {
    getPrevMonthOrders {
      createdAt
    }
  }
`;

export const GET_QUARTER_REVENUE = gql`
  query {
    getLastQuarterRevenue {
      totalAmount
      createdAt
    }
  }
`;
