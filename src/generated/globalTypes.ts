/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export interface IngredientInput {
  name: string;
}

export interface InstructionInput {
  description: string;
}

export interface MeasurmentQtyInput {
  amount: string;
}

export interface MeasurmentUnitInput {
  name: string;
}

export interface RecipeIngredientInput {
  measurmentUnit: MeasurmentUnitInput;
  measurmentQty: MeasurmentQtyInput;
  ingredient: IngredientInput;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
