// Copyright (c) 2026 minimorphism
// Shader part for Snackbar

import fragmentShader from "../@Shaders/WidgetShader.glsl";
import { buildUniforms } from "../@Shaders/ShaderUtils";

export const SnackbarLayer = {
	type: "snackbar",
	definition: {
		fragmentShader,
		getUniforms: (widget: any, canvas: HTMLCanvasElement) =>
			buildUniforms(widget, canvas),
	},
};
