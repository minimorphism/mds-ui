// Copyright (c) 2026 minimorphism
// Stories for Autocomplete

import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Autocomplete } from "./Autocomplete";

const meta: Meta<typeof Autocomplete> = {
	title: "mds-ui/Autocomplete",
	component: Autocomplete,
	parameters: {
		layout: "padded",
		docs: {
			description: {
				component:
					"The Autocomplete component acts as an expanding container with an input field andboxes for list options.",
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
			description: "Visual shader combination for the autocomplete.",
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
type Story = StoryObj<typeof Autocomplete>;

const mockOptions = [
	{ id: "1", label: "Ethereum" },
	{ id: "2", label: "Bitcoin" },
	{ id: "3", label: "Solana" },
];

export const Black: Story = {
	args: {
		variant: "black",
		placeholder: "Search...",
		defaultOpen: true,
		options: mockOptions,
	},
	parameters: {
		docs: {
			description: {
				story: "The `black` variant automatically renders a `dark-gray` shader for the expanding body and `anodized` boxes.",
			},
		},
	},
};

export const White: Story = {
	args: {
		variant: "white",
		placeholder: "Search...",
		defaultOpen: true,
		options: mockOptions,
	},
};

export const Anodized: Story = {
	args: {
		variant: "anodized",
		placeholder: "Search...",
		defaultOpen: true,
		options: mockOptions,
	},
};
