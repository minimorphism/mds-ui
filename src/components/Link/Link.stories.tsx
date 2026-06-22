// Copyright (c) 2026 minimorphism
// Stories for Link

import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Link } from "./Link";

const meta: Meta<typeof Link> = {
	title: "mds-ui/Link",
	component: Link,
	parameters: {
		layout: "centered",
		docs: {
			description: {
				component:
					"The Link component formats anchor tags. Depending on the chosen variant, it can act as a standard text link or a tactile WebGL-backed pill button.",
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
			options: ["black-text", "black-pill", "white-text", "white-pill"],
			description:
				"Visual style. Pill variants trigger WebGL rendering for the background shape.",
		},
		href: {
			control: "text",
			description: "Destination URL.",
		},
		children: {
			control: "text",
			description: "The visual text label for the link.",
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
type Story = StoryObj<typeof Link>;

export const BlackText: Story = {
	args: {
		variant: "black-text",
		href: "#",
		children: "Explore Ecosystem",
	},
};

export const BlackPill: Story = {
	args: {
		variant: "black-pill",
		href: "#",
		children: "Launch App",
	},
	parameters: {
		docs: {
			description: {
				story: "The `black-pill` variant renders a fully rounded button with WebGL-backed interactive effects.",
			},
		},
	},
};

export const WhiteText: Story = {
	args: {
		variant: "white-text",
		href: "#",
		children: "Explore Ecosystem",
	},
	decorators: [
		(Story) => (
			<div
				style={{
					backgroundColor: "#111111",
					padding: "40px",
					borderRadius: "12px",
					display: "inline-block",
				}}
			>
				<Story />
			</div>
		),
	],
};

export const WhitePill: Story = {
	args: {
		variant: "white-pill",
		href: "#",
		children: "Launch App",
	},
	decorators: [
		(Story) => (
			<div>
				<Story />
			</div>
		),
	],
};
