/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ShopFragment
// ====================================================

export interface ShopFragment_categories {
  __typename: "Category";
  name: string;
}

export interface ShopFragment_mainPhoto {
  __typename: "CoffeeShopPhoto";
  url: string;
}

export interface ShopFragment {
  __typename: "CoffeeShop";
  id: number;
  name: string;
  categories: (ShopFragment_categories | null)[] | null;
  mainPhoto: ShopFragment_mainPhoto | null;
  isLiked: boolean;
  isMine: boolean;
  likeCount: number;
}
