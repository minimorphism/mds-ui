// Copyright (c) 2026 minimorphism
// Stories for Alert

import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Alert } from "./Alert";
import { Button } from "../Button/Button";
import { Icons } from "../Icons/Icons";

const meta: Meta<typeof Alert> = {
	title: "mds-ui/Alert",
	component: Alert,
	parameters: {
		layout: "centered",
		docs: {
			description: {
				component:
					"The Alert component displays short, important messages to the user.",
			},
			story: {
				inline: false,
				iframeHeight: 400,
			},
		},
	},
	tags: ["autodocs"],
	argTypes: {
		variant: {
			control: "select",
			options: ["white", "black", "anodized"],
			description: "Visual style of the Alert and its icon.",
		},
		message: {
			control: "text",
			description: "The text message to display.",
		},
		open: {
			control: "boolean",
			description:
				"Controls whether the Alert is visible. Handling unmounting animations automatically.",
		},
	},
};

export default meta;
type Story = StoryObj<typeof Alert>;

const AlertTemplate = (args: any) => {
	const [open, setOpen] = useState(false);
	return (
		<div
			style={{
				height: "300px",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
			}}
		>
			<Button variant="white" onClick={() => setOpen(!open)}>
				Toggle Alert
			</Button>
			<Alert {...args} open={open} />
		</div>
	);
};

export const White: Story = {
	render: AlertTemplate,
	args: {
		message: "Alert",
		variant: "white",
		icon: <Icons.MockIcon />,
	},
};

export const Black: Story = {
	render: AlertTemplate,
	args: {
		message: "Alert",
		variant: "black",
		icon: <Icons.MockIcon />,
	},
};

export const Anodized: Story = {
	render: AlertTemplate,
	args: {
		message: "Alert",
		variant: "anodized",
		icon: <Icons.MockIcon />,
	},
};

export const ScaledText: Story = {
	render: AlertTemplate,
	args: {
		message: "Huge Scaled Alert",
		variant: "white",
		icon: <Icons.MockIcon />,
		style: { fontSize: "24px" },
	},
};
