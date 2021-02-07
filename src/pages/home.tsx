import styled from "@emotion/styled";
import { motion } from "framer-motion";
import { NextPage } from "next";

import { withAuth } from "../lib/withAuth";

const HomeScreenStyles = {
	Container: styled(motion.div)``,
};

const HomeScreen: NextPage = () => {
	console.log("home");
	return <HomeScreenStyles.Container exit={{ opacity: 0 }}>home</HomeScreenStyles.Container>;
};

export default withAuth(HomeScreen);
