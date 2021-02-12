import { QueryResult, useQuery } from "@apollo/client";

import { UserRecipes } from "../generated/UserRecipes";
import { UserRecipesQuery } from "../graphql/queries/recipeQueries";

export const useUserRecipes = (): QueryResult<UserRecipes, Record<string, any>> =>
	useQuery<UserRecipes>(UserRecipesQuery);
