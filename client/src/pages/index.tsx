import styled from "@emotion/styled";
import { FunctionComponent } from "react";

import { Mixins } from "../styles/mixins";

const Home: FunctionComponent = () => {
	console.log("");
	return (
		<>
			<TopSection>
				<Mixins.Flex center>
					<Logo />
				</Mixins.Flex>
			</TopSection>
		</>
	);
};

export default Home;

const TopSection = styled.section`
	background: ${(props): string => props.theme.tiertiary};
	width: 100%;
`;

const Logo = styled.div`
	width: 172px;
	height: 215px;
	background: ${(props): string => props.theme.secondary};
	margin: 20%;
`;
