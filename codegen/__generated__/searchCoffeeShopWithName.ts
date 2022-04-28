/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: searchCoffeeShopWithName
// ====================================================

export interface searchCoffeeShopWithName_searchCoffeeShopWithName_categories {
  __typename: "Category";
  name: string;
}

export interface searchCoffeeShopWithName_searchCoffeeShopWithName_mainPhoto {
  __typename: "CoffeeShopPhoto";
  url: string;
}

export interface searchCoffeeShopWithName_searchCoffeeShopWithName {
  __typename: "CoffeeShop";
  id: number;
  name: string;
  categories: (searchCoffeeShopWithName_searchCoffeeShopWithName_categories | null)[] | null;
  mainPhoto: searchCoffeeShopWithName_searchCoffeeShopWithName_mainPhoto | null;
  isLiked: boolean;
  isMine: boolean;
  likeCount: number;
}

export interface searchCoffeeShopWithName {
  searchCoffeeShopWithName: (searchCoffeeShopWithName_searchCoffeeShopWithName | null)[] | null;
}

export interface searchCoffeeShopWithNameVariables {
  keyword: string;
  offset?: number | null;
}
