// Copyright (c) 2026 minimorphism
// Shader part for Progress

import fragmentShader from "../@Shaders/WidgetShader.glsl";
import { buildUniforms } from "../@Shaders/ShaderUtils";

export const ProgressLayer = {
	type: "progress",
	definition: {
		fragmentShader,
		getUniforms: (widget: any, canvas: HTMLCanvasElement) =>
			buildUniforms(widget, canvas, undefined, 50.0),
	},
};

export const ProgressInnerLayer = {
	type: "progress-inner",
	definition: {
		fragmentShader,
		getUniforms: (widget: any, canvas: HTMLCanvasElement) =>
			buildUniforms(widget, canvas, undefined, 42.0),
	},
};
