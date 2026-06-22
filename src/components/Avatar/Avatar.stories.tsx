// Copyright (c) 2026 minimorphism
// Stories for Avatar

import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Avatar } from "./Avatar";

const meta: Meta<typeof Avatar> = {
	title: "mds-ui/Avatar",
	component: Avatar,
	parameters: {
		layout: "centered",
		docs: {
			description: {
				component:
					"The Avatar component represents a user profile picture or placeholder, featuring a rounded WebGL shader-based background. If no image URL is provided, it falls back to a stylized placeholder.",
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
			options: ["white", "black", "anodized"],
			description: "Visual shader combination for the avatar background.",
		},
		src: {
			control: "text",
			description: "The source URL of the avatar image.",
		},
		alt: {
			control: "text",
			description: "Alternative text description of the image.",
		},
	},
};

export default meta;
type Story = StoryObj<typeof Avatar>;

const mockImg = "https://www.svgrepo.com/show/452054/linux.svg";

export const White: Story = {
	args: {
		variant: "white",
	},
};

export const Black: Story = {
	args: {
		variant: "black",
	},
};

export const Anodized: Story = {
	args: {
		variant: "anodized",
	},
};

export const WithImage: Story = {
	args: {
		variant: "white",
		src: mockImg,
		alt: "User Profile Picture",
	},
};
