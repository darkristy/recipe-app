import styled from "@emotion/styled";
import { motion } from "framer-motion";
import { NextPage } from "next";

import { withAuth } from "../lib/withAuth";

const ProfileScreenStyles = {
	Container: styled(motion.div)``,
};

const ProfileScreen: NextPage = () => {
	console.log("Profile");
	return <ProfileScreenStyles.Container exit={{ opacity: 0 }}>Profile</ProfileScreenStyles.Container>;
};

export default withAuth(ProfileScreen);
