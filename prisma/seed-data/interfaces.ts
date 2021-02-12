export interface CuisineSeed {
	name: string;
}

export interface MeasurmentUnitSeed {
	name: string;
}

export interface IngredientSeed {
	name: string;
}

export interface MeasurmentQtySeed {
	amount: string;
}

export interface InstructionSeed {
	description: string;
	recipeId: number;
}

export interface RecipeSeed {
	name: string;
	image_url: string;
	bookmarked: boolean;
	cookTime: Date;
	prepTime: Date;
	userId: string;
	cuisineId: number;
}

export interface RecipeIngredientSeed {
	recipeId: number;
	ingredientId: number;
	measurmentQty: string;
	measurmentUnitId: number;
}
