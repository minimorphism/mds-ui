// Copyright (c) 2026 minimorphism
// Stories for Snackbar

import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Snackbar } from "./Snackbar";
import { Button } from "../Button/Button";
import { Icons } from "../Icons/Icons";

const meta: Meta<typeof Snackbar> = {
	title: "mds-ui/Snackbar",
	component: Snackbar,
	parameters: {
		layout: "centered",
		docs: {
			description: {
				component:
					"The Snackbar component provides brief non-interrupting notifications. It uses dual WebGL shaders (one for the main body, one for the icon).",
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
			description: "Visual style of the Snackbar and its icon.",
		},
		message: {
			control: "text",
			description: "The text message to display.",
		},
		open: {
			control: "boolean",
			description: "Controls whether the Snackbar is visible.",
		},
	},
};

export default meta;
type Story = StoryObj<typeof Snackbar>;

const SnackbarTemplate = (args: any) => {
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
				Toggle Snackbar
			</Button>
			<Snackbar {...args} open={open} />
		</div>
	);
};

export const White: Story = {
	render: SnackbarTemplate,
	args: {
		message: "Item moved to trash",
		variant: "white",
		icon: <Icons.MockIcon />,
	},
};

export const Black: Story = {
	render: SnackbarTemplate,
	args: {
		message: "Connection restored",
		variant: "black",
		icon: <Icons.MockIcon />,
	},
};

export const Anodized: Story = {
	render: SnackbarTemplate,
	args: {
		message: "Settings saved successfully",
		variant: "anodized",
		icon: <Icons.MockIcon />,
	},
};

export const ScaledText: Story = {
	render: SnackbarTemplate,
	args: {
		message: "Huge Scaled Snackbar",
		variant: "white",
		icon: <Icons.MockIcon />,
		style: { fontSize: "24px" },
	},
};
