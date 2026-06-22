// Copyright (c) 2026 minimorphism
// main.ts for StoryBook

import type { StorybookConfig } from "@storybook/react-vite";
import path from "path";
import { fileURLToPath } from "url";
import glsl from "vite-plugin-glsl";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const config: StorybookConfig = {
	stories: ["../src/**/*.stories.@(js|jsx|ts|tsx)"],
	addons: ["@storybook/addon-docs"],

	framework: {
		name: "@storybook/react-vite",
		options: {
			strictMode: false,
		},
	},

	typescript: {
		reactDocgen: "react-docgen",
	},

	async viteFinal(config) {
		config.plugins = [...(config.plugins || []), glsl()];
		config.css = {
			...config.css,
			preprocessorOptions: {
				...config.css?.preprocessorOptions,
				scss: { api: "modern-compiler" },
				sass: { api: "modern-compiler" },
			},
		};
		return config;
	},
};

export default config;
