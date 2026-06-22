// Copyright (c) 2026 minimorphism
// Shader part for MobileModal

import fragmentShader from "../@Shaders/WidgetShader.glsl";
import { buildUniforms } from "../@Shaders/ShaderUtils";

export const MobileModalLayer = {
	type: "mobileModal",
	definition: {
		fragmentShader,
		getUniforms: (widget: any, canvas: HTMLCanvasElement) =>
			buildUniforms(widget, canvas, undefined, 380.0),
	},
};
