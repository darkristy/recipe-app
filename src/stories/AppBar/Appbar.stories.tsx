import React from "react";
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from "@storybook/react/types-6-0";

import { AppBar, AppBarProps } from ".";

export default {
	title: "AppBar",
	component: AppBar,
} as Meta;

const Template: Story<AppBarProps> = (args) => <AppBar {...args} />;

export const Standard = Template.bind({});
Standard.args = {};
