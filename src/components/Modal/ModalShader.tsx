// Copyright (c) 2026 minimorphism
// Shader part for Modal

import fragmentShader from "../@Shaders/WidgetShader.glsl";
import { buildUniforms } from "../@Shaders/ShaderUtils";

export const ModalLayer = {
	type: "modal",
	definition: {
		fragmentShader,
		getUniforms: (widget: any, canvas: HTMLCanvasElement) =>
			buildUniforms(widget, canvas, undefined, 240.0),
	},
};
