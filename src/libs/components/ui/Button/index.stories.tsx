/**
 * Only work when component don't interact with Redux store.
 */
import type { Meta, StoryObj } from "@storybook/react";
import Button from ".";

const meta: Meta<typeof Button> = {
	component: Button,
	title: "Button",
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Disable: Story = {
	args: {
		disabled: true,
	},
};
