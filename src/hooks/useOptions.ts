import { QueryResult, useQuery } from "@apollo/client";

import { AllCuisinesQuery, AllIngredientsQuery, AllUnitsQuery } from "../graphql/queries/recipeQueries";

export const useFetchUnits = (): QueryResult<any, Record<string, any>> => useQuery(AllUnitsQuery);
export const useFetchCuisines = (): QueryResult<any, Record<string, any>> => useQuery(AllCuisinesQuery);
export const useFetchIngredients = (): QueryResult<any, Record<string, any>> => useQuery(AllIngredientsQuery);
