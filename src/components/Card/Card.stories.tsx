// Copyright (c) 2026 minimorphism
// Stories for Card

import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Card } from "./Card";

const meta: Meta<typeof Card> = {
	title: "mds-ui/Card",
	component: Card,
	parameters: {
		layout: "centered",
		docs: {
			description: {
				component:
					"The Card component is a general-purpose content container with a WebGL-rendered background. It automatically registers itself in the WebGL context, mapping any 'grey' variant to 'gray' to unify shader rendering.",
			},
			story: {
				inline: false,
				iframeHeight: 300,
			},
		},
	},
	tags: ["autodocs"],
	argTypes: {
		variant: {
			control: "select",
			options: ["white", "black", "anodized", "dark-gray"],
			description: "Visual shader combination for the card background.",
		},
		disabled: {
			control: "boolean",
			description:
				"If true, disables interaction and applies the disabled style.",
		},
		children: {
			control: "text",
			description: "The content inside the card.",
		},
	},
};

export default meta;
type Story = StoryObj<typeof Card>;

const contentStyle = {
	padding: "48px 80px",
	fontSize: "1.2rem",
	fontWeight: 500,
	textAlign: "center" as const,
};

export const White: Story = {
	args: {
		variant: "white",
		children: <div style={contentStyle}>White Card</div>,
	},
};

export const Black: Story = {
	args: {
		variant: "black",
		children: (
			<div style={{ ...contentStyle, color: "white" }}>Black Card</div>
		),
	},
};

export const Anodized: Story = {
	args: {
		variant: "grey",
		children: <div style={contentStyle}>Anodized Card</div>,
	},
};

export const DarkGray: Story = {
	args: {
		variant: "dark-gray",
		children: <div style={contentStyle}>Grey Card</div>,
	},
};

export const Disabled: Story = {
	args: {
		variant: "white",
		disabled: true,
		children: <div style={contentStyle}>Disabled Card</div>,
	},
};
