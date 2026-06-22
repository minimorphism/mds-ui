// Copyright (c) 2026 minimorphism
// Stories for Typography

import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Typography } from "./Typography";

const meta: Meta<typeof Typography> = {
	title: "mds-ui/Typography",
	component: Typography,
	parameters: {
		layout: "padded",
		docs: {
			description: {
				component:
					"The Typography component is the foundational element for text rendering in **mds-ui**. This component natively supports single-file fonts by applying hardware slants and CSS stroke hacks for italics and weights.",
			},
		},
	},
	tags: ["autodocs"],
	argTypes: {
		component: {
			control: "text",
			description:
				"Overrides the default HTML node rendered by the variant.",
		},
		variant: {
			control: "select",
			description:
				"Applies the core typography styles based on the design system.",
		},
		color: {
			control: "select",
			description: "Controls the text color.",
		},
	},
};

export default meta;
type Story = StoryObj<typeof Typography>;

export const Playground: Story = {
	args: {
		variant: "body1",
		children: "This is a playground for the Typography component.",
		color: "black",
	},
};

export const Headings: Story = {
	render: () => (
		<div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
			<Typography variant="h1" weight="light">
				h1. Heading
			</Typography>
			<Typography variant="h2" weight="light">
				h2. Heading
			</Typography>
			<Typography variant="h3" weight="light">
				h3. Heading
			</Typography>
			<Typography variant="h4" weight="light">
				h4. Heading
			</Typography>
			<Typography variant="h5" weight="light">
				h5. Heading
			</Typography>
			<Typography variant="h6" weight="light">
				h6. Heading
			</Typography>
		</div>
	),
};

export const BodyAndSubtitles: Story = {
	render: () => (
		<div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
			<Typography variant="subtitle1">
				subtitle1. Medium weight, slightly smaller than body.
			</Typography>
			<Typography variant="subtitle2">
				subtitle2. Small medium weight text.
			</Typography>
			<Typography variant="body1">
				body1. Regular body text. This is the default variant for
				paragraphs and general content.
			</Typography>
			<Typography variant="body2">
				body2. Smaller body text for secondary content or dense
				interfaces.
			</Typography>
		</div>
	),
};

export const SpecialtyTexts: Story = {
	render: () => (
		<div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
			<Typography variant="caption" color="grey">
				caption. Used for image captions, annotations, or helper text.
			</Typography>
			<Typography variant="overline" color="grey">
				overline text
			</Typography>
			<Typography variant="button">button text</Typography>
			<Typography variant="link" color="primary">
				link text
			</Typography>
		</div>
	),
};

export const Weights: Story = {
	parameters: {
		docs: {
			description: {
				story: "Since the custom font has only one file, we emulate boldness using `-webkit-text-stroke` and lightness using `opacity`.",
			},
		},
	},
	render: () => (
		<div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
			<Typography variant="h3" weight="light">
				Light weight text
			</Typography>
			<Typography variant="h3" weight="normal">
				Normal weight text
			</Typography>
			<Typography variant="h3" weight="medium">
				Medium weight text
			</Typography>
			<Typography variant="h3" weight="semibold">
				Semibold weight text
			</Typography>
			<Typography variant="h3" weight="bold">
				Bold weight text
			</Typography>
		</div>
	),
};

export const TextStylesAndDecorations: Story = {
	parameters: {
		docs: {
			description: {
				story: "Italics are hardware accelerated using `oblique`, allowing slant without an italic font file. Underline and strikethrough can be combined.",
			},
		},
	},
	render: () => (
		<div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
			<Typography variant="h4" italic>
				Oblique hardware italic
			</Typography>
			<Typography variant="h4" underline>
				Underlined text
			</Typography>
			<Typography variant="h4" strikethrough>
				Strikethrough text
			</Typography>
			<Typography variant="h4" underline strikethrough>
				Combined decoration text
			</Typography>
		</div>
	),
};

export const Modifiers: Story = {
	render: () => (
		<div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
			<Typography variant="body1" transform="uppercase">
				Uppercase text
			</Typography>
			<Typography variant="body1" transform="capitalize">
				capitalized text example
			</Typography>
			<Typography variant="body1" align="center">
				Center aligned text
			</Typography>
			<div
				style={{
					width: "200px",
					background: "#f5f5f5",
					padding: "8px",
				}}
			>
				<Typography
					variant="body1"
					truncate
					title="This is a very long text that will be truncated"
				>
					This is a very long text that will be truncated
				</Typography>
			</div>
		</div>
	),
};

export const PolymorphicComponent: Story = {
	parameters: {
		docs: {
			description: {
				story: "Use the `component` prop to render a specific semantic HTML element while keeping the visual style of a variant.",
			},
		},
	},
	args: {
		variant: "h1",
		component: "p",
		children: "This looks like H1 but is rendered as a <p> tag.",
	},
};
