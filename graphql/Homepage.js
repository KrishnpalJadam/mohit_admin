// ** Graphql
import { gql } from "@apollo/client";

export const GET_HOMEPAGE = gql`
  query {
    getHomepage {
      _id
      heroType
      heroImagesLarge
      heroImagesSmall
      heroHeading
      heroSubHeading
      heroBtnText
      heroLink
      heroCountdown
      heroCountdownText
      marquee
      marqueeText
      subHeroTitle
      subHeroImages
      subHeroHeading
      subHeroBtnText
      subHeroLink
      riskReducersImages
      riskReducersHeading
      riskReducersText
      spotlight1
      spotlight1Image
      spotlight1Link
      spotlight2
      spotlight2Image
      spotlight2Link
      categoryTitle
      categoryImages
      categoryHeading
      categoryText
      categoryLink
      newsletter
      newsletterHeading
      newsletterText
      newsletterBtnText
      newsletterSuccessHeading
      newsletterSuccessText
      trending
      trendingLimit
    }
  }
`;

export const HOMEPAGE = gql`
  mutation (
    $id: String
    $heroType: String
    $heroImagesLarge: [String]
    $heroImagesSmall: [String]
    $heroHeading: String
    $heroSubHeading: String
    $heroBtnText: String
    $heroLink: String
    $heroCountdown: Float
    $heroCountdownText: String
    $marquee: Boolean
    $marqueeText: String
    $subHeroTitle: String
    $subHeroImages: [String]
    $subHeroHeading: [String]
    $subHeroBtnText: [String]
    $subHeroLink: [String]
    $riskReducersImages: [String]
    $riskReducersHeading: [String]
    $riskReducersText: [String]
    $spotlight1: Boolean
    $spotlight1Image: String
    $spotlight1Link: String
    $spotlight2: Boolean
    $spotlight2Image: String
    $spotlight2Link: String
    $categoryTitle: String
    $categoryImages: [String]
    $categoryHeading: [String]
    $categoryText: [String]
    $categoryLink: [String]
    $newsletter: Boolean
    $newsletterHeading: String
    $newsletterText: String
    $newsletterBtnText: String
    $newsletterSuccessHeading: String
    $newsletterSuccessText: String
    $trending: Boolean
    $trendingLimit: Int
  ) {
    homepage(
      id: $id
      heroType: $heroType
      heroImagesLarge: $heroImagesLarge
      heroImagesSmall: $heroImagesSmall
      heroHeading: $heroHeading
      heroSubHeading: $heroSubHeading
      heroBtnText: $heroBtnText
      heroLink: $heroLink
      heroCountdown: $heroCountdown
      heroCountdownText: $heroCountdownText
      marquee: $marquee
      marqueeText: $marqueeText
      subHeroTitle: $subHeroTitle
      subHeroImages: $subHeroImages
      subHeroHeading: $subHeroHeading
      subHeroBtnText: $subHeroBtnText
      subHeroLink: $subHeroLink
      riskReducersImages: $riskReducersImages
      riskReducersHeading: $riskReducersHeading
      riskReducersText: $riskReducersText
      spotlight1: $spotlight1
      spotlight1Image: $spotlight1Image
      spotlight1Link: $spotlight1Link
      spotlight2: $spotlight2
      spotlight2Image: $spotlight2Image
      spotlight2Link: $spotlight2Link
      categoryTitle: $categoryTitle
      categoryImages: $categoryImages
      categoryHeading: $categoryHeading
      categoryText: $categoryText
      categoryLink: $categoryLink
      newsletter: $newsletter
      newsletterHeading: $newsletterHeading
      newsletterText: $newsletterText
      newsletterBtnText: $newsletterBtnText
      newsletterSuccessHeading: $newsletterSuccessHeading
      newsletterSuccessText: $newsletterSuccessText
      trending: $trending
      trendingLimit: $trendingLimit
    ) {
      _id
      heroType
      heroImagesLarge
      heroImagesSmall
      heroHeading
      heroSubHeading
      heroBtnText
      heroLink
      heroCountdown
      heroCountdownText
      marquee
      marqueeText
      subHeroTitle
      subHeroImages
      subHeroHeading
      subHeroBtnText
      subHeroLink
      riskReducersImages
      riskReducersHeading
      riskReducersText
      spotlight1
      spotlight1Image
      spotlight1Link
      spotlight2
      spotlight2Image
      spotlight2Link
      categoryTitle
      categoryImages
      categoryHeading
      categoryText
      categoryLink
      newsletter
      newsletterHeading
      newsletterText
      newsletterBtnText
      newsletterSuccessHeading
      newsletterSuccessText
      trending
      trendingLimit
      status
      message
    }
  }
`;
