import { cuisines } from "./cuisine";
import { ingredients } from "./ingredient";
import { instructions } from "./instruction";
import { measurmentQtys } from "./measurmenQty";
import { measurmentUnits } from "./measurmentUnit";
import { recipes } from "./recipe";
import { recipeIngredients } from "./recipe-ingredients";

export default {
	cuisines: [...cuisines],
	recipes: [...recipes],
	instructions: [...instructions],
	ingredients: [...ingredients],
	recipeIngredients: [...recipeIngredients],
	measurmentUnits: [...measurmentUnits],
	measurmentQtys: [...measurmentQtys],
};
