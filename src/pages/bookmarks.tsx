import styled from "@emotion/styled";
import { motion } from "framer-motion";
import { NextPage } from "next";

import { withAuth } from "../lib/withAuth";

const BookmarksScreenStyles = {
	Container: styled(motion.div)``,
};

const BookmarksScreen: NextPage = () => {
	console.log();
	return <BookmarksScreenStyles.Container exit={{ opacity: 0 }}>hello</BookmarksScreenStyles.Container>;
};

export default withAuth(BookmarksScreen);
