// Copyright (c) 2026 minimorphism
// Shader part for Alert

import fragmentShader from "../@Shaders/WidgetShader.glsl";
import { buildUniforms } from "../@Shaders/ShaderUtils";

export const AlertLayer = {
	type: "alert",
	definition: {
		fragmentShader,
		getUniforms: (widget: any, canvas: HTMLCanvasElement) =>
			buildUniforms(widget, canvas),
	},
};
