// Copyright (c) 2026 minimorphism
// Stories for Switch

import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Switch } from "./Switch";

const meta: Meta<typeof Switch> = {
	title: "mds-ui/Switch",
	component: Switch,
	parameters: {
		layout: "centered",
		docs: {
			description: {
				component:
					"The Switch component toggles the state of a single setting.",
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
			description:
				"Controls the visual shader combination of the track and thumb.",
		},
		checked: {
			control: "boolean",
			description: "If true, the component is checked.",
		},
		disabled: {
			control: "boolean",
			description: "If true, the switch is disabled.",
		},
	},
};

export default meta;
type Story = StoryObj<typeof Switch>;

export const White: Story = {
	args: { variant: "white", defaultChecked: false },
};

export const Black: Story = {
	args: { variant: "black", defaultChecked: false },
};

export const Anodized: Story = {
	args: { variant: "anodized", defaultChecked: false },
};

export const DarkGray: Story = {
	args: { variant: "dark-gray", defaultChecked: false },
};

export const Sizes: Story = {
	render: () => (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				gap: "24px",
				alignItems: "flex-start",
			}}
		>
			<Switch size="sm" variant="black" defaultChecked />
			<Switch size="md" variant="black" defaultChecked />
			<Switch size="lg" variant="black" defaultChecked />
		</div>
	),
};
