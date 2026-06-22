// Copyright (c) 2026 minimorphism
// Stories for Select

import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Select } from "./Select";

const meta: Meta<typeof Select> = {
	title: "mds-ui/Select",
	component: Select,
	parameters: {
		layout: "padded",
		docs: {
			description: {
				component:
					"The Select component acts as a premium tactile dropdown widget with WebGL-rendered shadow layers and customizable vector boxes.",
			},
			story: {
				inline: false,
				iframeHeight: 350,
			},
		},
	},
	tags: ["autodocs"],
	argTypes: {
		variant: {
			control: "select",
			options: ["white", "black", "anodized"],
			description: "Visual shader combination for the select widget.",
		},
		placeholder: { control: "text" },
		open: { control: "boolean" },
		defaultOpen: { control: "boolean" },
	},
	decorators: [
		(Story) => (
			<div
				style={{
					maxWidth: "400px",
					width: "100%",
					margin: "0 auto",
					padding: "40px 20px",
				}}
			>
				<Story />
			</div>
		),
	],
};

export default meta;
type Story = StoryObj<typeof Select>;

const mockOptions = [
	{ id: "1", label: "Ethereum" },
	{ id: "2", label: "Bitcoin" },
	{ id: "3", label: "Solana" },
];

export const Black: Story = {
	args: {
		variant: "black",
		placeholder: "Choose crypto...",
		defaultOpen: true,
		options: mockOptions,
	},
	parameters: {
		docs: {
			description: {
				story: "The `black` variant displays a black-themed vector box for selected elements, and anodized boxes for default elements.",
			},
		},
	},
};

export const White: Story = {
	args: {
		variant: "white",
		placeholder: "Choose crypto...",
		defaultOpen: true,
		options: mockOptions,
	},
};

export const Anodized: Story = {
	args: {
		variant: "anodized",
		placeholder: "Choose crypto...",
		defaultOpen: true,
		options: mockOptions,
	},
};