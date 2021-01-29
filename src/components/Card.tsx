import { css, SerializedStyles } from "@emotion/react";
import styled from "@emotion/styled";
import React from "react";

import AspectRatio from "./AspectRatio";

interface CardProps {
	size: "small" | "medium" | "large";
	image: string;
	category?: string;
	name?: string;
}

const CardStyles = {
	Container: styled.div<{ size: CardProps["size"] }>`
		position: relative;
		img {
			border-radius: 8px;
			width: 100%;
    	height: 100%;
			object-fit: cover;
		}
		p {
			color: white;
		}
		h2 {
			color: white;
			font-family: Arial;
			font-weight: 700;
			padding-bottom: 10px;
		}

		${(props): SerializedStyles =>
			props.size === "small" &&
			css`
				width: 212px;
				height: 190px;
				p {
					font-size: 14px;
				}
			`}
		${(props): SerializedStyles =>
			props.size === "medium" &&
			css`
				width: 100%;
				height: 190px;
				p {
					font-size: 16px;
				}
			`}
		${(props): SerializedStyles =>
			props.size === "large" &&
			css`
				width: 100%;
				height: 277px;
				p {
					font-size: 16px;
				}
			`}
	`,
	InfoOuter: styled.div`
		position: absolute;
		z-index: 9;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	`,
	InfoInner: styled.div`
		display: flex;
		justify-content: flex-end;
		flex-direction: column;
		padding-left: 15px;
		width: 100%;
		height: 100%;
	`,
};

const Card: React.FC<CardProps> = ({ size, image, ...props }) => {
	const { category, name } = props;

	const ratio = size === "large" ? 4 / 5 : size === "small" ? 4.5 / 5 : 3 / 5;

	return (
		<CardStyles.Container size={size}>
			<AspectRatio ratio={ratio}>
				<img src={image} alt="" />
			</AspectRatio>
			{name && category && (
				<CardStyles.InfoOuter>
					<CardStyles.InfoInner>
						<p>{category}</p>
						<h2>{name}</h2>
					</CardStyles.InfoInner>
				</CardStyles.InfoOuter>
			)}
		</CardStyles.Container>
	);
};
export default Card;
