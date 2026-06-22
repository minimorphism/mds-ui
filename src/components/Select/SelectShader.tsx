// Copyright (c) 2026 minimorphism
// Shader part for Select

import fragmentShader from "../@Shaders/WidgetShader.glsl";
import { buildUniforms } from "../@Shaders/ShaderUtils";

export const SelectHeaderLayer = {
	type: "select-header",
	definition: {
		fragmentShader,
		getUniforms: (widget: any, canvas: HTMLCanvasElement) =>
			buildUniforms(widget, canvas),
	},
};

export const SelectBodyLayer = {
	type: "select-body",
	definition: {
		fragmentShader,
		getUniforms: (widget: any, canvas: HTMLCanvasElement) =>
			buildUniforms(widget, canvas),
	},
};