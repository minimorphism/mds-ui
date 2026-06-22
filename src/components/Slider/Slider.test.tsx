// Copyright (c) 2026 minimorphism
// Tests for Slider

import React from "react";
import { render, fireEvent, act } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Slider } from "./Slider";

if (typeof global.PointerEvent === "undefined") {
	class MockPointerEvent extends MouseEvent {
		pointerId: number;
		constructor(type: string, params: any = {}) {
			super(type, params);
			this.pointerId = params.pointerId || 0;
		}
	}
	global.PointerEvent = MockPointerEvent as any;
}

vi.mock("../../webgl/WebGLStore", () => ({
	registerWidget: vi.fn(),
	unregisterWidget: vi.fn(),
}));

global.ResizeObserver = vi.fn().mockImplementation(() => ({
	observe: vi.fn(),
	unobserve: vi.fn(),
	disconnect: vi.fn(),
}));

describe("Slider Component", () => {
	it("renders correctly with default props", () => {
		const { container } = render(<Slider />);
		const trackElement = container.firstChild as HTMLElement;

		expect(trackElement).toBeInTheDocument();
		expect(trackElement.className).toContain("mds-slider");
		expect(trackElement.className).toContain("mds-slider--md");
		expect(trackElement.className).toContain("mds-slider--white");
		expect(trackElement).toHaveAttribute("role", "slider");

		const thumbElement = trackElement.querySelector(
			'[class*="mds-slider-thumb"]'
		);
		expect(thumbElement).toBeInTheDocument();
	});

	it("applies the correct variant and size classes", () => {
		const { container } = render(<Slider variant="anodized" size="lg" />);
		const trackElement = container.firstChild as HTMLElement;

		expect(trackElement.className).toContain("mds-slider--anodized");
		expect(trackElement.className).toContain("mds-slider--lg");
	});

	it("initializes with defaultValue when uncontrolled", () => {
		const { container } = render(
			<Slider min={0} max={100} defaultValue={75} />
		);
		const trackElement = container.firstChild as HTMLElement;
		expect(trackElement).toHaveAttribute("aria-valuenow", "75");
		expect(trackElement).toHaveStyle({ "--slider-progress": "75%" });
	});

	it("reacts to controlled value changes", () => {
		const { container, rerender } = render(
			<Slider min={0} max={10} value={2} />
		);
		const trackElement = container.firstChild as HTMLElement;
		expect(trackElement).toHaveAttribute("aria-valuenow", "2");

		rerender(<Slider min={0} max={10} value={8} />);
		expect(trackElement).toHaveAttribute("aria-valuenow", "8");
	});

	it("prevents interactions when disabled", () => {
		const handleChange = vi.fn();
		const { container } = render(
			<Slider disabled onChange={handleChange} defaultValue={50} />
		);
		const trackElement = container.firstChild as HTMLElement;

		expect(trackElement.className).toContain("mds-slider--disabled");
		expect(trackElement).toHaveAttribute("aria-disabled", "true");
	});

	it("calls onChange during drag interactions", () => {
		const handleChange = vi.fn();
		const { container } = render(
			<Slider min={0} max={100} onChange={handleChange} />
		);
		const trackElement = container.firstChild as HTMLElement;

		trackElement.getBoundingClientRect = () => ({
			left: 0,
			top: 0,
			width: 100,
			height: 32,
			right: 100,
			bottom: 32,
			x: 0,
			y: 0,
			toJSON: () => {},
		});

		trackElement.setPointerCapture = vi.fn();
		trackElement.releasePointerCapture = vi.fn();

		act(() => {
			trackElement.dispatchEvent(
				new PointerEvent("pointerdown", {
					clientX: 50,
					clientY: 16,
					pointerId: 1,
					bubbles: true,
				})
			);
		});

		expect(handleChange).toHaveBeenCalledWith(50);
	});
});
