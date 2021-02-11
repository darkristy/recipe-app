import styled from "@emotion/styled";
import { Field, FieldArray, FormikProvider, useFormik } from "formik";
import { motion } from "framer-motion";
import { NextPage } from "next";
import { useRouter } from "next/router";
import * as yup from "yup";
import { useMutation } from "@apollo/client";
import React from "react";

import { CreateNewRecipe, CreateNewRecipeVariables } from "../generated/CreateNewRecipe";
import Alert from "../components/Alert";
import { CreateNewRecipeMutation } from "../graphql/queries/recipeMutations";
import { Mixins } from "../styles/mixins";
import { Wrapper } from "../styles/globals";
import { useFetchCuisines, useFetchIngredients, useFetchUnits } from "../hooks/useOptions";
import Form, { FormInput, FormSelect } from "../components/Form";
import { withApollo } from "../lib/withApollo";
import Button from "../components/Button";

interface NewRecipeProps {
	token: string;
}

const NewRecipeScreenStyles = {
	Container: styled(motion.div)``,
};

interface FormIngredient {
	qty: string;
	unit: any;
	ingredient: any;
}

interface FormInputs {
	name: string;
	prepTime: string;
	cookTime: string;
	cuisine: any;
	imageUrl: string;
	ingredients: [FormIngredient];
}

const NewRecipeScreen: NextPage<NewRecipeProps> = () => {
	const router = useRouter();

	const [submitRecipe, { error }] = useMutation<CreateNewRecipe, CreateNewRecipeVariables>(CreateNewRecipeMutation);

	const units = useFetchUnits();
	const cuisines = useFetchCuisines();
	const ingredients = useFetchIngredients();

	const formik = useFormik({
		initialValues: {
			name: "",
			prepTime: "",
			cookTime: "",
			cuisine: {},
			imageUrl: "",
			ingredients: [
				{
					qty: "",
					unit: {},
					ingredient: {},
				},
			],
			instructions: [
				{
					description: "",
				},
			],
		},
		onSubmit: async (input): Promise<void> => {
			console.log(input);
		},
		validationSchema: yup.object().shape({
			username: yup.string(),
			password: yup.string(),
		}),
	});

	let errorMessage;

	if (error) {
		errorMessage = error?.graphQLErrors.map((err) => err.message);
	}
	return (
		<NewRecipeScreenStyles.Container exit={{ opacity: 0 }}>
			<Wrapper>
				<FormikProvider value={formik}>
					<Form handleSubmit={formik.handleSubmit}>
						<Field component={FormInput} name="name" />
						<Mixins.Flex spaceBetween>
							<Field component={FormInput} name="prepTime" noMargin />
							<Field component={FormInput} name="cookTime" />
						</Mixins.Flex>
						<Field
							component={FormSelect}
							name="cuisine"
							defaultOptions={cuisines.data?.cuisines}
							setFieldValue={formik.setFieldValue}
						/>
						<Field component={FormInput} name="imageUrl" />

						<FieldArray name="ingredients">
							{({ push }) => (
								<>
									{formik.values.ingredients.map((value, idx) => (
										<React.Fragment key={idx}>
											<Mixins.Flex spaceBetween>
												<Field
													name={`ingredients[${idx}].ingredient`}
													component={FormSelect}
													defaultOptions={ingredients.data?.ingredients}
													setFieldValue={formik.setFieldValue}
												/>
												<Field name={`ingredients[${idx}].qty`} component={FormInput} />
												<Field
													name={`ingredients[${idx}].unit`}
													component={FormSelect}
													defaultOptions={units.data?.measurmentUnits}
													setFieldValue={formik.setFieldValue}
												/>
											</Mixins.Flex>
										</React.Fragment>
									))}
									<Button
										type="button"
										label="Add Ingredient"
										size="small"
										onClick={() =>
											push({
												qty: "",
												unit: {},
												ingredient: {},
											})
										}
									/>
								</>
							)}
						</FieldArray>

						<FieldArray name="instructions">
							{({ push }) => (
								<>
									{formik.values.instructions.map((value, idx) => (
										<React.Fragment key={idx}>
											<Mixins.Flex>
												<Field
													name={`instructions[${idx}].description`}
													noMargin
													component={FormInput}
												/>
											</Mixins.Flex>
										</React.Fragment>
									))}
									<Button
										type="button"
										label="Add Step"
										size="small"
										onClick={() =>
											push({
												description: "",
											})
										}
									/>
								</>
							)}
						</FieldArray>

						<Button type="submit" label="Create Recipe" size="full" primary />
					</Form>
				</FormikProvider>
				<Mixins.Flex center style={{ paddingTop: 26 }}>
					{error && <Alert message={errorMessage} severity="error" />}
				</Mixins.Flex>
			</Wrapper>
		</NewRecipeScreenStyles.Container>
	);
};

export default withApollo(NewRecipeScreen);
