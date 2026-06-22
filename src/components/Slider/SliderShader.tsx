// Copyright (c) 2026 minimorphism
// Shaders part for Slider

import fragmentShader from "../@Shaders/WidgetShader.glsl";
import { buildUniforms } from "../@Shaders/ShaderUtils";

export const SliderLayer = {
	type: "slider",
	definition: {
		fragmentShader,
		getUniforms: (widget: any, canvas: HTMLCanvasElement) =>
			buildUniforms(widget, canvas),
	},
};

export const SliderThumbLayer = {
	type: "slider-thumb",
	definition: {
		fragmentShader,
		getUniforms: (widget: any, canvas: HTMLCanvasElement) =>
			buildUniforms(widget, canvas),
	},
};
