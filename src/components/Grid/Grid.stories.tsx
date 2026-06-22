// Copyright (c) 2026 minimorphism
// Stories for Grid

import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Grid } from "./Grid";

const meta: Meta<typeof Grid> = {
	title: "mds-ui/Grid",
	component: Grid,
	parameters: {
		layout: "centered",
		docs: {
			description: {
				component:
					"The Grid component is an interactive WebGL-backed layout container. It is typically used to group elements together in a grid or flex structure, featuring dynamic shaders and hover states.",
			},
			story: {
				inline: false,
				iframeHeight: 300,
			},
		},
	},
	tags: ["autodocs"],
	argTypes: {
		variant: {
			control: "select",
			options: ["white", "black", "anodized"],
			description: "Visual shader combination for the grid background.",
		},
		disabled: {
			control: "boolean",
			description:
				"If true, disables interaction and applies the disabled style.",
		},
	},
	decorators: [
		(Story) => (
			<div style={{ padding: "40px", width: "100%", maxWidth: "600px" }}>
				<Story />
			</div>
		),
	],
};

export default meta;
type Story = StoryObj<typeof Grid>;

const MockCell = ({ title, desc }: { title: string; desc: string }) => (
	<div
		style={{
			padding: "24px",
			display: "flex",
			flexDirection: "column",
			gap: "8px",
		}}
	>
		<span
			style={{
				fontWeight: "light",
				fontSize: "1.2rem",
				fontFamily: '"minimorphism", sans-serif',
			}}
		>
			{title}
		</span>
		<span
			style={{
				opacity: 0.6,
				fontSize: "0.9rem",
				fontFamily: '"minimorphism", sans-serif',
			}}
		>
			{desc}
		</span>
	</div>
);

const gridStyle: React.CSSProperties = {
	display: "grid",
	gridTemplateColumns: "1fr 1fr",
	gap: "16px",
	width: "100%",
	padding: "16px",
};

export const White: Story = {
	args: {
		variant: "white",
		style: gridStyle,
		children: (
			<>
				<MockCell title="Analytics" desc="Real-time data metrics" />
				<MockCell title="Reports" desc="Weekly PDF summaries" />
				<MockCell title="Security" desc="End-to-end encryption" />
				<MockCell title="Settings" desc="Manage your preferences" />
			</>
		),
	},
};

export const Black: Story = {
	args: {
		variant: "black",
		style: { ...gridStyle, color: "white" },
		children: (
			<>
				<MockCell title="Dark Node" desc="Decentralized network" />
				<MockCell title="Ledger" desc="Immutable records" />
			</>
		),
	},
};

export const Anodized: Story = {
	args: {
		variant: "anodized",
		style: gridStyle,
		children: (
			<>
				<MockCell title="Hardware" desc="Physical device status" />
				<MockCell title="Firmware" desc="v2.1.4 up to date" />
			</>
		),
	},
};
