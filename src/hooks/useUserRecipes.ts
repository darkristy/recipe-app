import { useQuery } from "react-query";

import { UserRecipesQuery } from "../graphql/queries/recipeQueries";
import { fetcher } from "../lib/fetcher";

export const useUserRecipes = (token) => useQuery("userRecipes", () => fetcher(UserRecipesQuery, token));
