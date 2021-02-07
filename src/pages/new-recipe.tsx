import styled from "@emotion/styled";
import { useFormik } from "formik";
import { motion } from "framer-motion";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";
import * as yup from "yup";
import Select from "react-select";

import { useGetCuisines, useGetIngredients, useGetUnits } from "../hooks/useOptions";
import Form, { FormInput } from "../components/Form";
import { withAuth } from "../lib/withAuth";

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

const NewRecipeScreen: NextPage<NewRecipeProps> = ({ token }) => {
	const router = useRouter();

	const optionUnits = [];
	const optionCuisines = [];
	const optionIngredients = [];

	const { data: units } = useGetUnits(token);
	const { data: cuisines } = useGetCuisines(token);
	const { data: ingredients } = useGetIngredients(token);

	if (units) {
		for (const unit of units?.measurmentUnits) {
			optionUnits.push({
				value: unit.name,
				label: unit.name,
			});
		}
	}

	if (cuisines) {
		for (const cuisine of cuisines?.cuisines) {
			optionCuisines.push({
				value: cuisine.name,
				label: cuisine.name,
			});
		}
	}
	if (ingredients) {
		for (const ingredient of ingredients?.ingredients) {
			optionIngredients.push({
				value: ingredient.name,
				label: ingredient.name,
			});
		}
	}

	const { handleBlur, handleSubmit, handleChange, errors, values, touched } = useFormik({
		initialValues: {
			username: "",
			password: "",
		},
		onSubmit: async (loginInput: FormInputs): Promise<void> => {
			const { username, password } = loginInput;
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
				<Select options={optionCuisines} />
				<Select options={optionUnits} />
				<Select options={optionIngredients} />
			</Form>
		</NewRecipeScreenStyles.Container>
	);
};

export default withAuth(NewRecipeScreen);
