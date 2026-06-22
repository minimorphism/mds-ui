// Copyright (c) 2026 minimorphism
// Stories for Slider

import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Slider } from "./Slider";

const meta: Meta<typeof Slider> = {
	title: "mds-ui/Slider",
	component: Slider,
	parameters: {
		layout: "padded",
		docs: {
			description: {
				component:
					"The Slider component allows users to make selections from a range of values.",
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
			options: ["white", "black", "anodized", "dark-gray"],
			description: "Visual shader combination for track and thumb.",
		},
		size: {
			control: "select",
			options: ["sm", "md", "lg"],
		},
		min: { control: "number" },
		max: { control: "number" },
		step: { control: "number" },
		disabled: { control: "boolean" },
	},
	decorators: [
		(Story) => (
			<div style={{ width: "300px", padding: "20px" }}>
				<Story />
			</div>
		),
	],
};

export default meta;
type Story = StoryObj<typeof Slider>;

const SliderTemplate = (args: any) => {
	const [val, setVal] = useState(args.defaultValue || 50);
	return (
		<div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
			<div style={{ color: "#888" }}>Value: {val}</div>
			<Slider {...args} value={val} onChange={setVal} />
		</div>
	);
};

export const White: Story = {
	render: SliderTemplate,
	args: { variant: "white", min: 0, max: 100, step: 1, defaultValue: 40 },
};

export const Black: Story = {
	render: SliderTemplate,
	args: { variant: "black", min: 0, max: 100, step: 5, defaultValue: 70 },
};

export const Anodized: Story = {
	render: SliderTemplate,
	args: { variant: "anodized", min: 0, max: 10, step: 1, defaultValue: 3 },
};

export const DarkGray: Story = {
	render: SliderTemplate,
	args: { variant: "dark-gray", min: 0, max: 100, step: 1, defaultValue: 60 },
};

export const Sizes: Story = {
	render: () => (
		<div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
			<Slider size="sm" variant="black" defaultValue={20} />
			<Slider size="md" variant="black" defaultValue={50} />
			<Slider size="lg" variant="black" defaultValue={80} />
		</div>
	),
	parameters: {
		docs: { story: { iframeHeight: 250 } },
	},
};
