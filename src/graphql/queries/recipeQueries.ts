import { gql } from "@apollo/client";

const UserRecipesQuery = gql`
	query UserRecipes {
		userRecipes {
			id
			name
			ingredients {
				measurmentQty
				measurmentUnit {
					name
				}
				ingredient {
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

const AllCuisinesQuery = gql`
	query AllCuisines {
		cuisines {
			name
		}
	}
`;

const AllIngredientsQuery = gql`
	query AllIngredients {
		ingredients {
			name
		}
	}
`;

const AllUnitsQuery = gql`
	query AllUnits {
		measurmentUnits {
			name
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
				measurmentQty
				measurmentUnit {
					name
				}
				ingredient {
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

export {
	UserRecipeCuisinesQuery,
	UserRecipesQuery,
	GetRecipeByIdQuery,
	AllUnitsQuery,
	AllIngredientsQuery,
	AllCuisinesQuery,
};
