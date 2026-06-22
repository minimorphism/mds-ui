// Copyright (c) 2026 minimorphism
// Main GLSL Shader for Widgets

precision mediump float;

uniform vec2 u_resolution;
uniform vec4 u_rect;
uniform vec4 u_color;
uniform vec4 u_radius;
uniform float u_opacity;

uniform vec4 u_sh1_params;
uniform vec4 u_sh1_color;
uniform vec4 u_sh2_params;
uniform vec4 u_sh2_color;
uniform vec4 u_sh3_params;
uniform vec4 u_sh3_color;

#include "Common/SDF.glsl"
#include "Common/Shadow.glsl"

void main() {
    vec2 st = gl_FragCoord.xy;
    st.y = u_resolution.y - st.y;

    vec2 size = u_rect.zw;
    vec2 b = size * 0.5;
    vec2 center = u_rect.xy + b;
    vec2 p = st - center;

    float d = sdRoundedBox(p, b, u_radius);
    float alpha = 1.0 - smoothstep(-1.0, 1.0, d);
    
    alpha *= u_opacity;

    if (alpha <= 0.0) {
        discard;
    }

    vec4 col = u_color;
    
    col = applyInsetShadow(col, p, b, u_radius, u_sh3_params, u_sh3_color);
    col = applyInsetShadow(col, p, b, u_radius, u_sh2_params, u_sh2_color);
    col = applyInsetShadow(col, p, b, u_radius, u_sh1_params, u_sh1_color);

    gl_FragColor = vec4(col.rgb * alpha, alpha);
}