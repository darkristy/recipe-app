import { useQuery } from "@apollo/client";
import { motion } from "framer-motion";
import { NextPage } from "next";

import { Mixins } from "../../styles/mixins";
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

	return (
		<motion.div exit={{ opacity: 0 }}>
			<div style={{ padding: "6%" }}>
				<Card size="large" image={recipe.imageUrl} />
			</div>
			<Wrapper>
				<h2>{recipe.name}</h2>
				{recipe.ingredients.map(({ ingredient, measurmentQty, measurmentUnit }, idx) => (
					<Mixins.Flex key={idx}>
						<p style={{ lineHeight: "1.7em" }}>{measurmentQty}</p>
						<p style={{ lineHeight: "1.7em" }}>{measurmentUnit.name}</p>
						<p style={{ lineHeight: "1.7em" }}>{ingredient.name}</p>
					</Mixins.Flex>
				))}

				{recipe.instructions.map(({ description }) => (
					<Mixins.Flex>
						<p style={{ lineHeight: "1.7em" }}>{description}</p>
					</Mixins.Flex>
				))}
			</Wrapper>
		</motion.div>
	);
};

export default withApollo(RecipeScreen);
