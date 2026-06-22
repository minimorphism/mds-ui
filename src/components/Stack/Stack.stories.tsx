// Copyright (c) 2026 minimorphism
// Stories for Stack

import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Stack } from "./Stack";

const meta: Meta<typeof Stack> = {
	title: "mds-ui/Stack",
	component: Stack,
	parameters: {
		layout: "centered",
		docs: {
			description: {
				component:
					"The Stack component is a layout container designed to group and align elements while applying specific WebGL shader styles and variants.",
			},
			story: {
				inline: false,
				iframeHeight: 120,
			},
		},
	},
	tags: ["autodocs"],
	argTypes: {
		variant: {
			control: "select",
			options: ["white", "black", "anodized", "dark-gray"],
			description: "Controls the visual shader combination of the Stack.",
		},
		children: {
			control: "text",
			description: "The content of the Stack component.",
		},
	},
};

export default meta;
type Story = StoryObj<typeof Stack>;

export const White: Story = {
	render: (args) => <Stack {...args}>{args.children}</Stack>,
	args: { variant: "white", children: "Item 1" },
};

export const Black: Story = {
	render: (args) => <Stack {...args}>{args.children}</Stack>,
	args: { variant: "black", children: "Item 1" },
};

export const Anodized: Story = {
	render: (args) => <Stack {...args}>{args.children}</Stack>,
	args: { variant: "anodized", children: "Item 1" },
};

export const DarkGray: Story = {
	render: (args) => <Stack {...args}>{args.children}</Stack>,
	args: { variant: "dark-gray", children: "Item 1" },
};

export const LayoutExample: Story = {
	parameters: {
		docs: {
			story: {
				iframeHeight: 300,
			},
		},
	},
	render: () => (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				gap: "24px",
				alignItems: "center",
				padding: "20px",
			}}
		>
			<Stack variant="white">Item 1</Stack>
			<Stack variant="black">Item 1</Stack>
			<Stack variant="anodized">Item 1</Stack>
		</div>
	),
};
