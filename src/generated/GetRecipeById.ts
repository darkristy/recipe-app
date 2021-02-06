/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetRecipeById
// ====================================================

export interface GetRecipeById_getRecipeById_ingredients_measurmentQty {
  __typename: "MeasurmentQty";
  amount: string;
}

export interface GetRecipeById_getRecipeById_ingredients_measurmentUnit {
  __typename: "MeasurmentUnit";
  name: string;
}

export interface GetRecipeById_getRecipeById_ingredients {
  __typename: "RecipeIngredient";
  measurmentQty: GetRecipeById_getRecipeById_ingredients_measurmentQty;
  measurmentUnit: GetRecipeById_getRecipeById_ingredients_measurmentUnit;
}

export interface GetRecipeById_getRecipeById_instructions {
  __typename: "Instruction";
  description: string;
}

export interface GetRecipeById_getRecipeById_cuisine {
  __typename: "Cuisine";
  name: string;
}

export interface GetRecipeById_getRecipeById {
  __typename: "Recipe";
  name: string;
  ingredients: GetRecipeById_getRecipeById_ingredients[];
  instructions: GetRecipeById_getRecipeById_instructions[];
  imageUrl: string;
  cuisine: GetRecipeById_getRecipeById_cuisine;
}

export interface GetRecipeById {
  getRecipeById: GetRecipeById_getRecipeById;
}

export interface GetRecipeByIdVariables {
  id: number;
}
