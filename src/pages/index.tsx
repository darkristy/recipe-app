import styled from "@emotion/styled";
import { FunctionComponent } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

import { GeneralButton } from "../components/Buttons";
import { Mixins } from "../styles/mixins";
import { Container } from "../styles/globals";

const Home: FunctionComponent = () => (
	<motion.div exit={{ opacity: 0 }}>
		<TopSection>
			<Mixins.Flex center>
				<Logo />
			</Mixins.Flex>
		</TopSection>

		<BottomSection>
			<Container>
				<HomeHeading>Welcome to Home</HomeHeading>
				<HomeLinks>
					<Link href="/register">
						<a>
							<GeneralButton label="Signup with Email" />
						</a>
					</Link>
					<Link href="/register">
						<a>
							<GeneralButton label="Signup with Google" outline />
						</a>
					</Link>
				</HomeLinks>
				<SubLink>
					<Mixins.Flex center>
						<p style={{ fontWeight: 500 }}>
							Already have an account?{" "}
							<span>
								<Link href="/login">
									<a>Login.</a>
								</Link>
							</span>
						</p>
					</Mixins.Flex>
				</SubLink>
			</Container>
		</BottomSection>
	</motion.div>
);

export default Home;

const TopSection = styled.section`
	background: ${(props): string => props.theme.tiertiary};
	width: 100%;
`;

const BottomSection = styled.section``;

const HomeHeading = styled.h2``;
const HomeLinks = styled.div`
	height: 139px;
	display: flex;
	flex-direction: column;
	justify-content: space-between;

	margin: 30px 0;
`;

const Logo = styled.div`
	width: 172px;
	height: 215px;
	background: ${(props): string => props.theme.secondary};
	margin: 20%;
`;

const SubLink = styled.div`
	p {
		font-weight: 500;
		font-size: 14px;
		span {
			a {
				color: ${(props): string => props.theme.tiertiary};
			}
		}
	}
`;
