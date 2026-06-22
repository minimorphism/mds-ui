// Copyright (c) 2026 minimorphism
// WebGL Store

import React from "react";
import fragmentShader from "../components/@Shaders/WidgetShader.glsl";
import {
	buildUniforms,
	badgeVariantStyles,
} from "../components/@Shaders/ShaderUtils";

export type MouseState = { x: number; y: number; hover: number; click: number };

export type WidgetLayout = {
	x: number;
	y: number;
	width: number;
	height: number;
	visualScale: number;
	radius: number | [number, number, number, number];
	zIndex?: number;
	opacity?: number;
};

export type WidgetInstance = {
	id: string;
	type: string;
	ref: React.RefObject<HTMLElement | null>;
	mouse: MouseState;
	payload: any;
	layout: WidgetLayout;
	mountOrder?: number;
};

export type LayerDefinition = {
	fragmentShader: string;
	getUniforms: (
		widget: WidgetInstance,
		canvas: HTMLCanvasElement
	) => Record<string, any> | null;
};

export const widgetRegistry = new Map<string, WidgetInstance>();
export const layerDefinitions = new Map<string, LayerDefinition>();

let nextMountOrder = 1;

export let onRegistryChange = () => {};
export const setRegistryChangeListener = (cb: () => void) => {
	onRegistryChange = cb;
};

export const initWebGL = (
	customLayers?: { type: string; definition: LayerDefinition }[]
) => {
	const standardLayers = [
		{
			type: "button",
			definition: {
				fragmentShader,
				getUniforms: (w: WidgetInstance, c: HTMLCanvasElement) =>
					buildUniforms(w, c),
			},
		},
		{
			type: "input",
			definition: {
				fragmentShader,
				getUniforms: (w: WidgetInstance, c: HTMLCanvasElement) => {
					const variant = w.payload?.variant;
					const isMultiline = w.payload?.multiline;
					const baseScaleHeight =
						variant === "black" && isMultiline ? 180.0 : 60.0;
					return buildUniforms(w, c, undefined, baseScaleHeight);
				},
			},
		},
		{
			type: "box",
			definition: {
				fragmentShader,
				getUniforms: (w: WidgetInstance, c: HTMLCanvasElement) =>
					buildUniforms(w, c),
			},
		},
		{
			type: "snackbar",
			definition: {
				fragmentShader,
				getUniforms: (w: WidgetInstance, c: HTMLCanvasElement) =>
					buildUniforms(w, c),
			},
		},
		{
			type: "mobileModal",
			definition: {
				fragmentShader,
				getUniforms: (w: WidgetInstance, c: HTMLCanvasElement) =>
					buildUniforms(w, c, undefined, 380.0),
			},
		},
		{
			type: "accordion-header",
			definition: {
				fragmentShader,
				getUniforms: (w: WidgetInstance, c: HTMLCanvasElement) =>
					buildUniforms(w, c),
			},
		},
		{
			type: "accordion-body",
			definition: {
				fragmentShader,
				getUniforms: (w: WidgetInstance, c: HTMLCanvasElement) =>
					buildUniforms(w, c),
			},
		},
		{
			type: "autocomplete-header",
			definition: {
				fragmentShader,
				getUniforms: (w: WidgetInstance, c: HTMLCanvasElement) =>
					buildUniforms(w, c),
			},
		},
		{
			type: "autocomplete-body",
			definition: {
				fragmentShader,
				getUniforms: (w: WidgetInstance, c: HTMLCanvasElement) =>
					buildUniforms(w, c),
			},
		},
		{
			type: "alert",
			definition: {
				fragmentShader,
				getUniforms: (w: WidgetInstance, c: HTMLCanvasElement) =>
					buildUniforms(w, c),
			},
		},
		{
			type: "card",
			definition: {
				fragmentShader,
				getUniforms: (w: WidgetInstance, c: HTMLCanvasElement) =>
					buildUniforms(w, c),
			},
		},
		{
			type: "grid",
			definition: {
				fragmentShader,
				getUniforms: (w: WidgetInstance, c: HTMLCanvasElement) =>
					buildUniforms(w, c),
			},
		},
		{
			type: "badge",
			definition: {
				fragmentShader,
				getUniforms: (w: WidgetInstance, c: HTMLCanvasElement) => {
					const isAnodized = w.payload?.variant === "anodized";
					const customStyles = isAnodized
						? undefined
						: badgeVariantStyles;
					const shaderHeight = isAnodized ? 100.0 : 28.0;
					return buildUniforms(w, c, customStyles, shaderHeight);
				},
			},
		},
		{
			type: "chip",
			definition: {
				fragmentShader,
				getUniforms: (w: WidgetInstance, c: HTMLCanvasElement) =>
					buildUniforms(w, c),
			},
		},
		{
			type: "select-header",
			definition: {
				fragmentShader,
				getUniforms: (w: WidgetInstance, c: HTMLCanvasElement) =>
					buildUniforms(w, c),
			},
		},
		{
			type: "select-body",
			definition: {
				fragmentShader,
				getUniforms: (w: WidgetInstance, c: HTMLCanvasElement) =>
					buildUniforms(w, c),
			},
		},
		{
			type: "link",
			definition: {
				fragmentShader,
				getUniforms: (w: WidgetInstance, c: HTMLCanvasElement) =>
					buildUniforms(w, c),
			},
		},
		{
			type: "stack",
			definition: {
				fragmentShader,
				getUniforms: (w: WidgetInstance, c: HTMLCanvasElement) =>
					buildUniforms(w, c),
			},
		},
		{
			type: "modal",
			definition: {
				fragmentShader,
				getUniforms: (w: WidgetInstance, c: HTMLCanvasElement) =>
					buildUniforms(w, c, undefined, 240.0),
			},
		},
		{
			type: "progress",
			definition: {
				fragmentShader,
				getUniforms: (w: WidgetInstance, c: HTMLCanvasElement) =>
					buildUniforms(w, c, undefined, 50.0),
			},
		},
		{
			type: "progress-inner",
			definition: {
				fragmentShader,
				getUniforms: (w: WidgetInstance, c: HTMLCanvasElement) =>
					buildUniforms(w, c, undefined, 42.0),
			},
		},
		{
			type: "slider",
			definition: {
				fragmentShader,
				getUniforms: (w: WidgetInstance, c: HTMLCanvasElement) =>
					buildUniforms(w, c),
			},
		},
		{
			type: "slider-thumb",
			definition: {
				fragmentShader,
				getUniforms: (w: WidgetInstance, c: HTMLCanvasElement) =>
					buildUniforms(w, c),
			},
		},
		{
			type: "switch",
			definition: {
				fragmentShader,
				getUniforms: (w: WidgetInstance, c: HTMLCanvasElement) =>
					buildUniforms(w, c, undefined, 32.0),
			},
		},
	];

	standardLayers.forEach((layer) => {
		layerDefinitions.set(layer.type, layer.definition);
	});

	if (customLayers) {
		customLayers.forEach((layer) => {
			layerDefinitions.set(layer.type, layer.definition);
		});
	}
};

export const registerWidget = (id: string, instance: WidgetInstance) => {
	const existing = widgetRegistry.get(id);
	instance.mountOrder = existing?.mountOrder ?? nextMountOrder++;
	widgetRegistry.set(id, instance);
	onRegistryChange();
};

export const unregisterWidget = (id: string) => {
	widgetRegistry.delete(id);
	onRegistryChange();
};
