import { gql } from "@apollo/client";

const UserRecipesQuery = gql`
	query UserRecipes {
		userRecipes {
			id
			ingredients {
				measurmentQty {
					amount
				}
				measurmentUnit {
					name
				}
			}
			instructions {
				description
			}
			imageUrl
			cuisine {
				name
			}
		}
	}
`;

const UserRecipeCuisinesQuery = gql`
	query UserRecipeCuisines {
		userRecipeCuisines {
			name
		}
	}
`;

const GetRecipeByIdQuery = gql`
	query GetRecipeById($id: Float!) {
		getRecipeById(recipeId: $id) {
			name
			ingredients {
				measurmentQty {
					amount
				}
				measurmentUnit {
					name
				}
			}
			instructions {
				description
			}
			imageUrl
			cuisine {
				name
			}
		}
	}
`;

export { UserRecipeCuisinesQuery, UserRecipesQuery, GetRecipeByIdQuery };
