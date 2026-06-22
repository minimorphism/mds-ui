// Copyright (c) 2026 minimorphism
// Preview Widgets 

import React from "react";
import type { Preview } from "@storybook/react";
import { WebGLCanvas, initWebGL } from "../src";
import "../src/global.scss";

initWebGL();

export const parameters = {
	actions: { argTypesRegex: "^on[A-Z].*" },
	layout: "centered",
	controls: {
		expanded: true,
		matchers: {
			color: /(background|color)$/i,
			date: /Date$/i,
		},
	},
};

export const decorators = [
	(Story) => (
		<React.Fragment>
			<WebGLCanvas />
			<div style={{ position: "relative", zIndex: 1 }}>
				<Story />
			</div>
		</React.Fragment>
	),
];

export default {
	parameters,
	decorators,
} as Preview;
