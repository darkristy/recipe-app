import { css, SerializedStyles } from "@emotion/react";
import styled from "@emotion/styled";
import React from "react";

import { Mixins } from "../../styles/mixins";

export interface AppBarProps {
	primary?: boolean;
}

const AppBarStyles = {
	Container: styled.div``,
};

export const AppBar: React.FC<AppBarProps> = ({ ...props }) => {
	console.log();

	return <AppBarStyles.Container />;
};
