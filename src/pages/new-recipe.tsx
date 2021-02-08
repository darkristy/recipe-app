import styled from "@emotion/styled";
import { useFormik } from "formik";
import { motion } from "framer-motion";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";
import * as yup from "yup";

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
			cuisine: {},
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
			<Form handleSubmit={handleSubmit}>
				<FormSelect
					id="cuisine"
					defaultOptions={cuisines.data?.cuisines}
					value={values.cuisine}
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

				<Button type="submit" label="Create Recipe" size="full" primary />
			</Form>
		</NewRecipeScreenStyles.Container>
	);
};

export default withApollo(NewRecipeScreen);
