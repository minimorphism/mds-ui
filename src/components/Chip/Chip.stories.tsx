// Copyright (c) 2026 minimorphism
// Stories for Chip

import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Chip } from "./Chip";

const meta: Meta<typeof Chip> = {
	title: "mds-ui/Chip",
	component: Chip,
	parameters: {
		layout: "centered",
		docs: {
			description: {
				component:
					"The Chip component is a small, interactive, pill-shaped tactile element. It relies on WebGL shaders for its physical aesthetic and supports pointer interactions.",
			},
			story: {
				inline: false,
				iframeHeight: 150,
			},
		},
	},
	tags: ["autodocs"],
	argTypes: {
		variant: {
			control: "select",
			options: ["white", "black", "anodized"],
			description: "Visual shader combination for the chip.",
		},
		disabled: {
			control: "boolean",
			description: "If true, disables interaction.",
		},
		children: {
			control: "text",
			description: "The text label inside the chip.",
		},
	},
	decorators: [
		(Story) => (
			<div>
				<Story />
			</div>
		),
	],
};

export default meta;
type Story = StoryObj<typeof Chip>;

export const White: Story = {
	args: {
		variant: "white",
		children: "Clickable",
	},
};

export const Black: Story = {
	args: {
		variant: "black",
		children: "Clickable",
	},
};

export const Anodized: Story = {
	args: {
		variant: "anodized",
		children: "Clickable",
	},
};