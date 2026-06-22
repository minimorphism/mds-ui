// Copyright (c) 2026 minimorphism
// Tests for Input

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { Input } from "./Input";
import { InputLayer } from "./InputShader";
import * as WebGLStore from "../../webgl/WebGLStore";

vi.mock("../../webgl/WebGLStore", () => ({
	registerWidget: vi.fn(),
	unregisterWidget: vi.fn(),
}));

vi.mock("./Input.module.scss", () => ({
	default: {
		"mds-input-container": "mds-input-container",
		"mds-input-container--white": "mds-input-container--white",
		"mds-input-container--black": "mds-input-container--black",
		"mds-input-container--anodized": "mds-input-container--anodized",
		"mds-input-container--dark-gray": "mds-input-container--dark-gray",
		"mds-input-container--sm": "mds-input-container--sm",
		"mds-input-container--lg": "mds-input-container--lg",
		"mds-input-field": "mds-input-field",
		"mds-input-field--password": "mds-input-field--password",
		"mds-input-eye": "mds-input-eye",
	},
}));

describe("Input Component", () => {
	beforeEach(() => {
		vi.clearAllMocks();

		Element.prototype.getBoundingClientRect = vi.fn(
			() =>
				({
					width: 100,
					height: 40,
					top: 10,
					left: 20,
					bottom: 50,
					right: 120,
					x: 20,
					y: 10,
					toJSON: () => {},
				}) as DOMRect
		);
	});

	it("renders correctly with default props", () => {
		render(<Input placeholder="Type here" />);
		const input = screen.getByPlaceholderText("Type here");

		expect(input).toBeInTheDocument();
		expect(input.className).toContain("mds-input-field");
		expect(input.parentElement?.className).toContain("mds-input-container");
		expect(input.parentElement?.className).toContain(
			"mds-input-container--white"
		);
	});

	it("applies variant and size classes to container", () => {
		render(
			<Input
				variant="dark-gray"
				size="lg"
				placeholder="Large Dark Gray"
			/>
		);
		const input = screen.getByPlaceholderText("Large Dark Gray");

		expect(input.parentElement?.className).toContain(
			"mds-input-container--dark-gray"
		);
		expect(input.parentElement?.className).toContain(
			"mds-input-container--lg"
		);
	});

	it("renders eye icon when isPassword is true and toggles type", () => {
		render(<Input isPassword placeholder="Password" />);
		const input = screen.getByPlaceholderText("Password");
		expect(input).toHaveAttribute("type", "password");

		const eyeButton = screen.getByRole("button");
		fireEvent.click(eyeButton);

		expect(input).toHaveAttribute("type", "text");

		fireEvent.click(eyeButton);
		expect(input).toHaveAttribute("type", "password");
	});

	it("registers and unregisters container with WebGLStore", () => {
		const { unmount } = render(
			<Input variant="anodized" placeholder="Store Test" />
		);

		expect(WebGLStore.registerWidget).toHaveBeenCalled();
		const registerCall = vi.mocked(WebGLStore.registerWidget).mock.calls[0];
		const widgetId = registerCall[0];
		const widgetData = registerCall[1];

		expect(typeof widgetId).toBe("string");
		expect(widgetData.type).toBe("input");
		expect(widgetData.payload.variant).toBe("anodized");

		unmount();
		expect(WebGLStore.unregisterWidget).toHaveBeenCalledWith(widgetId);
	});
});

describe("InputShader (InputLayer)", () => {
	it("generates WebGL uniforms correctly", () => {
		const mockDomElement = document.createElement("div");
		mockDomElement.getBoundingClientRect = vi.fn(
			() =>
				({
					width: 150,
					height: 50,
					top: 25,
					left: 10,
					bottom: 75,
					right: 160,
					x: 10,
					y: 25,
					toJSON: () => {},
				}) as DOMRect
		);

		const mockWidget: WebGLStore.WidgetInstance = {
			id: "test-widget-1",
			type: "input",
			ref: { current: mockDomElement },
			mouse: { x: 0, y: 0, hover: 0, click: 0 },
			payload: { variant: "dark-gray", disabled: false },
			layout: {
				x: 10,
				y: 25,
				width: 150,
				height: 50,
				visualScale: 1,
				radius: 20,
			},
		};

		const mockCanvas = {
			width: 1920,
			height: 1080,
			clientWidth: 1920,
			clientHeight: 1080,
		} as unknown as HTMLCanvasElement;

		const uniforms = InputLayer.definition.getUniforms(
			mockWidget,
			mockCanvas
		);

		expect(uniforms).toBeDefined();
		expect(uniforms.u_color).toEqual(
			new Float32Array([0.61, 0.61, 0.61, 1.0])
		);
	});
});
