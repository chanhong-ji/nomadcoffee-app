import { gql } from "@apollo/client";

export const SHOP_FRAGMENT = gql`
  fragment ShopFragment on CoffeeShop {
    id
    name
    categories {
      name
    }
    mainPhoto {
      url
    }
    isLiked
    isMine
    likeCount
  }
`;
