import { NextPage } from "next";
import React from "react";
import { useQuery } from "@apollo/client";
import { motion } from "framer-motion";
import Link from "next/link";
import styled from "@emotion/styled";

import { UserRecipesQuery } from "../graphql/queries/recipeQueries";
import { Wrapper } from "../styles/globals";
import Card from "../components/Card";
import { withApollo } from "../lib/withApollo";

interface RecipesScreenProps {
	token: string;
}

const RecipesScreenStyles = {
	RecipeList: styled.ul`
		li {
			margin-bottom: 30px;
		}
	`,
};

const RecipesScreen: NextPage<RecipesScreenProps> = () => {
	const { data } = useQuery(UserRecipesQuery);

	console.log(data);

	return (
		<motion.div exit={{ opacity: 0 }}>
			<Wrapper>
				<RecipesScreenStyles.RecipeList>
					{data?.userRecipes.map((recipe, idx) => (
						<React.Fragment key={idx}>
							<Link href={`/recipe/${recipe.id}`}>
								<a>
									<li>
										<Card
											size="medium"
											image={recipe.imageUrl}
											name={recipe.name}
											category={recipe.cuisine.name}
										/>
									</li>
								</a>
							</Link>
						</React.Fragment>
					))}
				</RecipesScreenStyles.RecipeList>
			</Wrapper>
		</motion.div>
	);
};

export default withApollo(RecipesScreen);
