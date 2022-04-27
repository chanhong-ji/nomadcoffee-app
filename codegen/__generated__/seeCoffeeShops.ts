/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: seeCoffeeShops
// ====================================================

export interface seeCoffeeShops_seeCoffeeShops_categories {
  __typename: "Category";
  name: string;
}

export interface seeCoffeeShops_seeCoffeeShops_mainPhoto {
  __typename: "CoffeeShopPhoto";
  url: string;
}

export interface seeCoffeeShops_seeCoffeeShops {
  __typename: "CoffeeShop";
  id: number;
  name: string;
  categories: (seeCoffeeShops_seeCoffeeShops_categories | null)[] | null;
  mainPhoto: seeCoffeeShops_seeCoffeeShops_mainPhoto | null;
  isLiked: boolean;
  isMine: boolean;
  likeCount: number;
}

export interface seeCoffeeShops {
  seeCoffeeShops: (seeCoffeeShops_seeCoffeeShops | null)[] | null;
}

export interface seeCoffeeShopsVariables {
  offset: number;
}
