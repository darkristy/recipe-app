/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: UserRecipes
// ====================================================

export interface UserRecipes_userRecipes_ingredients_measurmentUnit {
  __typename: "MeasurmentUnit";
  name: string;
}

export interface UserRecipes_userRecipes_ingredients_ingredient {
  __typename: "Ingredient";
  name: string;
}

export interface UserRecipes_userRecipes_ingredients {
  __typename: "RecipeIngredient";
  measurmentQty: string;
  measurmentUnit: UserRecipes_userRecipes_ingredients_measurmentUnit;
  ingredient: UserRecipes_userRecipes_ingredients_ingredient;
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
  name: string;
  ingredients: UserRecipes_userRecipes_ingredients[];
  instructions: UserRecipes_userRecipes_instructions[];
  imageUrl: string;
  cuisine: UserRecipes_userRecipes_cuisine;
}

export interface UserRecipes {
  userRecipes: UserRecipes_userRecipes[];
}
