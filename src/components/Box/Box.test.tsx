// Copyright (c) 2026 minimorphism
// Tests for Box

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Box } from "./Box";

vi.mock("../../webgl/WebGLStore", () => ({
	registerWidget: vi.fn(),
	unregisterWidget: vi.fn(),
}));

describe("Box Component", () => {
	it("renders correctly with default props", () => {
		const { container } = render(<Box>Content</Box>);
		const boxElement = container.firstChild as HTMLElement;

		expect(boxElement).toBeInTheDocument();
		expect(boxElement.className).toContain("mds-box");
		expect(boxElement.className).toContain("mds-box--white");

		const contentElement = screen.getByText("Content");
		expect(contentElement).toBeInTheDocument();
		expect(contentElement.className).toContain("mds-box-content");
	});

	it("applies the specified variant class", () => {
		const { container } = render(<Box variant="black">Dark Matter</Box>);
		const boxElement = container.firstChild as HTMLElement;

		expect(boxElement.className).toContain("mds-box");
		expect(boxElement.className).toContain("mds-box--black");
		expect(boxElement.className).not.toContain("mds-box--white");
	});

	it("applies disabled class and removes variant class when disabled is true", () => {
		const { container } = render(
			<Box variant="anodized" disabled>
				Locked
			</Box>
		);
		const boxElement = container.firstChild as HTMLElement;

		expect(boxElement.className).toContain("mds-box");
		expect(boxElement.className).toContain("mds-box--disabled");
		expect(boxElement.className).not.toContain("mds-box--anodized");
	});

	it("merges custom className correctly", () => {
		const { container } = render(
			<Box className="custom-wrapper-class">Test</Box>
		);
		const boxElement = container.firstChild as HTMLElement;

		expect(boxElement.className).toContain("mds-box");
		expect(boxElement.className).toContain("custom-wrapper-class");
	});

	it("handles pointer events without crashing", () => {
		const handlePointerEnter = vi.fn();
		const handlePointerLeave = vi.fn();
		const handlePointerDown = vi.fn();
		const handlePointerUp = vi.fn();

		const { container } = render(
			<Box
				onPointerEnter={handlePointerEnter}
				onPointerLeave={handlePointerLeave}
				onPointerDown={handlePointerDown}
				onPointerUp={handlePointerUp}
			>
				Events Test
			</Box>
		);
		const boxElement = container.firstChild as HTMLElement;

		fireEvent.pointerEnter(boxElement);
		expect(handlePointerEnter).toHaveBeenCalledTimes(1);

		fireEvent.pointerDown(boxElement);
		expect(handlePointerDown).toHaveBeenCalledTimes(1);

		fireEvent.pointerUp(boxElement);
		expect(handlePointerUp).toHaveBeenCalledTimes(1);

		fireEvent.pointerLeave(boxElement);
		expect(handlePointerLeave).toHaveBeenCalledTimes(1);
	});
});
