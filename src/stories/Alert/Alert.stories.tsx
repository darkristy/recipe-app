import React, { ComponentProps } from "react";
import { Story } from "@storybook/react/types-6-0";

import { Alert } from ".";

export default {
	title: "Alert",
	component: Alert,
};

const Template: Story<ComponentProps<typeof Alert>> = (args) => <Alert {...args} />;

export const Warning = Template.bind({});
Warning.args = {
	message: "This is an warning alert!",
	severity: "warning",
};

export const Error = Template.bind({});
Error.args = {
	message: "This is a error alert!",
	severity: "error",
};

export const Success = Template.bind({});
Success.args = {
	message: " This is a success alert!",
	severity: "success",
};
