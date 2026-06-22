// Copyright (c) 2026 minimorphism
// Stories for Input

import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "./Input";
import { Icons } from "../Icons/Icons";

const meta: Meta<typeof Input> = {
	title: "mds-ui/Input",
	component: Input,
	parameters: {
		layout: "centered",
		docs: {
			description: {
				component:
					"The Input component provides an interactive tactile field. It registers as a WebGL widget to render shadows, borders, and hover states, and dynamically supports passwords and multiline textareas.",
			},
			story: {
				inline: false,
				iframeHeight: 250,
			},
		},
	},
	tags: ["autodocs"],
	argTypes: {
		variant: {
			control: "select",
			options: ["white", "black", "anodized", "dark-gray"],
			description: "Visual shader combination for the input background.",
		},
		size: {
			control: "select",
			options: ["sm", "md", "lg"],
			description: "Defines the input dimensions and font sizes.",
		},
		isPassword: {
			control: "boolean",
			description:
				"If true, renders a password field with a visibility toggle icon.",
		},
		multiline: {
			control: "boolean",
			description:
				"If true, renders a styled textarea instead of an input.",
		},
		disabled: {
			control: "boolean",
			description:
				"If true, disables interaction and applies the disabled style.",
		},
	},
	decorators: [
		(Story) => (
			<div
				style={{
					padding: "40px",
					width: "100%",
					minWidth: "320px",
					maxWidth: "450px",
				}}
			>
				<Story />
			</div>
		),
	],
};

export default meta;
type Story = StoryObj<typeof Input>;

export const White: Story = {
	args: {
		variant: "white",
		placeholder: "Enter username...",
	},
};

export const Black: Story = {
	args: {
		variant: "black",
		placeholder: "Enter secure token...",
	},
};

export const Anodized: Story = {
	args: {
		variant: "anodized",
		placeholder: "Search transactions...",
	},
};

export const DarkGray: Story = {
	args: {
		variant: "dark-gray",
		placeholder: "Enter details...",
	},
};

export const Password: Story = {
	args: {
		variant: "white",
		isPassword: true,
		placeholder: "Enter your password...",
	},
	parameters: {
		docs: {
			description: {
				story: "The `isPassword` prop appends an eye icon on the right, allowing the user to reveal or obscure the text.",
			},
		},
	},
};

export const Multiline: Story = {
	args: {
		variant: "white",
		multiline: true,
		placeholder: "Write a message...",
		rows: 4,
	},
	parameters: {
		docs: {
			description: {
				story: "When `multiline` is true, the component switches to a native `textarea` while retaining the identical visual design system.",
			},
		},
	},
};

export const WithIcon: Story = {
	args: {
		variant: "white",
		placeholder: "Search...",
		icon: <Icons.SearchIcon />,
	},
	parameters: {
		docs: {
			description: {
				story: "An optional `icon` can be passed to render on the left side of the input field.",
			},
		},
	},
};

export const Disabled: Story = {
	args: {
		variant: "white",
		disabled: true,
		placeholder: "Locked input...",
	},
};
