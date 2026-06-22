// Copyright (c) 2026 minimorphism
// Stories for Box

import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Box } from "./Box";

const meta: Meta<typeof Box> = {
	title: "mds-ui/Box",
	component: Box,
	parameters: {
		layout: "centered",
		docs: {
			description: {
				component:
					"The Box component is a fundamental layout container.",
			},
			story: {
				inline: false,
				iframeHeight: 250,
			},
		},
	},
	tags: ["autodocs"],
	argTypes: {
		variant: {
			control: "select",
			options: ["white", "black", "anodized", "dark-gray"],
			description: "Visual shader combination for the box.",
		},
		disabled: {
			control: "boolean",
			description:
				"If true, disables interaction and applies the disabled style.",
		},
		children: {
			control: "text",
			description: "The content inside the box.",
		},
	},
};

export default meta;
type Story = StoryObj<typeof Box>;

const contentStyle = {
	padding: "40px 60px",
	fontSize: "1.2rem",
	fontWeight: 500,
	textAlign: "center" as const,
};

export const White: Story = {
	args: {
		variant: "white",
		children: <div style={contentStyle}>White Box</div>,
	},
};

export const Black: Story = {
	args: {
		variant: "black",
		children: (
			<div style={{ ...contentStyle, color: "white" }}>Black Box</div>
		),
	},
};

export const Anodized: Story = {
	args: {
		variant: "anodized",
		children: <div style={contentStyle}>Anodized Box</div>,
	},
};

export const DarkGray: Story = {
	args: {
		variant: "dark-gray",
		children: (
			<div style={{ ...contentStyle, color: "white" }}>Dark Gray Box</div>
		),
	},
};

export const Disabled: Story = {
	args: {
		variant: "white",
		disabled: true,
		children: <div style={contentStyle}>Disabled Box</div>,
	},
	parameters: {
		docs: {
			description: {
				story: "When `disabled` is true, the box loses its variant-specific CSS class and receives the disabled styling state, while WebGL disables hover/click interactions.",
			},
		},
	},
};
