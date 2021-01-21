/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: LoginUser
// ====================================================

export interface LoginUser_login {
  __typename: "Auth";
  success: string;
  accessToken: string;
}

export interface LoginUser {
  login: LoginUser_login;
}

export interface LoginUserVariables {
  username: string;
  password: string;
}
