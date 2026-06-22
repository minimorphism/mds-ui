// Copyright (c) 2026 minimorphism
// Tests for WebGL Store

import { describe, it, expect, vi, beforeEach } from "vitest";
import {
	initWebGL,
	registerWidget,
	unregisterWidget,
	widgetRegistry,
	layerDefinitions,
	setRegistryChangeListener,
	type WidgetInstance,
} from "./WebGLStore";

describe("WebGLStore", () => {
	beforeEach(() => {
		widgetRegistry.clear();
		layerDefinitions.clear();
		setRegistryChangeListener(() => {});
	});

	it("registers standard layers on initWebGL by default", () => {
		expect(layerDefinitions.size).toBe(0);

		initWebGL();

		expect(layerDefinitions.has("button")).toBe(true);
		expect(layerDefinitions.has("input")).toBe(true);
		expect(layerDefinitions.has("box")).toBe(true);
		expect(layerDefinitions.has("modal")).toBe(true);
		expect(layerDefinitions.size).toBeGreaterThan(15);
	});

	it("registers custom layers on initWebGL", () => {
		const mockCustomLayer = {
			type: "custom-layer",
			definition: {
				fragmentShader: "void main() {}",
				getUniforms: vi.fn(),
			},
		};

		initWebGL([mockCustomLayer]);

		expect(layerDefinitions.has("custom-layer")).toBe(true);
		expect(layerDefinitions.get("custom-layer")?.fragmentShader).toBe(
			"void main() {}"
		);
	});

	it("adds widget and triggers listener on registerWidget", () => {
		const listener = vi.fn();
		setRegistryChangeListener(listener);

		const mockWidget: WidgetInstance = {
			id: "test-widget",
			type: "button",
			ref: { current: document.createElement("div") },
			mouse: { x: 0, y: 0, hover: 0, click: 0 },
			payload: {},
			layout: {
				x: 0,
				y: 0,
				width: 100,
				height: 40,
				visualScale: 1,
				radius: 10,
			},
		};

		registerWidget("test-widget", mockWidget);

		expect(widgetRegistry.has("test-widget")).toBe(true);
		expect(widgetRegistry.get("test-widget")?.mountOrder).toBeDefined();
		expect(listener).toHaveBeenCalledTimes(1);
	});

	it("removes widget and triggers listener on unregisterWidget", () => {
		const listener = vi.fn();
		setRegistryChangeListener(listener);

		const mockWidget: WidgetInstance = {
			id: "test-widget",
			type: "button",
			ref: { current: document.createElement("div") },
			mouse: { x: 0, y: 0, hover: 0, click: 0 },
			payload: {},
			layout: {
				x: 0,
				y: 0,
				width: 100,
				height: 40,
				visualScale: 1,
				radius: 10,
			},
		};

		registerWidget("test-widget", mockWidget);
		expect(widgetRegistry.size).toBe(1);

		unregisterWidget("test-widget");

		expect(widgetRegistry.size).toBe(0);
		expect(listener).toHaveBeenCalledTimes(2);
	});
});
