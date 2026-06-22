// Copyright (c) 2026 minimorphism
// Stories for Divider

import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Divider } from "./Divider";

const meta: Meta<typeof Divider> = {
	title: "mds-ui/Divider",
	component: Divider,
	parameters: {
		layout: "padded",
		docs: {
			description: {
				component:
					"The Divider component creates a visual separation line between layout areas or content blocks. It relies purely on CSS for styling.",
			},
			story: {
				inline: false,
				iframeHeight: 150,
			},
		},
	},
	tags: ["autodocs"],
	argTypes: {
		margin: {
			control: "text",
			description:
				"Custom CSS margin property to override default vertical/horizontal spacing.",
		},
	},
};

export default meta;
type Story = StoryObj<typeof Divider>;

const contentStyle = {
	color: "rgba(177, 177, 177, 0.8)",
	fontFamily: '"minimorphism", sans-serif',
	fontSize: "1.2rem",
	textAlign: "center" as const,
};

export const Default: Story = {
	render: (args) => (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				width: "100%",
				maxWidth: "400px",
			}}
		>
			<div style={contentStyle}>Top Content Block</div>
			<Divider {...args} />
			<div style={contentStyle}>Bottom Content Block</div>
		</div>
	),
	parameters: {
		docs: {
			description: {
				story: "By default, the divider stretches to fill the container's width.",
			},
		},
	},
};

export const CustomMargin: Story = {
	render: (args) => (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				width: "100%",
				maxWidth: "400px",
			}}
		>
			<div style={contentStyle}>Section 1</div>
			<Divider {...args} margin="40px 0" />
			<div style={contentStyle}>Section 2</div>
		</div>
	),
	parameters: {
		docs: {
			description: {
				story: "You can easily push the content further apart by passing a custom `margin` string.",
			},
		},
	},
};
