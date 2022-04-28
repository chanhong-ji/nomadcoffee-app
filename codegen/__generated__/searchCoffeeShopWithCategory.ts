/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: searchCoffeeShopWithCategory
// ====================================================

export interface searchCoffeeShopWithCategory_searchCoffeeShopWithCategory_categories {
  __typename: "Category";
  name: string;
}

export interface searchCoffeeShopWithCategory_searchCoffeeShopWithCategory_mainPhoto {
  __typename: "CoffeeShopPhoto";
  url: string;
}

export interface searchCoffeeShopWithCategory_searchCoffeeShopWithCategory {
  __typename: "CoffeeShop";
  id: number;
  name: string;
  categories: (searchCoffeeShopWithCategory_searchCoffeeShopWithCategory_categories | null)[] | null;
  mainPhoto: searchCoffeeShopWithCategory_searchCoffeeShopWithCategory_mainPhoto | null;
  isLiked: boolean;
  isMine: boolean;
  likeCount: number;
}

export interface searchCoffeeShopWithCategory {
  searchCoffeeShopWithCategory: (searchCoffeeShopWithCategory_searchCoffeeShopWithCategory | null)[] | null;
}

export interface searchCoffeeShopWithCategoryVariables {
  keyword: string;
  offset?: number | null;
}
