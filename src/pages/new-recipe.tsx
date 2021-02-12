import styled from "@emotion/styled";
import { Field, FieldArray, FormikProvider, useFormik } from "formik";
import { motion } from "framer-motion";
import { NextPage } from "next";
import { useRouter } from "next/router";
import * as yup from "yup";
import { useMutation } from "@apollo/client";
import { Fragment } from "react";

import Button from "../components/Button";
import { CreateNewRecipe, CreateNewRecipeVariables } from "../generated/CreateNewRecipe";
import Alert from "../components/Alert";
import { CreateNewRecipeMutation } from "../graphql/queries/recipeMutations";
import { Mixins } from "../styles/mixins";
import { Wrapper } from "../styles/globals";
import { useFetchCuisines, useFetchIngredients, useFetchUnits } from "../hooks/useOptions";
import Form, { FormCreatableSelect, FormInput, FormSelect } from "../components/Form";
import { withApollo } from "../lib/withApollo";
import MiniButton from "../components/MiniButton";

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

	const margin = "14px";

	const formik = useFormik({
		initialValues: {
			name: "",
			prepTime: "",
			cookTime: "",
			cuisine: "",
			imageUrl: "",
			ingredients: [
				{
					qty: "",
					unit: "",
					ingredient: "",
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
						<Mixins.Margin marginBottom={margin}>
							<Field component={FormInput} name="name" placeholder="Name" />
						</Mixins.Margin>
						<Mixins.Flex margin={`0 0 ${margin} 0`}>
							<Field component={FormInput} name="prepTime" placeholder="Prep Time" />
							<Mixins.Spacer width="20px" />
							<Field component={FormInput} name="cookTime" placeholder="Cook Time" />
						</Mixins.Flex>
						<Mixins.Margin marginBottom={margin}>
							<Field
								component={FormSelect}
								name="cuisine"
								defaultOptions={cuisines.data?.cuisines}
								setFieldValue={formik.setFieldValue}
							/>
						</Mixins.Margin>

						<Mixins.Margin marginBottom={margin}>
							<Field component={FormInput} name="imageUrl" placeholder="Image Url" />
						</Mixins.Margin>
						<FieldArray name="ingredients">
							{({ push, remove }): JSX.Element => (
								<>
									{formik.values.ingredients.map((_, idx) => (
										<Fragment key={idx}>
											<Mixins.Flex margin={`0 0 ${margin} 0`}>
												<MiniButton
													label="×"
													onClick={(): void => remove(idx)}
													padding="0px 8px"
												/>
												<Mixins.Spacer width="20px" />
												<Field
													name={`ingredients[${idx}].ingredient`}
													component={FormCreatableSelect}
													defaultOptions={ingredients.data?.ingredients}
													setFieldValue={formik.setFieldValue}
												/>
												<Mixins.Spacer width="20px" />
												<Field
													name={`ingredients[${idx}].qty`}
													component={FormInput}
													placeholder="Qty"
													size="30%"
													width="20px"
												/>
												<Mixins.Spacer width="20px" />
												<Field
													name={`ingredients[${idx}].unit`}
													component={FormSelect}
													defaultOptions={units.data?.measurmentUnits}
													defaultValue={{ label: "cup", value: "cup" }}
													setFieldValue={formik.setFieldValue}
													size="40%"
												/>
											</Mixins.Flex>
										</Fragment>
									))}

									<Mixins.Flex flexEnd margin={`0 0 ${margin} 0`}>
										<MiniButton
											label="Add Ingredient"
											onClick={() =>
												push({
													qty: "",
													unit: {},
													ingredient: {},
												})
											}
											padding="0px 12px"
											borderRadius="16px"
										/>
									</Mixins.Flex>
								</>
							)}
						</FieldArray>

						<FieldArray name="instructions">
							{({ push, remove }): JSX.Element => (
								<>
									{formik.values.instructions.map((_, idx) => (
										<Fragment key={idx}>
											<Mixins.Flex margin={`0 0 ${margin} 0`}>
												<MiniButton
													label="×"
													onClick={(): void => remove(idx)}
													padding="0px 8px"
												/>
												<Mixins.Spacer width="12px" />
												<Field
													name={`instructions[${idx}].description`}
													placeholder="Instruction"
													noMargin
													component={FormInput}
												/>
											</Mixins.Flex>
										</Fragment>
									))}
									<Mixins.Flex flexEnd margin={`0 0 ${margin} 0`}>
										<MiniButton
											label="Add Step"
											onClick={(): void =>
												push({
													description: "",
												})
											}
											padding="0px 12px"
											borderRadius="16px"
										/>
									</Mixins.Flex>
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
