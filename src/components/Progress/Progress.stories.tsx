// Copyright (c) 2026 minimorphism
// Stories for Progress

import React, { useState, useEffect } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Progress } from "./Progress";

const meta: Meta<typeof Progress> = {
	title: "mds-ui/Progress",
	component: Progress,
	parameters: {
		layout: "centered",
		docs: {
			description: {
				component:
					"The Progress component is a high-fidelity skeuomorphic loading bar. It features dual WebGL shader layers (one for the inset track, one for the outset progress bar) and supports smooth CSS/WebGL synchronized transitions.",
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
			description:
				"Visual shader combination for the progress bar track and inner fill.",
		},
		progress: {
			control: { type: "range", min: 0, max: 100, step: 1 },
			description:
				"The current progress value (clamped between 0 and 100).",
		},
	},
	decorators: [
		(Story) => (
			<div style={{ width: "350px", padding: "40px" }}>
				<Story />
			</div>
		),
	],
};

export default meta;
type Story = StoryObj<typeof Progress>;

export const White: Story = {
	args: {
		variant: "white",
		progress: 45,
	},
};

export const Black: Story = {
	args: {
		variant: "black",
		progress: 60,
	},
};

export const Anodized: Story = {
	args: {
		variant: "anodized",
		progress: 75,
	},
};

export const DarkGray: Story = {
	args: {
		variant: "dark-gray",
		progress: 30,
	},
};

export const Animated: Story = {
	render: (args) => {
		const [progress, setProgress] = useState(10);

		useEffect(() => {
			const interval = setInterval(() => {
				setProgress((prev) => (prev >= 100 ? 0 : prev + 20));
			}, 1500);
			return () => clearInterval(interval);
		}, []);

		return <Progress {...args} progress={progress} />;
	},
	args: {
		variant: "white",
	},
};

export const States: Story = {
	render: () => (
		<div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
			<Progress variant="anodized" progress={25} />
			<Progress variant="anodized" progress={50} />
			<Progress variant="anodized" progress={75} />
			<Progress variant="anodized" progress={100} />
		</div>
	),
};
