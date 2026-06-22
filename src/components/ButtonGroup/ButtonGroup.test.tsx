// Copyright (c) 2026 minimorphism
// Tests for ButtonGroup

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { ButtonGroup } from "./ButtonGroup";

vi.mock("../../webgl/WebGLStore", () => ({
	registerWidget: vi.fn(),
	unregisterWidget: vi.fn(),
}));

describe("ButtonGroup Component", () => {
	it("renders correctly with given labels", () => {
		const { container } = render(
			<ButtonGroup labels={["Apple", "Banana", "Cherry"]} />
		);
		const groupElement = container.firstChild as HTMLElement;

		expect(groupElement).toBeInTheDocument();
		expect(groupElement.className).toContain("mds-button-group");
		expect(groupElement.className).toContain("mds-button-group--white");

		expect(screen.getByText("Apple")).toBeInTheDocument();
		expect(screen.getByText("Banana")).toBeInTheDocument();
		expect(screen.getByText("Cherry")).toBeInTheDocument();
	});

	it("applies the specified variant class", () => {
		const { container } = render(
			<ButtonGroup variant="black" labels={["A", "B"]} />
		);
		const groupElement = container.firstChild as HTMLElement;

		expect(groupElement.className).toContain("mds-button-group--black");
		expect(groupElement.className).not.toContain("mds-button-group--white");
	});

	it("identifies and styles the active button correctly", () => {
		render(
			<ButtonGroup labels={["One", "Two", "Three"]} activeLabel="Two" />
		);

		const activeButton = screen.getByText("Two").closest("button");
		const inactiveButton = screen.getByText("One").closest("button");

		expect(activeButton?.className).toContain("mds-button-group__active");
		expect(inactiveButton?.className).not.toContain(
			"mds-button-group__active"
		);
	});

	it("calls onSelect with the correct label when a button is clicked", () => {
		const handleSelect = vi.fn();
		render(
			<ButtonGroup
				labels={["Option 1", "Option 2"]}
				onSelect={handleSelect}
			/>
		);

		const buttonToClick = screen.getByText("Option 2").closest("button");
		expect(buttonToClick).toBeInTheDocument();

		if (buttonToClick) {
			fireEvent.click(buttonToClick);
		}

		expect(handleSelect).toHaveBeenCalledTimes(1);
		expect(handleSelect).toHaveBeenCalledWith("Option 2");
	});

	it("renders the correct number of separators", () => {
		const { container } = render(
			<ButtonGroup labels={["1", "2", "3", "4"]} />
		);

		const separators = container.querySelectorAll(
			'[class*="mds-button-group__separator"]'
		);
		expect(separators.length).toBe(3);
	});

	it("does not render separators for a single button", () => {
		const { container } = render(<ButtonGroup labels={["Only"]} />);

		const separators = container.querySelectorAll(
			'[class*="mds-button-group__separator"]'
		);
		expect(separators.length).toBe(0);
	});
});
