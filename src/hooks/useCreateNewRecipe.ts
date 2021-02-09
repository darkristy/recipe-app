import { MutationTuple, useMutation } from "@apollo/client";

import { CreateNewRecipe, CreateNewRecipeVariables } from "../generated/CreateNewRecipe";
import { CreateNewRecipeMutation } from "../graphql/queries/recipeMutations";

export const useCreateNewRecipe = (
	recipeInput: CreateNewRecipeVariables
): MutationTuple<CreateNewRecipe, CreateNewRecipeVariables> => {
	const { name, prepTime, cuisine, cookTime, imageUrl, ingredients, instructions } = recipeInput;

	return useMutation<CreateNewRecipe, CreateNewRecipeVariables>(CreateNewRecipeMutation, {
		variables: {
			name,
			prepTime,
			cookTime,
			cuisine,
			imageUrl,
			ingredients,
			instructions,
		},
	});
};
