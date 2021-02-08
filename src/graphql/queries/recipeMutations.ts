import { gql } from "@apollo/client";

export const CreateNewRecipeMutation = gql`
	mutation CreateNewRecipe(
		$name: String!
		$prepTime: String!
		$cookTime: String!
		$imageUrl: String!
		$cuisineId: String!
		$ingredients: [RecipeIngredientInput]!
		$instructions: [InstructionInput]!
	) {
		createNewRecipe(
			recipeInput: {
				name: $name
				cookTime: $cookTime
				prepTime: $prepTime
				imageUrl: $imageUrl
				cuisineId: $cuisineId
				ingredients: $ingredients
				instructions: $instructions
			}
		)
	}
`;
