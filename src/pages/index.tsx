import React from "react";
import styled from "@emotion/styled";
import Link from "next/link";
import { motion } from "framer-motion";
import { NextPage } from "next";

import Button from "../components/Button";
import { Mixins } from "../styles/mixins";
import { Wrapper } from "../styles/globals";
import { Sublink } from "../shared/UIElements";

const HomeScreenStyles = {
	TopSection: styled.section`
		background: ${(props): string => props.theme.tiertiary};
		width: 100%;
	`,
	BottomSection: styled.section``,
	HomeLinks: styled.div`
		height: 139px;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		margin: 30px 0;
	`,
	Logo: styled.div`
		width: 172px;
		height: 215px;
		background: ${(props): string => props.theme.secondary};
		margin: 20%;
	`,
};

const HomeScreen: NextPage = () => (
	<motion.div exit={{ opacity: 0 }}>
		<HomeScreenStyles.TopSection>
			<Mixins.Flex center>
				<HomeScreenStyles.Logo />
			</Mixins.Flex>
		</HomeScreenStyles.TopSection>
		<HomeScreenStyles.BottomSection>
			<Wrapper>
				<h2>Welcome to Home</h2>
				<HomeScreenStyles.HomeLinks>
					<Link href="/register">
						<a>
							<Button label="Signup with Email" size="full" primary />
						</a>
					</Link>
					<Link href="/register">
						<a>
							<Button label="Signup with Google" size="full" />
						</a>
					</Link>
				</HomeScreenStyles.HomeLinks>
				<Mixins.Flex center>
					<Sublink href="/login" unlinkedText="Already have an account? " linkedText="Login." />
				</Mixins.Flex>
			</Wrapper>
		</HomeScreenStyles.BottomSection>
	</motion.div>
);

export default HomeScreen;
