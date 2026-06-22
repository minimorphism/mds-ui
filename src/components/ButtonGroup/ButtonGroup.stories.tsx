// Copyright (c) 2026 minimorphism
// Stories for ButtonGroup

import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { ButtonGroup, type ButtonGroupProps } from "./ButtonGroup";

const meta: Meta<typeof ButtonGroup> = {
	title: "mds-ui/ButtonGroup",
	component: ButtonGroup,
	parameters: {
		layout: "centered",
		docs: {
			description: {
				component:
					"The ButtonGroup component is a horizontally aligned group of interactive buttons. It automatically handles exact border-radius calculations for WebGL to ensure smooth transitions from rounded edges to strict straight separators.",
			},
			story: {
				inline: false,
				iframeHeight: 200,
			},
		},
	},
	tags: ["autodocs"],
	argTypes: {
		variant: {
			control: "select",
			options: ["white", "black", "anodized", "dark-gray"],
			description: "Visual shader combination for the button group.",
		},
		labels: {
			control: "object",
			description: "Array of text labels to render as buttons.",
		},
		activeLabel: {
			control: "text",
			description: "Currently active button label.",
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
type Story = StoryObj<typeof ButtonGroup>;

// Обертка для хранения стейта внутри сторибука
const ButtonGroupWithState = (args: Partial<ButtonGroupProps>) => {
	const [active, setActive] = useState(args.activeLabel || "Two");

	return (
		<ButtonGroup
			variant={args.variant || "white"}
			labels={args.labels || ["One", "Two", "Three"]}
			activeLabel={active}
			onSelect={setActive}
		/>
	);
};

export const White: Story = {
	render: () => <ButtonGroupWithState variant="white" />,
	parameters: {
		docs: {
			description: {
				story: "The `white` variant utilizes transparent separators for a clean and seamless look.",
			},
		},
	},
};

export const Black: Story = {
	render: () => <ButtonGroupWithState variant="black" />,
	parameters: {
		docs: {
			description: {
				story: "The `black` variant utilizes semi-transparent white separators to distinguish boundary layers.",
			},
		},
	},
};

export const Anodized: Story = {
	render: () => <ButtonGroupWithState variant="anodized" />,
	parameters: {
		docs: {
			description: {
				story: "The `anodized` variant utilizes black separators to match the physical metallic shader aesthetic.",
			},
		},
	},
};

export const DarkGray: Story = {
	render: () => <ButtonGroupWithState variant="dark-gray" />,
};

export const ManyOptions: Story = {
	render: () => (
		<ButtonGroupWithState
			variant="white"
			labels={["Hourly", "Daily", "Weekly", "Monthly", "Yearly"]}
			activeLabel="Monthly"
		/>
	),
	parameters: {
		docs: {
			description: {
				story: "The ButtonGroup correctly processes inner corners without rounding them, preserving exact straight shapes for middle items.",
			},
		},
	},
};