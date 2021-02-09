import { gql } from "@apollo/client";

export const CreateNewRecipeMutation = gql`
	mutation CreateNewRecipe(
		$name: String!
		$prepTime: DateTime!
		$cookTime: DateTime!
		$imageUrl: String!
		$cuisine: String!
		$ingredients: [RecipeIngredientInput!]!
		$instructions: [InstructionInput!]!
	) {
		createNewRecipe(
			recipeInput: {
				name: $name
				cookTime: $cookTime
				prepTime: $prepTime
				imageUrl: $imageUrl
				cuisine: $cuisine
				ingredients: $ingredients
				instructions: $instructions
			}
		)
	}
`;
