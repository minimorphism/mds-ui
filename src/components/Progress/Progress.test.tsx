// Copyright (c) 2026 minimorphism
// Tests for Progress

import React from "react";
import { render } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Progress } from "./Progress";

vi.mock("../../webgl/WebGLStore", () => ({
	registerWidget: vi.fn(),
	unregisterWidget: vi.fn(),
}));

describe("Progress Component", () => {
	it("renders successfully and limits progress between 0 and 100", () => {
		const { container } = render(
			<Progress progress={45} variant="white" />
		);
		const progressNode = container.querySelector(
			'[class*="mds-progress-inner"]'
		) as HTMLElement;
		expect(progressNode).toBeInTheDocument();
		expect(progressNode.style.width).toBe("45%");
	});

	it("caps progress values at 0 and 100", () => {
		const { container, rerender } = render(
			<Progress progress={-50} variant="white" />
		);
		let progressNode = container.querySelector(
			'[class*="mds-progress-inner"]'
		) as HTMLElement;
		expect(progressNode.style.width).toBe("0%");

		rerender(<Progress progress={150} variant="white" />);
		progressNode = container.querySelector(
			'[class*="mds-progress-inner"]'
		) as HTMLElement;
		expect(progressNode.style.width).toBe("100%");
	});
});
