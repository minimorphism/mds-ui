// Copyright (c) 2026 minimorphism
// Tests for Autocomplete

import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Autocomplete } from "./Autocomplete";

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

describe("Autocomplete Component", () => {
	it("renders closed by default", () => {
		const { container } = render(
			<Autocomplete placeholder="Type here..." options={mockOptions} />
		);
		const componentElement = container.firstChild as HTMLElement;

		expect(componentElement).toBeInTheDocument();
		expect(componentElement.className).toContain("mds-autocomplete--white");

		const input = screen.getByPlaceholderText("Type here...");
		expect(input).toBeInTheDocument();
		expect(input).toHaveAttribute("aria-expanded", "false");

		const grid = componentElement.querySelector(
			'[class*="mds-autocomplete-content-grid"]'
		);
		expect(grid?.className).not.toContain(
			"mds-autocomplete-content-grid--open"
		);
	});

	it("renders opened when defaultOpen is true", () => {
		const { container } = render(
			<Autocomplete
				placeholder="Type here..."
				defaultOpen
				options={mockOptions}
			/>
		);
		const componentElement = container.firstChild as HTMLElement;

		const grid = componentElement.querySelector(
			'[class*="mds-autocomplete-content-grid"]'
		);
		expect(grid?.className).toContain(
			"mds-autocomplete-content-grid--open"
		);
	});

	it("opens automatically on input click", () => {
		const { container } = render(
			<Autocomplete placeholder="Search..." options={mockOptions} />
		);

		const input = screen.getByPlaceholderText("Search...");
		const grid = container.querySelector(
			'[class*="mds-autocomplete-content-grid"]'
		) as HTMLElement;

		expect(grid.className).not.toContain(
			"mds-autocomplete-content-grid--open"
		);

		fireEvent.click(input);
		expect(grid.className).toContain("mds-autocomplete-content-grid--open");
	});

	it("updates value and closes on option select", () => {
		const { container } = render(
			<Autocomplete
				placeholder="Search..."
				defaultOpen
				options={mockOptions}
			/>
		);

		const option = screen.getByText("Ethereum");
		const grid = container.querySelector(
			'[class*="mds-autocomplete-content-grid"]'
		) as HTMLElement;
		const input = screen.getByPlaceholderText(
			"Search..."
		) as HTMLInputElement;

		fireEvent.click(option);

		expect(input.value).toBe("Ethereum");
		expect(grid.className).not.toContain(
			"mds-autocomplete-content-grid--open"
		);
	});

	it("applies dark-gray variant to body and anodized vector boxes when component is black", () => {
		const { container } = render(
			<Autocomplete variant="black" defaultOpen options={mockOptions} />
		);

		const body = container.querySelector(
			'[class*="mds-autocomplete-body-bg"]'
		) as HTMLElement;
		expect(body.className).toContain("mds-autocomplete-body-bg--dark-gray");

		const boxes = container.querySelectorAll(
			'[class*="mds-autocomplete-item-box"]'
		);
		expect(boxes.length).toBeGreaterThan(0);
		boxes.forEach((box) => {
			expect(box.className).toContain(
				"mds-autocomplete-item-box--anodized"
			);
		});
	});

	it("applies black vector boxes when component is white", () => {
		const { container } = render(
			<Autocomplete variant="white" defaultOpen options={mockOptions} />
		);

		const boxes = container.querySelectorAll(
			'[class*="mds-autocomplete-item-box"]'
		);
		expect(boxes.length).toBeGreaterThan(0);
		boxes.forEach((box) => {
			expect(box.className).toContain("mds-autocomplete-item-box--black");
		});
	});
});
