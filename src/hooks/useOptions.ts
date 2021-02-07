import { useQuery } from "react-query";

import { AllCuisinesQuery, AllIngredientsQuery, AllUnitsQuery } from "../graphql/queries/recipeQueries";
import { fetcher } from "../lib/fetcher";

export const fetchCuisines = (token: string) => fetcher(AllCuisinesQuery, token);
export const fetchUnits = (token: string) => fetcher(AllUnitsQuery, token);
export const fetchIngredients = (token: string) => fetcher(AllIngredientsQuery, token);

export const useGetCuisines = (token: string) => useQuery("cuisines", () => fetchCuisines(token));

export const useGetUnits = (token: string) => useQuery("units", () => fetchUnits(token));

export const useGetIngredients = (token: string) => useQuery("ingredients", () => fetchIngredients(token));
