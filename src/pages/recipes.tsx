import { NextPage } from "next";
import React from "react";
import { useQuery } from "@apollo/client";
import { motion } from "framer-motion";
import Link from "next/link";
import styled from "@emotion/styled";

import { UserRecipes } from "../generated/UserRecipes";
import { Wrapper } from "../styles/globals";
import Card from "../components/Card";
import { withApollo } from "../lib/withApollo";
import { UserRecipesQuery } from "../graphql/queries/recipeQueries";

const RecipesScreenStyles = {
	RecipeList: styled.ul`
		li {
			margin-bottom: 30px;
		}
	`,
};

const RecipesScreen: NextPage = () => {
	const { data, error, loading } = useQuery<UserRecipes>(UserRecipesQuery);

	if (data) {
		console.log(data);
	}

	if (error) {
		console.log(error);
	}

	if (loading) {
		return <p>Loading...</p>;
	}

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
											category={recipe.category.name}
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
