// Copyright (c) 2026 minimorphism
// Shader part for Badge

import fragmentShader from "../@Shaders/WidgetShader.glsl";
import { buildUniforms, badgeVariantStyles } from "../@Shaders/ShaderUtils";

export const BadgeLayer = {
	type: "badge",
	definition: {
		fragmentShader,
		getUniforms: (widget: any, canvas: HTMLCanvasElement) => {
			const isAnodized = widget.payload?.variant === "anodized";

			const customStyles = isAnodized ? undefined : badgeVariantStyles;

			const shaderHeight = isAnodized ? 100.0 : 28.0;

			return buildUniforms(widget, canvas, customStyles, shaderHeight);
		},
	},
};
