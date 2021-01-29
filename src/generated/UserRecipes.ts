/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: UserRecipes
// ====================================================

export interface UserRecipes_userRecipes_category {
  __typename: "Category";
  name: string;
}

export interface UserRecipes_userRecipes {
  __typename: "Recipe";
  id: number;
  name: string;
  ingredients: string;
  instructions: string;
  imageUrl: string;
  category: UserRecipes_userRecipes_category;
}

export interface UserRecipes {
  userRecipes: UserRecipes_userRecipes[];
}
