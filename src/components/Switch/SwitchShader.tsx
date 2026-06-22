// Copyright (c) 2026 minimorphism
// Shader part for Switch

import fragmentShader from "../@Shaders/WidgetShader.glsl";
import { buildUniforms } from "../@Shaders/ShaderUtils";

export const SwitchLayer = {
	type: "switch",
	definition: {
		fragmentShader,
		getUniforms: (widget: any, canvas: HTMLCanvasElement) =>
			buildUniforms(widget, canvas, undefined, 32.0),
	},
};
