import { QueryResult, useQuery } from "@apollo/client";

import { GetRecipeById, GetRecipeByIdVariables } from "../generated/GetRecipeById";
import { GetRecipeByIdQuery } from "../graphql/queries/recipeQueries";

export const useRecipe = (recipeId: number): QueryResult<GetRecipeById, GetRecipeByIdVariables> =>
	useQuery<GetRecipeById, GetRecipeByIdVariables>(GetRecipeByIdQuery, { variables: { id: recipeId } });
