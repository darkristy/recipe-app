import styled from "@emotion/styled";
import { motion } from "framer-motion";
import { NextPage } from "next";

import { withApollo } from "../lib/withApollo";

const HomeScreenStyles = {
	Container: styled(motion.div)``,
};

const HomeScreen: NextPage = () => {
	console.log("home");
	return <HomeScreenStyles.Container exit={{ opacity: 0 }}>home</HomeScreenStyles.Container>;
};

export default withApollo(HomeScreen);
