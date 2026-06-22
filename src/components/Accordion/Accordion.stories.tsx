// Copyright (c) 2026 minimorphism
// Stories for Accordion

import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Accordion } from "./Accordion";

const meta: Meta<typeof Accordion> = {
	title: "mds-ui/Accordion",
	component: Accordion,
	parameters: {
		layout: "padded",
		docs: {
			description: {
				component:
					"The Accordion component acts as an expanding container.",
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
			description: "Visual shader combination for the accordion.",
		},
		title: { control: "text" },
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
type Story = StoryObj<typeof Accordion>;

const MockSelectContent = () => (
	<div
		style={{
			display: "flex",
			alignItems: "center",
			gap: "16px",
			fontSize: "1.2rem",
		}}
	>
		<span>minimorphism</span>
	</div>
);

export const Black: Story = {
	args: {
		variant: "black",
		title: "Crypto",
		defaultOpen: true,
		children: <MockSelectContent />,
	},
	parameters: {
		docs: {
			description: {
				story: "The `black` variant automatically renders a `dark-gray` shader for the expanding body to visually distinguish the separate layers.",
			},
		},
	},
};

export const White: Story = {
	args: {
		variant: "Crypto",
		title: "Crypto",
		defaultOpen: true,
		children: <MockSelectContent />,
	},
};

export const Anodized: Story = {
	args: {
		variant: "anodized",
		title: "Crypto",
		defaultOpen: true,
		children: <MockSelectContent />,
	},
};
