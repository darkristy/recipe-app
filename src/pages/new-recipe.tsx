import styled from "@emotion/styled";
import { useFormik } from "formik";
import { motion } from "framer-motion";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";
import * as yup from "yup";

import { Mixins } from "../styles/mixins";
import { Wrapper } from "../styles/globals";
import { useFetchCuisines, useFetchIngredients, useFetchUnits } from "../hooks/useOptions";
import Form, { FormInput, FormSelect } from "../components/Form";
import { withAuth } from "../lib/withAuth";
import { withApollo } from "../lib/withApollo";
import Button from "../components/Button";

interface NewRecipeProps {
	token: string;
}

const NewRecipeScreenStyles = {
	Container: styled(motion.div)``,
};

interface FormInputs {
	username: string;
	password: string;
}

const NewRecipeScreen: NextPage<NewRecipeProps> = () => {
	const router = useRouter();

	const units = useFetchUnits();
	const cuisines = useFetchCuisines();
	const ingredients = useFetchIngredients();

	const { handleBlur, handleSubmit, handleChange, errors, values, touched, setFieldValue } = useFormik({
		initialValues: {
			name: "",
			prepTime: "",
			cookTime: "",
			cuisine: {},
			imageUrl: "",
			recipeIngredient: {
				qty: "",
				unit: {},
				ingredient: {},
			},
		},
		onSubmit: async (input): Promise<void> => {
			console.log(input.cuisine);
		},
		validationSchema: yup.object().shape({
			username: yup.string(),
			password: yup.string(),
		}),
	});

	let errorMessage;

	// if (error) {
	// 	errorMessage = error?.graphQLErrors.map((err) => err.message);
	// }
	return (
		<NewRecipeScreenStyles.Container exit={{ opacity: 0 }}>
			<Wrapper>
				<Form handleSubmit={handleSubmit}>
					<FormInput
						type="text"
						name="Name"
						onChange={handleChange}
						touched={touched.name}
						value={values.name}
						error={errors.recipeIngredient?.qty}
						onBlur={handleBlur}
					/>
					<FormSelect
						id="Cuisine"
						defaultOptions={cuisines.data?.cuisines}
						value={values.cuisine}
						setFieldValue={setFieldValue}
						handleBlur={handleBlur}
					/>
					<Mixins.Flex>
						<FormInput
							type="text"
							name="Prep Time"
							onChange={handleChange}
							touched={touched.prepTime}
							value={values.prepTime}
							error={errors.prepTime}
							onBlur={handleBlur}
							noMargin
						/>

						<FormInput
							type="text"
							name="Cook Time"
							onChange={handleChange}
							touched={touched.cookTime}
							value={values.cookTime}
							error={errors.cookTime}
							onBlur={handleBlur}
						/>
					</Mixins.Flex>
					<FormInput
						type="text"
						name="qty"
						onChange={handleChange}
						touched={touched.recipeIngredient?.qty}
						value={values.recipeIngredient?.qty}
						error={errors.recipeIngredient?.qty}
						onBlur={handleBlur}
					/>
					<FormSelect
						id="unit"
						defaultOptions={units.data?.measurmentUnits}
						value={values.recipeIngredient.unit}
						setFieldValue={setFieldValue}
						handleBlur={handleBlur}
					/>
					<FormSelect
						id="ingredient"
						defaultOptions={ingredients.data?.ingredients}
						value={values.recipeIngredient.ingredient}
						setFieldValue={setFieldValue}
						handleBlur={handleBlur}
						creatable
					/>

					<Button type="submit" label="Create Recipe" size="full" primary />
				</Form>
			</Wrapper>
		</NewRecipeScreenStyles.Container>
	);
};

export default withApollo(NewRecipeScreen);
