// ** Graphql
import { gql } from "@apollo/client";

export const GET_SITE_SETTINGS = gql`
  query {
    getSiteSettings {
      _id
      logo
      topbar
      topbarContent
      topbarStyle
      headerLayout
      footerLayout
      socials
      paymentMethods
      customerViews
      customerViewsNos
      customerViewsTimer
      soldInLast
      soldInLastProducts
      soldInLastHours
      countdown
      countdownText
      countdownTimer
      hotStock
      hotStockInventoryLevel
      status
      message
    }
  }
`;

export const SITE_SETTINGS = gql`
  mutation siteSettings(
    $id: String
    $logo: String
    $topbar: Boolean
    $topbarContent: String
    $topbarStyle: String
    $headerLayout: String
    $footerLayout: String
    $socials: [String]
    $paymentMethods: [String]
    $customerViews: Boolean
    $customerViewsNos: [String]
    $customerViewsTimer: String
    $soldInLast: Boolean
    $soldInLastProducts: [String]
    $soldInLastHours: [String]
    $countdown: Boolean
    $countdownText: String
    $countdownTimer: Float
    $hotStock: Boolean
    $hotStockInventoryLevel: Float
  ) {
    siteSettings(
      id: $id
      logo: $logo
      topbar: $topbar
      topbarContent: $topbarContent
      topbarStyle: $topbarStyle
      headerLayout: $headerLayout
      footerLayout: $footerLayout
      socials: $socials
      paymentMethods: $paymentMethods
      customerViews: $customerViews
      customerViewsNos: $customerViewsNos
      customerViewsTimer: $customerViewsTimer
      soldInLast: $soldInLast
      soldInLastProducts: $soldInLastProducts
      soldInLastHours: $soldInLastHours
      countdown: $countdown
      countdownText: $countdownText
      countdownTimer: $countdownTimer
      hotStock: $hotStock
      hotStockInventoryLevel: $hotStockInventoryLevel
    ) {
      _id
      logo
      topbar
      topbarContent
      topbarStyle
      headerLayout
      footerLayout
      socials
      paymentMethods
      customerViews
      customerViewsNos
      customerViewsTimer
      soldInLast
      soldInLastProducts
      soldInLastHours
      countdown
      countdownText
      countdownTimer
      hotStock
      hotStockInventoryLevel
      status
      message
    }
  }
`;
