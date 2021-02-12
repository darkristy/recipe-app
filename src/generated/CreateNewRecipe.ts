/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { RecipeIngredientInput, InstructionInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: CreateNewRecipe
// ====================================================

export interface CreateNewRecipe {
  createNewRecipe: string;
}

export interface CreateNewRecipeVariables {
  name: string;
  prepTime: any;
  cookTime: any;
  imageUrl: string;
  cuisine: string;
  ingredients: RecipeIngredientInput[];
  instructions: InstructionInput[];
}
