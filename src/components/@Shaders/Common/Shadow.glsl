// Copyright (c) 2026 minimorphism
// Shadow Shader

vec4 applyInsetShadow(vec4 baseCol, vec2 p, vec2 b, vec4 r, vec4 params,
		      vec4 shColor) {
    if (shColor.a <= 0.0) return baseCol;

    vec2 offset = params.xy;
    float blur = params.z;
    float spread = params.w;

    float d_inner = sdRoundedBox(p - offset, b, r);
    float d = d_inner + spread;

    float halfBlur = max(blur * 0.5, 0.5);
    float intensity = smoothstep(-halfBlur, halfBlur, d);

    return vec4(mix(baseCol.rgb, shColor.rgb, intensity * shColor.a),
		baseCol.a);
}
