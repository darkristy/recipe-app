import React from "react";
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from "@storybook/react/types-6-0";

import { Card, CardProps } from ".";

export default {
	title: "Card",
	component: Card,
} as Meta;

const Template: Story<CardProps> = (args) => <Card {...args} />;

export const Small = Template.bind({});
Small.args = {
	size: "small",
	image: "/sushi.jpeg",
	category: "Japanese",
	name: "Sushi",
};

export const Medium = Template.bind({});
Medium.args = {
	size: "medium",
	image: "/sushi.jpeg",
	category: "Japanese",
	name: "Sushi",
};

export const Large = Template.bind({});
Large.args = {
	size: "large",
	image: "/sushi.jpeg",
	category: "Japanese",
	name: "Sushi",
};
