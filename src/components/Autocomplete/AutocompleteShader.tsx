// Copyright (c) 2026 minimorphism
// Shader part for Autocomplete

import fragmentShader from "../@Shaders/WidgetShader.glsl";
import { buildUniforms } from "../@Shaders/ShaderUtils";

export const AutocompleteHeaderLayer = {
	type: "autocomplete-header",
	definition: {
		fragmentShader,
		getUniforms: (widget: any, canvas: HTMLCanvasElement) =>
			buildUniforms(widget, canvas),
	},
};

export const AutocompleteBodyLayer = {
	type: "autocomplete-body",
	definition: {
		fragmentShader,
		getUniforms: (widget: any, canvas: HTMLCanvasElement) =>
			buildUniforms(widget, canvas),
	},
};
