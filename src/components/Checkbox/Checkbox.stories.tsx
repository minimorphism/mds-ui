// Copyright (c) 2026 minimorphism
// Stories for Checkbox

import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Checkbox } from "./Checkbox";

const meta: Meta<typeof Checkbox> = {
	title: "mds-ui/Checkbox",
	component: Checkbox,
	parameters: {
		layout: "centered",
		docs: {
			description: {
				component:
					"The Checkbox component provides a custom-styled, accessible boolean input. It relies purely on CSS for its tactile visuals and SVG checkmark animations.",
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
			options: ["black", "white"],
			description: "Visual color combination for the checkbox.",
		},
		disabled: {
			control: "boolean",
			description: "If true, disables interaction.",
		},
		checked: {
			control: "boolean",
			description: "Controls the exact checked state (if controlled).",
		},
		defaultChecked: {
			control: "boolean",
			description: "Initial state for uncontrolled usage.",
		},
	},
	decorators: [
		(Story) => (
			<div style={{ padding: "40px" }}>
				<Story />
			</div>
		),
	],
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Black: Story = {
	args: {
		variant: "black",
	},
};

export const White: Story = {
	args: {
		variant: "white",
	},
	decorators: [
		(Story) => (
			<div
				style={{
					backgroundColor: "#000000",
					padding: "40px",
					borderRadius: "20px",
					display: "inline-flex",
				}}
			>
				<Story />
			</div>
		),
	],
	parameters: {
		backgrounds: { default: "dark" },
	},
};

export const Checked: Story = {
	args: {
		variant: "black",
		defaultChecked: true,
	},
};

export const Disabled: Story = {
	args: {
		variant: "black",
		disabled: true,
		defaultChecked: true,
	},
};

export const WithTextLabel: Story = {
	render: (args) => (
		<div
			style={{
				display: "flex",
				alignItems: "center",
				gap: "16px",
				fontFamily: '"minimorphism", sans-serif',
			}}
		>
			<Checkbox {...args} id="terms-checkbox" />
			<label
				htmlFor="terms-checkbox"
				style={{
					cursor: "pointer",
					fontSize: "1.2rem",
					userSelect: "none",
				}}
			>
				I accept the conditions
			</label>
		</div>
	),
	args: {
		variant: "black",
	},
	parameters: {
		docs: {
			description: {
				story: "The Checkbox can easily be paired with a text label by wrapping them in a flex container and linking them via the `id` attribute.",
			},
		},
	},
};
