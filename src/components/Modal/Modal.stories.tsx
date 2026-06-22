// Copyright (c) 2026 minimorphism
// Stories for Modal

import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Modal } from "./Modal";
import { Button } from "../Button/Button";

const meta: Meta<typeof Modal> = {
	title: "mds-ui/Modal",
	component: Modal,
	parameters: {
		layout: "centered",
		docs: {
			description: {
				component:
					"The Modal component renders a tactile skeuomorphic dialog box with WebGL-rendered shadow layers and customizable themes.",
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
			description: "Visual shader combination for the modal background.",
		},
		open: {
			control: "boolean",
			description: "Controls whether the Modal is open and visible.",
		},
		onClose: {
			action: "closed",
			description:
				"Callback function triggered when the modal is requested to close.",
		},
	},
};

export default meta;
type Story = StoryObj<typeof Modal>;

const ModalTemplate = (args: any) => {
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
			<Button
				variant={args.variant === "black" ? "white" : "black"}
				onClick={() => setOpen(true)}
			>
				Open Modal
			</Button>
			<Modal {...args} open={open} onClose={() => setOpen(false)}>
				<h2
					style={{
						marginTop: 0,
						fontSize: "1.8rem",
						fontWeight: 500,
					}}
				>
					Hello minimorphism
				</h2>
				<p
					style={{
						opacity: 0.8,
						lineHeight: 1.5,
						fontSize: "1.1rem",
					}}
				>
					This is a modal using minimorphism.
				</p>
				<Button
					variant={args.variant === "black" ? "white" : "black"}
					onClick={() => setOpen(false)}
					style={{ marginTop: "20px" }}
				>
					Close
				</Button>
			</Modal>
		</div>
	);
};

export const White: Story = {
	render: ModalTemplate,
	args: {
		variant: "white",
	},
};

export const Black: Story = {
	render: ModalTemplate,
	args: {
		variant: "black",
	},
};

export const Anodized: Story = {
	render: ModalTemplate,
	args: {
		variant: "anodized",
	},
};
