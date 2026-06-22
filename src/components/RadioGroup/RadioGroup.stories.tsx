// Copyright (c) 2026 minimorphism
// Stories for RadioGroup

import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { RadioButton } from "./RadioGroup";

const meta: Meta<typeof RadioButton> = {
	title: "mds-ui/RadioGroup",
	component: RadioButton,
	parameters: {
		layout: "centered",
		docs: {
			description: {
				component:
					"The RadioButton component provides a custom-styled, accessible boolean input. It relies purely on CSS for its tactile outer ring, inner dot gap, and smooth scale transitions.",
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
			options: ["white", "black", "anodized"],
			description:
				"Visual theme of the radio button track and inner dot.",
		},
		disabled: {
			control: "boolean",
			description: "If true, disables interaction.",
		},
	},
};

export default meta;
type Story = StoryObj<typeof RadioButton>;

const RadioGroupDemo = (args: any) => {
	const [selected, setSelected] = useState("opt1");

	return (
		<div style={{ display: "flex", gap: "20px" }}>
			<RadioButton
				{...args}
				name="demo"
				value="opt1"
				checked={selected === "opt1"}
				onChange={(e) => setSelected(e.target.value)}
			/>
			<RadioButton
				{...args}
				name="demo"
				value="opt2"
				checked={selected === "opt2"}
				onChange={(e) => setSelected(e.target.value)}
			/>
			<RadioButton
				{...args}
				name="demo"
				value="opt3"
				checked={selected === "opt3"}
				onChange={(e) => setSelected(e.target.value)}
			/>
		</div>
	);
};

export const White: Story = {
	render: (args) => (
		<div
			style={{
				backgroundColor: "#000",
				padding: "40px",
				borderRadius: "16px",
				display: "inline-block",
			}}
		>
			<RadioGroupDemo {...args} variant="white" />
		</div>
	),
	args: {
		variant: "white",
	},
};

export const Black: Story = {
	render: (args) => <RadioGroupDemo {...args} variant="black" />,
	args: {
		variant: "black",
	},
};

export const Anodized: Story = {
	render: (args) => (
		<div
			style={{
				backgroundColor: "#000",
				padding: "40px",
				borderRadius: "16px",
				display: "inline-block",
			}}
		>
			<RadioGroupDemo {...args} variant="anodized" />
		</div>
	),
	args: {
		variant: "anodized",
	},
};
