// Copyright (c) 2026 minimorphism
// Stories for Image

import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Image } from "./Image";

const meta: Meta<typeof Image> = {
	title: "mds-ui/Image",
	component: Image,
	parameters: {
		layout: "centered",
		docs: {
			description: {
				component:
					"The Image component is a responsive container wrapping the native `img` element. It enforces consistent sizing through the wrapper and passes all standard attributes to the underlying image.",
			},
			story: {
				inline: false,
				iframeHeight: 400,
			},
		},
	},
	tags: ["autodocs"],
	argTypes: {
		src: {
			control: "text",
			description: "The source URL of the image.",
		},
		alt: {
			control: "text",
			description: "Alternative text for the image.",
		},
		width: {
			control: "text",
			description:
				"Width of the image wrapper (e.g., '100%', '300px', 400).",
		},
		height: {
			control: "text",
			description: "Height of the image wrapper.",
		},
	},
	decorators: [
		(Story) => (
			<div
				style={{
					padding: "40px",
					display: "flex",
					justifyContent: "center",
				}}
			>
				<Story />
			</div>
		),
	],
};

export default meta;
type Story = StoryObj<typeof Image>;

export const Default: Story = {
	args: {
		src: "https://placehold.co/600x400/222222/EEEEEE/png?text=minimorphism",
		alt: "Placeholder image",
	},
	parameters: {
		docs: {
			description: {
				story: "By default, the image wrapper gets a width of `300px` and an `auto` height.",
			},
		},
	},
};

export const CustomSize: Story = {
	args: {
		src: "https://placehold.co/400x400/222222/EEEEEE/png?text=Square",
		alt: "Square image",
		width: "150px",
		height: "150px",
	},
	parameters: {
		docs: {
			description: {
				story: "You can explicitly set `width` and `height` to force specific dimensions.",
			},
		},
	},
};

export const Responsive: Story = {
	render: (args) => (
		<div
			style={{
				width: "500px",
				border: "2px dashed #ccc",
				padding: "16px",
				borderRadius: "20px",
			}}
		>
			<Image {...args} />
		</div>
	),
	args: {
		src: "https://placehold.co/500x300/222222/EEEEEE/png?text=Responsive",
		alt: "Responsive image",
		width: "100%",
		height: "auto",
	},
	parameters: {
		docs: {
			description: {
				story: "Setting `width: 100%` allows the image wrapper to gracefully fill its parent container.",
			},
		},
	},
};
