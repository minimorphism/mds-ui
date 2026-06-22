import { defineConfig } from "tsup";
import { sassPlugin } from "esbuild-sass-plugin";
import { glsl } from "esbuild-plugin-glsl";

export default defineConfig({
	entry: ["src/index.ts"],
	format: ["esm"],
	dts: true,
	clean: true,
	sourcemap: true,
	minify: "terser",
	splitting: true,
	treeshake: true,
	external: ["react", "react-dom"],
	target: "es2020",
	injectStyle: true,

	loader: {
		".ttf": "dataurl",
	},

	esbuildPlugins: [
		glsl({ minify: false }),

		sassPlugin({
			filter: /\.module\.scss$/,
			type: "local-css",
		}),
		sassPlugin({
			filter: /\.scss$/,
			type: "css",
		}),
	],
});
