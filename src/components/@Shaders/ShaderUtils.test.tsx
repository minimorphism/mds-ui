// Copyright (c) 2026 minimorphism
// Tests for ShaderUtils

import { describe, it, expect } from "vitest";
import {
	buildUniforms,
	globalVariantStyles,
	badgeVariantStyles,
} from "./ShaderUtils";
import type { WidgetInstance } from "../../webgl/WebGLStore";

describe("ShaderUtils - buildUniforms", () => {
	const createMockWidget = (
		overrides: Partial<WidgetInstance> = {}
	): WidgetInstance => {
		const baseWidget: WidgetInstance = {
			id: "test-widget",
			type: "button",
			ref: { current: null },
			mouse: { x: 0, y: 0, hover: 0, click: 0 },
			payload: { variant: "white", disabled: false },
			layout: {
				x: 10,
				y: 20,
				width: 100,
				height: 50,
				visualScale: 1,
				radius: 8,
				opacity: 0.9,
			},
		};

		return {
			...baseWidget,
			...overrides,
			payload: { ...baseWidget.payload, ...overrides.payload },
			layout: { ...baseWidget.layout, ...overrides.layout },
		};
	};

	const mockCanvas = {
		width: 1000,
		clientWidth: 500,
		height: 800,
	} as unknown as HTMLCanvasElement;

	it("correctly generates complete structure of WebGL uniforms", () => {
		const widget = createMockWidget();
		const uniforms = buildUniforms(widget, mockCanvas);

		expect(uniforms).toBeDefined();
		expect(uniforms.u_resolution).toBeInstanceOf(Float32Array);
		expect(uniforms.u_box).toBeInstanceOf(Float32Array);
		expect(uniforms.u_rect).toBeInstanceOf(Float32Array);
		expect(uniforms.u_color).toBeInstanceOf(Float32Array);
		expect(uniforms.u_radius).toBeInstanceOf(Float32Array);
		expect(uniforms.u_opacity).toBe(0.9);
		expect(uniforms.u_sh1_params).toBeInstanceOf(Float32Array);
		expect(uniforms.u_sh1_color).toBeInstanceOf(Float32Array);
	});

	it("accurately calculates DPR, mult scaling, PADDING and u_box dimensions", () => {
		const widget = createMockWidget({
			layout: {
				x: 10,
				y: 20,
				width: 100,
				height: 50,
				visualScale: 1,
				radius: 8,
			},
		});

		const uniforms = buildUniforms(widget, mockCanvas, undefined, 50.0);

		expect(uniforms.u_box).toEqual(new Float32Array([-60, -50, 240, 190]));
	});

	it("resolves to disabled variant styles when payload.disabled is true", () => {
		const widget = createMockWidget({
			payload: { variant: "white", disabled: true },
		});
		const uniforms = buildUniforms(widget, mockCanvas);

		const expectedBg = globalVariantStyles.disabled.bg;
		expect(uniforms.u_color).toEqual(new Float32Array(expectedBg));
	});

	it("safely falls back to default styles when variant is invalid or missing", () => {
		const widget = createMockWidget({
			payload: { variant: "non-existent-theme" },
		});
		const uniforms = buildUniforms(widget, mockCanvas);

		const expectedBg = globalVariantStyles.white.bg;
		expect(uniforms.u_color).toEqual(new Float32Array(expectedBg));
	});

	it("utilizes custom styles mapping when customVariants parameter is provided", () => {
		const widget = createMockWidget({
			payload: { variant: "custom-theme" },
		});

		const customStyles = {
			"custom-theme": {
				bg: [0.1, 0.2, 0.3, 0.4] as [number, number, number, number],
				shadows: [] as any,
			},
		};

		const uniforms = buildUniforms(widget, mockCanvas, customStyles);
		expect(uniforms.u_color).toEqual(
			new Float32Array([0.1, 0.2, 0.3, 0.4])
		);
	});

	it("reorders array-based layout radius to match WebGL requirements", () => {
		const widget = createMockWidget({
			layout: {
				x: 10,
				y: 20,
				width: 100,
				height: 50,
				visualScale: 1,
				radius: [8, 12, 16, 20],
			},
		});

		const uniforms = buildUniforms(widget, mockCanvas);
		expect(uniforms.u_radius).toEqual(new Float32Array([16, 12, 20, 8]));
	});

	it("converts single-number layout radius to a 4-component uniform array", () => {
		const widget = createMockWidget({
			layout: {
				x: 10,
				y: 20,
				width: 100,
				height: 50,
				visualScale: 1,
				radius: 15,
			},
		});

		const uniforms = buildUniforms(widget, mockCanvas);
		expect(uniforms.u_radius).toEqual(new Float32Array([15, 15, 15, 15]));
	});

	it("defaults u_opacity to 1.0 if layout.opacity is undefined", () => {
		const widget = createMockWidget({
			layout: {
				x: 10,
				y: 20,
				width: 100,
				height: 50,
				visualScale: 1,
				radius: 8,
				opacity: undefined,
			},
		});

		const uniforms = buildUniforms(widget, mockCanvas);
		expect(uniforms.u_opacity).toBe(1.0);
	});
});
