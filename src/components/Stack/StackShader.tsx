// Copyright (c) 2026 minimorphism
// Shader part for Stack

import fragmentShader from "../@Shaders/WidgetShader.glsl";
import { buildUniforms } from "../@Shaders/ShaderUtils";

export const StackLayer = {
	type: "stack",
	definition: {
		fragmentShader,
		getUniforms: (widget: any, canvas: HTMLCanvasElement) =>
			buildUniforms(widget, canvas),
	},
};
