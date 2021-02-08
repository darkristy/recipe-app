import { useMutation } from "@apollo/client";

import { CreateNewRecipeMutation } from "../graphql/queries/recipeMutations";

export const useCreateNewRecipe = (recipInput) => useMutation(CreateNewRecipeMutation);
