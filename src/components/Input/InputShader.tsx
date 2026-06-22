// Copyright (c) 2026 minimorphism
// Shader part for Input

import fragmentShader from "../@Shaders/WidgetShader.glsl";
import { buildUniforms } from "../@Shaders/ShaderUtils";

export const InputLayer = {
    type: "input",
    definition: {
        fragmentShader,
        getUniforms: (widget: any, canvas: HTMLCanvasElement) => {
            const variant = widget.payload?.variant;
            const isMultiline = widget.payload?.multiline;
            
            const baseScaleHeight = (variant === "black" && isMultiline) ? 180.0 : 60.0;
            
            return buildUniforms(widget, canvas, undefined, baseScaleHeight);
        }
    },
};
