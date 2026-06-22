// Copyright (c) 2026 minimorphism
// Shader Utilities

import { WidgetInstance } from "../../webgl/WebGLStore";

export type InsetShadow = {
	x: number;
	y: number;
	blur: number;
	spread: number;
	color: [number, number, number, number];
};
export type VariantConfig = {
	bg: [number, number, number, number];
	shadows: [InsetShadow?, InsetShadow?, InsetShadow?];
};

export const globalVariantStyles: Record<string, VariantConfig> = {
	black: {
		bg: [0.0, 0.0, 0.0, 1.0],
		shadows: [
			{
				x: 0,
				y: 83,
				blur: 119,
				spread: -92,
				color: [1.0, 1.0, 1.0, 0.35],
			},
			{
				x: 0,
				y: -79,
				blur: 94.8,
				spread: -24,
				color: [0.0, 0.0, 0.0, 0.5],
			},
			{
				x: 0,
				y: 0,
				blur: 24,
				spread: 5,
				color: [120 / 255, 120 / 255, 120 / 255, 0.03],
			},
		],
	},
	white: {
		bg: [1.0, 1.0, 1.0, 1.0],
		shadows: [
			{ x: 0, y: 0, blur: 0, spread: 0, color: [1.0, 1.0, 1.0, 0.0] },
			{
				x: 0,
				y: -20,
				blur: 47.3,
				spread: -31,
				color: [0.0, 0.0, 0.0, 0.17],
			},
			{
				x: 0,
				y: 0,
				blur: 24,
				spread: 5,
				color: [120 / 255, 120 / 255, 120 / 255, 0.07],
			},
		],
	},
	"dark-gray": {
		bg: [0.61, 0.61, 0.61, 1.0],
		shadows: [
			{
				x: 0,
				y: 83,
				blur: 120,
				spread: -72,
				color: [0.3, 0.3, 0.3, 0.2],
			},
			{
				x: 0,
				y: -79,
				blur: 94.8,
				spread: -24,
				color: [0.0, 0.0, 0.0, 0.8],
			},
			{
				x: 0,
				y: 0,
				blur: 24,
				spread: 5,
				color: [120 / 255, 120 / 255, 120 / 255, 0.03],
			},
		],
	},
	anodized: {
		bg: [1.0, 1.0, 1.0, 1.0],
		shadows: [
			{
				x: 0,
				y: 83,
				blur: 119,
				spread: -92,
				color: [1.0, 1.0, 1.0, 0.3],
			},
			{
				x: 0,
				y: -26,
				blur: 94.8,
				spread: -24,
				color: [0.0, 0.0, 0.0, 0.35],
			},
			{
				x: 0,
				y: -2,
				blur: 24,
				spread: 5,
				color: [120 / 255, 120 / 255, 120 / 255, 0.15],
			},
		],
	},
	disabled: {
		bg: [0.5, 0.5, 0.5, 1.0],
		shadows: [
			{
				x: 0,
				y: 83,
				blur: 119,
				spread: -92,
				color: [1.0, 1.0, 1.0, 0.3],
			},
			{
				x: 0,
				y: -79,
				blur: 94.8,
				spread: -24,
				color: [0.0, 0.0, 0.0, 0.4],
			},
			{
				x: 0,
				y: 0,
				blur: 24,
				spread: 5,
				color: [120 / 255, 120 / 255, 120 / 255, 0.03],
			},
		],
	},
	"black-pill": {
		bg: [0.0, 0.0, 0.0, 1.0],
		shadows: [
			{
				x: 0,
				y: 83,
				blur: 119,
				spread: -92,
				color: [1.0, 1.0, 1.0, 0.35],
			},
			{
				x: 0,
				y: -79,
				blur: 94.8,
				spread: -24,
				color: [0.0, 0.0, 0.0, 0.5],
			},
		],
	},
	"white-pill": {
		bg: [0.82, 0.82, 0.84, 1.0],
		shadows: [
			{
				x: 0,
				y: 40,
				blur: 60,
				spread: -30,
				color: [1.0, 1.0, 1.0, 0.95],
			},
			{
				x: 0,
				y: -40,
				blur: 60,
				spread: -20,
				color: [0.0, 0.0, 0.0, 0.45],
			},
		],
	},
};

export const badgeVariantStyles: Record<string, VariantConfig> = {
	black: {
		bg: [0.0, 0.0, 0.0, 1.0],
		shadows: [
			{ x: 0, y: 4, blur: 15, spread: -10, color: [1.0, 1.0, 1.0, 0.35] },
			{ x: 0, y: -4, blur: 10, spread: -4, color: [0.0, 0.0, 0.0, 0.5] },
		],
	},
	white: {
		bg: [1.0, 1.0, 1.0, 1.0],
		shadows: [
			{ x: 0, y: -4, blur: 10, spread: -6, color: [0.0, 0.0, 0.0, 0.15] },
		],
	},
	anodized: {
		bg: [1.0, 1.0, 1.0, 1.0],
		shadows: [
			{ x: 0, y: 8, blur: 12, spread: -6, color: [1.0, 1.0, 1.0, 0.9] },
			{ x: 0, y: -8, blur: 12, spread: -4, color: [0.0, 0.0, 0.0, 0.4] },
		],
	},
};

export const buildUniforms = (
	widget: WidgetInstance,
	canvas: HTMLCanvasElement,
	customVariants?: Record<string, VariantConfig>,
	baseScaleHeight: number = 60.0
) => {
	const { layout, payload } = widget;
	const isDisabled = payload.disabled as boolean;
	const variant = isDisabled
		? "disabled"
		: (payload.variant as string) || "white";

	const variants = customVariants || globalVariantStyles;
	let config = variants[variant];

	if (!config)
		config = globalVariantStyles[variant] || globalVariantStyles["white"];

	const dpr =
		canvas.width / canvas.clientWidth || window.devicePixelRatio || 1;

	const shapeScale =
		Math.min(layout.width, layout.height) / (baseScaleHeight * dpr);
	const mult = layout.visualScale * shapeScale;

	const PADDING = 140 * mult;
	const u_box = new Float32Array([
		layout.x - PADDING,
		layout.y - PADDING,
		layout.width + PADDING * 2,
		layout.height + PADDING * 2,
	]);

	const getSh = (sh: InsetShadow | undefined) => {
		if (!sh) return { p: new Float32Array(4), c: new Float32Array(4) };
		return {
			p: new Float32Array([
				sh.x * mult,
				sh.y * mult,
				sh.blur * mult,
				sh.spread * mult,
			]),
			c: new Float32Array(sh.color),
		};
	};

	const sh1 = getSh(config.shadows[0]);
	const sh2 = getSh(config.shadows[1]);
	const sh3 = getSh(config.shadows[2]);

	return {
		u_resolution: new Float32Array([canvas.width, canvas.height]),
		u_box,
		u_rect: new Float32Array([
			layout.x,
			layout.y,
			layout.width,
			layout.height,
		]),
		u_color: new Float32Array(config.bg),
		u_radius: Array.isArray(layout.radius)
			? new Float32Array([
					layout.radius[2],
					layout.radius[1],
					layout.radius[3],
					layout.radius[0],
				])
			: new Float32Array([
					layout.radius,
					layout.radius,
					layout.radius,
					layout.radius,
				]),
		u_opacity: layout.opacity ?? 1.0,
		u_sh1_params: sh1.p,
		u_sh1_color: sh1.c,
		u_sh2_params: sh2.p,
		u_sh2_color: sh2.c,
		u_sh3_params: sh3.p,
		u_sh3_color: sh3.c,
	};
};
