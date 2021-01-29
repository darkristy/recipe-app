import { useQuery } from "@apollo/client";
import { motion } from "framer-motion";
import { NextPage } from "next";

import { Wrapper } from "../../styles/globals";
import { GetRecipeById, GetRecipeByIdVariables } from "../../generated/GetRecipeById";
import { GetRecipeByIdQuery } from "../../graphql/queries/recipeQueries";
import { withApollo } from "../../lib/withApollo";
import Card from "../../components/Card";

interface RecipeScreenProps {
	id: string;
}

const RecipeScreen: NextPage<RecipeScreenProps> = ({ id }) => {
	const recipeId = parseInt(id);
	const { data, error, loading } = useQuery<GetRecipeById, GetRecipeByIdVariables>(GetRecipeByIdQuery, {
		variables: { id: recipeId },
	});

	if (data) {
		console.log(data);
	}

	if (error) {
		console.log(error);
	}

	if (loading) {
		return <p>Loading...</p>;
	}

	const recipe = data?.getRecipeById;

	const ingredients = recipe.ingredients;

	return (
		<motion.div exit={{ opacity: 0 }}>
			<div style={{ padding: "6%" }}>
				<Card size="large" image={recipe.imageUrl} />
			</div>
			<Wrapper>
				<h2>{recipe.name}</h2>
				<p style={{ lineHeight: "1.7em" }}>{recipe.ingredients}</p>
				<p>{recipe.instructions}</p>
			</Wrapper>
		</motion.div>
	);
};

export default withApollo(RecipeScreen);
