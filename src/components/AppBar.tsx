import { css, SerializedStyles } from "@emotion/react";
import styled from "@emotion/styled";
import Link from "next/link";
import React from "react";

import { Bookmark, Chef, Home, New, Person } from "./Icons";

export interface AppBarProps {
	disabled?: boolean;
}

const AppBarStyles = {
	Container: styled.div<{ disabled: AppBarProps["disabled"] }>`
		width: 100%;
		height: 83px;
		background-color: ${(props): string => props.theme.secondary};
		position: fixed;
		left: 0;
		bottom: 0;
		ul {
			padding: 0 9%;
			display: flex;
			justify-content: space-between;
			align-items: center;
			list-style: none;

			height: 100%;
			a {
				width: fit-content;
			}
		}
		${(props): SerializedStyles =>
			props.disabled &&
			css`
				display: none;
				ul {
					display: none;
				}
			`}
	`,
	Icon: styled.li`
		width: fit-content;
		margin: 0 27px;
		&:nth-child(1),
		&:nth-child(2),
		&:nth-child(3) {
			svg {
				path {
					fill: ${(props): string => props.theme.tiertiary};
				}
			}
		}
		&:nth-child(4),
		&:nth-child(5) {
			svg {
				path {
					stroke: ${(props): string => props.theme.tiertiary};
				}
			}
		}
	`,
};

const AppBarIcon = ({ href, Icon }): JSX.Element => (
	<AppBarStyles.Icon>
		<Link href={href}>
			<a>
				<Icon />
			</a>
		</Link>
	</AppBarStyles.Icon>
);

const AppBar: React.FC<AppBarProps> = ({ disabled, ...props }) => {
	const routes = [
		{ href: "/home", icon: Home },
		{ href: "/recipes", icon: Chef },
		{ href: "/new-recipe", icon: New },
		{ href: "/bookmarks", icon: Bookmark },
		{ href: "/profile", icon: Person },
	];

	return (
		<AppBarStyles.Container disabled={disabled}>
			<ul>
				{routes.map(({ href, icon }, idx) => (
					<React.Fragment key={idx}>
						<AppBarIcon href={href} Icon={icon} />
					</React.Fragment>
				))}
			</ul>
		</AppBarStyles.Container>
	);
};

export default AppBar;
