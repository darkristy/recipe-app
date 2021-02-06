import { useQuery } from "react-query";

import { GetRecipeByIdQuery } from "../graphql/queries/recipeQueries";
import { fetcher } from "../lib/fetcher";

const fetchRecipe = (recipeId: number, token: string) => {
	const variables = { id: recipeId };
	return fetcher(GetRecipeByIdQuery, token, variables);
};

export const useRecipe = (recipeId: number, token: string) =>
	useQuery(["userRecipes"], () => fetchRecipe(recipeId, token));
