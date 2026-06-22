// Copyright (c) 2026 minimorphism
// Tests for Button

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Button } from "./Button";

vi.mock("../../webgl/WebGLStore", () => ({
	registerWidget: vi.fn(),
	unregisterWidget: vi.fn(),
}));

describe("Button Component", () => {
	it("renders correctly with default props", () => {
		const { container } = render(<Button>Click Me</Button>);
		const buttonElement = container.firstChild as HTMLButtonElement;

		expect(buttonElement).toBeInTheDocument();
		expect(buttonElement.tagName).toBe("BUTTON");
		expect(buttonElement.className).toContain("mds-button");
		expect(buttonElement.className).toContain("mds-button--white");

		const textElement = screen.getByText("Click Me");
		expect(textElement).toBeInTheDocument();
		expect(textElement.className).toContain("mds-button-text");
	});

	it("applies the specified variant class", () => {
		const { container } = render(<Button variant="black">Black</Button>);
		const buttonElement = container.firstChild as HTMLElement;

		expect(buttonElement.className).toContain("mds-button");
		expect(buttonElement.className).toContain("mds-button--black");
		expect(buttonElement.className).not.toContain("mds-button--white");
	});

	it("applies size classes correctly only when size is not medium", () => {
		const { container: containerSm } = render(
			<Button size="sm">Small</Button>
		);
		const buttonSm = containerSm.firstChild as HTMLElement;
		expect(buttonSm.className).toContain("mds-button--sm");

		const { container: containerMd } = render(
			<Button size="md">Medium</Button>
		);
		const buttonMd = containerMd.firstChild as HTMLElement;
		expect(buttonMd.className).not.toContain("mds-button--md");
	});

	it("applies disabled attributes and classes correctly", () => {
		const handleClick = vi.fn();
		const { container } = render(
			<Button disabled onClick={handleClick}>
				Disabled
			</Button>
		);
		const buttonElement = container.firstChild as HTMLButtonElement;

		expect(buttonElement).toBeDisabled();
		expect(buttonElement.className).toContain("mds-button--disabled");
		expect(buttonElement.className).not.toContain("mds-button--white");

		fireEvent.click(buttonElement);
		expect(handleClick).not.toHaveBeenCalled();
	});

	it("calls onClick when active button is clicked", () => {
		const handleClick = vi.fn();
		render(<Button onClick={handleClick}>Press Me</Button>);

		const buttonElement = screen.getByText("Press Me").closest("button");
		expect(buttonElement).toBeInTheDocument();

		if (buttonElement) {
			fireEvent.click(buttonElement);
		}
		expect(handleClick).toHaveBeenCalledTimes(1);
	});

	it("handles pointer events correctly without errors", () => {
		const handlePointerMove = vi.fn();
		const { container } = render(
			<Button onPointerMove={handlePointerMove}>Interactive</Button>
		);
		const buttonElement = container.firstChild as HTMLElement;

		fireEvent.pointerMove(buttonElement, { clientX: 10, clientY: 15 });
		expect(handlePointerMove).toHaveBeenCalled();
	});
});