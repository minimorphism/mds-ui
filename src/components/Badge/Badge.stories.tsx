// Copyright (c) 2026 minimorphism
// Stories for Badge

import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "./Badge";
import { Avatar } from "../Avatar/Avatar";

const meta: Meta<typeof Badge> = {
	title: "mds-ui/Badge",
	component: Badge,
	parameters: {
		layout: "centered",
		docs: {
			description: {
				component:
					"The Badge component is used to generate small status descriptors or counts, typically positioning itself absolute to a wrapped target element (passed via children). The badge itself is registered as a WebGL widget with an interactive shader-based background.",
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
			options: ["black", "white", "anodized"],
			description: "Visual shader combination for the badge background.",
		},
		content: {
			control: "text",
			description: "The text, number or icon displayed inside the badge.",
		},
		children: {
			control: "text",
			description: "The element being badged.",
		},
	},
};

export default meta;
type Story = StoryObj<typeof Badge>;

const BadgeTemplate = (args: any) => (
	<Badge {...args}>
		<Avatar />
	</Badge>
);

export const Black: Story = {
	render: BadgeTemplate,
	args: {
		variant: "black",
		content: "8",
	},
};

export const White: Story = {
	render: BadgeTemplate,
	args: {
		variant: "white",
		content: "99+",
	},
};

export const Anodized: Story = {
	render: BadgeTemplate,
	args: {
		variant: "anodized",
		content: "1",
	},
};
