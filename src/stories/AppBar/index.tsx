import { css, SerializedStyles } from "@emotion/react";
import styled from "@emotion/styled";
import Link from "next/link";
import React from "react";

import { Bookmark, Chef, Home, New, Person } from "../../components/Icons";
import { Mixins } from "../../styles/mixins";

export interface AppBarProps {
	primary?: boolean;
}

const AppBarStyles = {
	Container: styled.div`
		width: 375px;
		height: 83px;
		background-color: #f8f5f2;
		ul {
			display: flex;
			justify-content: space-between;
			align-items: center;
			list-style: none;
			padding: 0;
			height: 100%;
			a {
				width: fit-content;
			}
		}
	`,
	Icon: styled.li`
		width: fit-content;
		margin: 0 27px;
		&:nth-child(1),
		&:nth-child(2),
		&:nth-child(3) {
			svg {
				path {
					fill: #ce4b2e;
				}
			}
		}
		&:nth-child(4),
		&:nth-child(5) {
			svg {
				path {
					stroke: #ce4b2e;
				}
			}
		}
	`,
};

const AppBarIcon = ({ href, Icon }) => {
	console.log("AppBarIcon");
	return (
		<AppBarStyles.Icon>
			<Link href={href}>
				<a>
					<Icon />
				</a>
			</Link>
		</AppBarStyles.Icon>
	);
};

export const AppBar: React.FC<AppBarProps> = ({ ...props }) => {
	const routes = [
		{ href: "/home", icon: Home },
		{ href: "/recipes", icon: Chef },
		{ href: "/new-recipe", icon: New },
		{ href: "/bookmarks", icon: Bookmark },
		{ href: "/profile", icon: Person },
	];

	return (
		<AppBarStyles.Container>
			<ul>
				{routes.map((route) => (
					<AppBarIcon href={route.href} Icon={route.icon} />
				))}
			</ul>
		</AppBarStyles.Container>
	);
};
