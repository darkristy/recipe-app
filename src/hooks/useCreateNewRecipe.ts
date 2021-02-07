import { useQuery, useMutation, UseMutationResult } from "react-query";

import { fetcher } from "../lib/fetcher";

// const createRecipe = (variables, token: string): Promise<any> => fetcher(GetCuisineByNameQuery, token, variables);

// export const useCreateNewRecipe = (token: string): UseMutationResult<any, unknown, any, unknown> =>
// 	useMutation((newRecipe: any) => createRecipe(newRecipe, token));
