import { gql } from "@apollo/client";

const UserRecipesQuery = gql`
	query UserRecipes {
		userRecipes {
			id
			name
			ingredients
			instructions
			imageUrl
			category {
				name
			}
		}
	}
`;

const UserRecipeCategoriesQuery = gql`
	query UserRecipeCategories {
		userRecipeCategories {
			name
		}
	}
`;

const GetRecipeByIdQuery = gql`
	query GetRecipeById($id: Float!) {
		getRecipeById(recipeId: $id) {
			name
			ingredients
			instructions
			imageUrl
			category {
				name
			}
		}
	}
`;

export { UserRecipeCategoriesQuery, UserRecipesQuery, GetRecipeByIdQuery };
