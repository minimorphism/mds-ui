/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import glsl from "vite-plugin-glsl";

export default defineConfig({
	plugins: [
		react(),
		glsl(),
		{
			name: "glsl-mock-plugin",
			enforce: "pre",
			transform(code, id) {
				if (id.endsWith(".glsl")) {
					return 'export default "mocked-fragment-shader-code";';
				}
			},
		},
	],
	css: {
		preprocessorOptions: {
			scss: {
				api: "modern-compiler",
			},
			sass: {
				api: "modern-compiler",
			},
		},
	},
	test: {
		globals: true,
		environment: "jsdom",
		setupFiles: "./src/setupTests.ts",
		css: true,
	},
});
