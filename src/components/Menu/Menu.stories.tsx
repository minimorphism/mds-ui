// Copyright (c) 2026 minimorphism
// Stories for Menu

import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Menu } from "./Menu";

const meta: Meta<typeof Menu> = {
	title: "mds-ui/Menu",
	component: Menu,
	parameters: {
		layout: "centered",
		docs: {
			description: {
				component:
					"The Menu component renders a tactile hamburger menu button with realistic volumetric CSS-rendered shadows and smooth hover scale feedback.",
			},
			story: {
				inline: false,
				iframeHeight: 200,
			},
		},
	},
	tags: ["autodocs"],
	argTypes: {
		variant: {
			control: "select",
			options: ["black", "white"],
			description:
				"Defines the color theme of the menu button and its shadows.",
		},
		disabled: {
			control: "boolean",
			description:
				"If true, disables interaction and applies the disabled style.",
		},
	},
};

export default meta;
type Story = StoryObj<typeof Menu>;

export const Black: Story = {
	args: {
		variant: "black",
	},
};

export const White: Story = {
	args: {
		variant: "white",
	},
	parameters: {
		backgrounds: { default: "dark" },
	},
};
