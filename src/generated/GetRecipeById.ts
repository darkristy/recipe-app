/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetRecipeById
// ====================================================

export interface GetRecipeById_getRecipeById_category {
  __typename: "Category";
  name: string;
}

export interface GetRecipeById_getRecipeById {
  __typename: "Recipe";
  name: string;
  ingredients: string;
  instructions: string;
  imageUrl: string;
  category: GetRecipeById_getRecipeById_category;
}

export interface GetRecipeById {
  getRecipeById: GetRecipeById_getRecipeById;
}

export interface GetRecipeByIdVariables {
  id: number;
}
