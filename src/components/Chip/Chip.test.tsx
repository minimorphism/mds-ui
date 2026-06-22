// Copyright (c) 2026 minimorphism
// Tests for Chip

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Chip } from "./Chip";

vi.mock("../../webgl/WebGLStore", () => ({
	registerWidget: vi.fn(),
	unregisterWidget: vi.fn(),
}));

describe("Chip Component", () => {
	it("renders correctly with default props", () => {
		const { container } = render(<Chip>Tag</Chip>);
		const chipElement = container.firstChild as HTMLButtonElement;

		expect(chipElement).toBeInTheDocument();
		expect(chipElement.tagName).toBe("BUTTON");
		expect(chipElement.className).toContain("mds-chip");
		expect(chipElement.className).toContain("mds-chip--white");

		const textElement = screen.getByText("Tag");
		expect(textElement).toBeInTheDocument();
		expect(textElement.className).toContain("mds-chip-text");
	});

	it("applies the specified variant class", () => {
		const { container } = render(<Chip variant="black">Dark Tag</Chip>);
		const chipElement = container.firstChild as HTMLElement;

		expect(chipElement.className).toContain("mds-chip");
		expect(chipElement.className).toContain("mds-chip--black");
		expect(chipElement.className).not.toContain("mds-chip--white");
	});

	it("applies disabled attributes and classes correctly", () => {
		const handleClick = vi.fn();
		const { container } = render(
			<Chip disabled onClick={handleClick}>
				Locked
			</Chip>
		);
		const chipElement = container.firstChild as HTMLButtonElement;

		expect(chipElement).toBeDisabled();
		expect(chipElement.className).toContain("mds-chip--disabled");
		expect(chipElement.className).not.toContain("mds-chip--white");

		fireEvent.click(chipElement);
		expect(handleClick).not.toHaveBeenCalled();
	});

	it("calls onClick when clicked", () => {
		const handleClick = vi.fn();
		render(<Chip onClick={handleClick}>Clickable</Chip>);

		const chipElement = screen.getByText("Clickable").closest("button");
		expect(chipElement).toBeInTheDocument();

		if (chipElement) {
			fireEvent.click(chipElement);
		}
		expect(handleClick).toHaveBeenCalledTimes(1);
	});

	it("merges custom classNames correctly", () => {
		const { container } = render(
			<Chip className="custom-chip-class">Custom</Chip>
		);
		const chipElement = container.firstChild as HTMLElement;

		expect(chipElement.className).toContain("mds-chip");
		expect(chipElement.className).toContain("custom-chip-class");
	});
});