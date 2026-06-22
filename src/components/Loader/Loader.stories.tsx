// Copyright (c) 2026 minimorphism
// Stories for Loader

import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Loader } from "./Loader";

const meta: Meta<typeof Loader> = {
	title: "mds-ui/Loader",
	component: Loader,
	parameters: {
		layout: "centered",
		docs: {
			description: {
				component:
					"The Loader component is a clean, animated loading spinner built purely using SVG and CSS keyframe transitions.",
			},
		},
	},
	tags: ["autodocs"],
	argTypes: {
		variant: {
			control: "select",
			options: ["black", "white"],
			description: "Visual color combination for the loader spinner.",
		},
		size: {
			control: "number",
			description:
				"Symmetric dimensions (width and height in pixels) of the loader.",
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
type Story = StoryObj<typeof Loader>;

export const Black: Story = {
	args: {
		variant: "black",
		size: 40,
	},
};

export const White: Story = {
	args: {
		variant: "white",
		size: 40,
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
	parameters: {
		backgrounds: { default: "dark" },
	},
};

export const CustomSize: Story = {
	args: {
		variant: "black",
		size: 80,
	},
	parameters: {
		docs: {
			description: {
				story: "The `size` property scales both the container box and the SVG circle dynamically.",
			},
		},
	},
};
