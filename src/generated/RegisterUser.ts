/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: RegisterUser
// ====================================================

export interface RegisterUser_register {
  __typename: "AuthRegister";
  success: string;
}

export interface RegisterUser {
  register: RegisterUser_register;
}

export interface RegisterUserVariables {
  email: string;
  username: string;
  password: string;
}
