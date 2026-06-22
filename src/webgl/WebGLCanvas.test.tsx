// Copyright (c) 2026 minimorphism
// Tests for WebGL Canvas

import React from "react";
import { render } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { WebGLCanvas } from "./WebGLCanvas";

const mockGl = {
	createBuffer: vi.fn(),
	bindBuffer: vi.fn(),
	bufferData: vi.fn(),
	disable: vi.fn(),
	bindFramebuffer: vi.fn(),
	viewport: vi.fn(),
	clearColor: vi.fn(),
	clear: vi.fn(),
	enable: vi.fn(),
	blendFunc: vi.fn(),
	useProgram: vi.fn(),
	getAttribLocation: vi.fn(() => 0),
	enableVertexAttribArray: vi.fn(),
	vertexAttribPointer: vi.fn(),
	getUniformLocation: vi.fn(() => ({})),
	uniform1f: vi.fn(),
	uniform2fv: vi.fn(),
	uniform4fv: vi.fn(),
	drawArrays: vi.fn(),
};

describe("WebGLCanvas Component", () => {
	let consoleWarnSpy: any;

	beforeEach(() => {
		HTMLCanvasElement.prototype.getContext = vi
			.fn()
			.mockReturnValue(mockGl);
		consoleWarnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
	});

	afterEach(() => {
		consoleWarnSpy.mockRestore();
	});

	it("mounts and renders the canvas portal inside document.body", () => {
		const { unmount } = render(<WebGLCanvas />);

		const canvas = document.body.querySelector("canvas");
		expect(canvas).toBeInTheDocument();
		expect(canvas).toHaveStyle({ position: "fixed", inset: "0" });

		unmount();
		expect(document.body.querySelector("canvas")).not.toBeInTheDocument();
	});

	it("respects the Singleton pattern and warns on duplicate mounts", () => {
		const { unmount: unmount1 } = render(<WebGLCanvas />);
		const { unmount: unmount2 } = render(<WebGLCanvas />);

		expect(consoleWarnSpy).toHaveBeenCalledWith(
			expect.stringContaining("WebGLCanvas is a singleton")
		);

		const canvases = document.body.querySelectorAll("canvas");
		expect(canvases.length).toBe(1);

		unmount1();
		unmount2();
	});

	it("resets the singleton flag on unmount to allow future mounts", () => {
		const { unmount } = render(<WebGLCanvas />);
		expect(document.body.querySelector("canvas")).toBeInTheDocument();

		unmount();
		expect(document.body.querySelector("canvas")).not.toBeInTheDocument();

		render(<WebGLCanvas />);
		expect(consoleWarnSpy).not.toHaveBeenCalled();
		expect(document.body.querySelector("canvas")).toBeInTheDocument();
	});
});
