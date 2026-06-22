// Copyright (c) 2026 minimorphism
// Stories for Button

import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";

const meta: Meta<typeof Button> = {
	title: "mds-ui/Button",
	component: Button,
	parameters: {
		layout: "centered",
		docs: {
			description: {
				component:
					"The Button component provides an interactive tactile button with WebGL-rendered shadows, and pointer effects. It supports different sizes, themes, and handles the disabled state.",
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
			options: ["white", "black", "anodized", "dark-gray"],
			description: "Visual shader combination for the button.",
		},
		size: {
			control: "select",
			options: ["sm", "md", "lg"],
			description: "Defines the button size.",
		},
		disabled: {
			control: "boolean",
			description:
				"If true, disables interaction and applies the disabled style.",
		},
		children: {
			control: "text",
			description: "The text label inside the button.",
		},
	},
};

export default meta;
type Story = StoryObj<typeof Button>;

export const White: Story = {
	args: {
		variant: "white",
		children: "White",
	},
};

export const Black: Story = {
	args: {
		variant: "black",
		children: "Black",
	},
};

export const Anodized: Story = {
	args: {
		variant: "anodized",
		children: "Anodized",
	},
};

export const DarkGray: Story = {
	args: {
		variant: "dark-gray",
		children: "Dark Gray",
	},
};

export const Disabled: Story = {
	args: {
		variant: "white",
		disabled: true,
		children: "Disabled",
	},
};

export const Sizes: Story = {
	render: () => (
		<div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
			<Button size="sm">Small</Button>
			<Button size="md">Medium</Button>
			<Button size="lg">Large</Button>
		</div>
	),
};
