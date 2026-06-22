// Copyright (c) 2026 minimorphism
// Stories for MobileModal

import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { MobileModal } from "./MobileModal";
import { Button } from "../Button/Button";

const meta: Meta<typeof MobileModal> = {
	title: "mds-ui/MobileModal",
	component: MobileModal,
	parameters: {
		layout: "fullscreen",
		docs: {
			description: {
				component: "A modal window adapted for mobile devices.",
			},
			story: {
				inline: false,
				iframeHeight: 700,
			},
		},
		backgrounds: {
			default: "light",
			values: [
				{ name: "light", value: "#f3f4f6" },
				{ name: "dark", value: "#1f2937" },
			],
		},
	},
	tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof MobileModal>;

const ModalWrapper = (args: React.ComponentProps<typeof MobileModal>) => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div
			style={{
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				height: "100vh",
				width: "100%",
				fontFamily: '"minimorphism", sans-serif',
			}}
		>
			<Button variant="black" onClick={() => setIsOpen(true)}>
				Open Mobile Modal
			</Button>

			<MobileModal
				{...args}
				open={isOpen}
				onClose={() => setIsOpen(false)}
			/>
		</div>
	);
};

export const Default: Story = {
	render: (args) => <ModalWrapper {...args} />,
	args: {
		title: "About MobileModal",
		children: (
			<div
				style={{
					fontSize: "18px",
					lineHeight: "1.6",
					textAlign: "center",
					color: "#ffffff",
				}}
			>
				MobileModal is a component of the MDS-UI UI component
				collection. It's a modal window adapted for mobile devices.
			</div>
		),
	},
};

export const ShortContent: Story = {
	render: (args) => <ModalWrapper {...args} />,
	args: {
		title: "Warning",
		children: (
			<div
				style={{
					fontSize: "18px",
					lineHeight: "1.6",
					textAlign: "center",
					color: "#ffffff",
					padding: "20px 0",
				}}
			>
				Are you sure you want to proceed?
			</div>
		),
	},
};
