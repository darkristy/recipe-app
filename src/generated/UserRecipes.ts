/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: UserRecipes
// ====================================================

export interface UserRecipes_userRecipes_ingredients_measurmentQty {
  __typename: "MeasurmentQty";
  amount: string;
}

export interface UserRecipes_userRecipes_ingredients_measurmentUnit {
  __typename: "MeasurmentUnit";
  name: string;
}

export interface UserRecipes_userRecipes_ingredients {
  __typename: "RecipeIngredient";
  measurmentQty: UserRecipes_userRecipes_ingredients_measurmentQty;
  measurmentUnit: UserRecipes_userRecipes_ingredients_measurmentUnit;
}

export interface UserRecipes_userRecipes_instructions {
  __typename: "Instruction";
  description: string;
}

export interface UserRecipes_userRecipes_cuisine {
  __typename: "Cuisine";
  name: string;
}

export interface UserRecipes_userRecipes {
  __typename: "Recipe";
  id: number;
  ingredients: UserRecipes_userRecipes_ingredients[];
  instructions: UserRecipes_userRecipes_instructions[];
  imageUrl: string;
  cuisine: UserRecipes_userRecipes_cuisine;
}

export interface UserRecipes {
  userRecipes: UserRecipes_userRecipes[];
}
