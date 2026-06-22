// Copyright (c) 2026 minimorphism
// Tests for Select

import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Select } from "./Select";

vi.mock("../../webgl/WebGLStore", () => ({
	registerWidget: vi.fn(),
	unregisterWidget: vi.fn(),
}));

global.ResizeObserver = vi.fn().mockImplementation(() => ({
	observe: vi.fn(),
	unobserve: vi.fn(),
	disconnect: vi.fn(),
}));

const mockOptions = [
	{ id: "1", label: "Ethereum" },
	{ id: "2", label: "Bitcoin" },
];

describe("Select Component", () => {
	it("renders closed by default with placeholder", () => {
		const { container } = render(
			<Select placeholder="Choose..." options={mockOptions} />
		);
		const componentElement = container.firstChild as HTMLElement;

		expect(componentElement).toBeInTheDocument();
		expect(componentElement.className).toContain("mds-select--white");

		const placeholderText = screen.getByText("Choose...");
		expect(placeholderText).toBeInTheDocument();

		const grid = componentElement.querySelector(
			'[class*="mds-select-content-grid"]'
		);
		expect(grid?.className).not.toContain("mds-select-content-grid--open");
	});

	it("renders opened when defaultOpen is true", () => {
		const { container } = render(
			<Select placeholder="Choose..." defaultOpen options={mockOptions} />
		);
		const componentElement = container.firstChild as HTMLElement;

		const grid = componentElement.querySelector(
			'[class*="mds-select-content-grid"]'
		);
		expect(grid?.className).toContain("mds-select-content-grid--open");
	});

	it("opens automatically on header click", () => {
		const { container } = render(
			<Select placeholder="Choose..." options={mockOptions} />
		);

		const header = container.querySelector(
			'[class*="mds-select-header"]'
		) as HTMLElement;
		const grid = container.querySelector(
			'[class*="mds-select-content-grid"]'
		) as HTMLElement;

		expect(grid.className).not.toContain("mds-select-content-grid--open");

		fireEvent.click(header);
		expect(grid.className).toContain("mds-select-content-grid--open");
	});

	it("updates value and closes on option select", () => {
		const { container } = render(
			<Select placeholder="Choose..." defaultOpen options={mockOptions} />
		);

		const options = container.querySelectorAll(
			'[class*="mds-select-item"]:not([class*="box"]):not([class*="text"])'
		);
		const optionToClick = options[0];

		const grid = container.querySelector(
			'[class*="mds-select-content-grid"]'
		) as HTMLElement;

		fireEvent.click(optionToClick);

		const ethereumLabels = screen.getAllByText("Ethereum");
		expect(ethereumLabels[0]).toBeInTheDocument();
		expect(grid.className).not.toContain("mds-select-content-grid--open");
	});

	it("applies black-themed selected vector box when component is black", () => {
		const { container } = render(
			<Select
				variant="black"
				defaultValue="Ethereum"
				defaultOpen
				options={mockOptions}
			/>
		);

		const items = container.querySelectorAll(
			'[class*="mds-select-item"]:not([class*="box"]):not([class*="text"])'
		);
		expect(items.length).toBe(2);

		const selectedItemBox = items[0].querySelector(
			'[class*="mds-select-item-box"]'
		);
		expect(selectedItemBox?.className).toContain(
			"mds-select-item-box--black"
		);

		const unselectedItemBox = items[1].querySelector(
			'[class*="mds-select-item-box"]'
		);
		expect(unselectedItemBox?.className).toContain(
			"mds-select-item-box--anodized"
		);
	});

	it("applies white-themed selected vector boxes when component is white or anodized", () => {
		const { container: containerWhite } = render(
			<Select
				variant="white"
				defaultValue="Ethereum"
				defaultOpen
				options={mockOptions}
			/>
		);

		const itemsWhite = containerWhite.querySelectorAll(
			'[class*="mds-select-item"]:not([class*="box"]):not([class*="text"])'
		);
		const selectedBoxWhite = itemsWhite[0].querySelector(
			'[class*="mds-select-item-box"]'
		);
		expect(selectedBoxWhite?.className).toContain(
			"mds-select-item-box--white"
		);
	});
});
