// Copyright (c) 2026 minimorphism
// Tests for Accordion

import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Accordion } from "./Accordion";

vi.mock("../../webgl/WebGLStore", () => ({
	registerWidget: vi.fn(),
	unregisterWidget: vi.fn(),
}));

global.ResizeObserver = vi.fn().mockImplementation(() => ({
	observe: vi.fn(),
	unobserve: vi.fn(),
	disconnect: vi.fn(),
}));

describe("Accordion Component", () => {
	it("renders closed by default", () => {
		const { container } = render(<Accordion title="Age">42</Accordion>);
		const accordionElement = container.firstChild as HTMLElement;

		expect(accordionElement).toBeInTheDocument();
		expect(accordionElement.className).toContain("mds-accordion--white");

		const header = accordionElement.querySelector(
			'[class*="mds-accordion-header"]'
		) as HTMLElement;
		expect(header).toHaveAttribute("aria-expanded", "false");

		const title = screen.getByText("Age");
		expect(title).toBeInTheDocument();

		const grid = accordionElement.querySelector(
			'[class*="mds-accordion-content-grid"]'
		);
		expect(grid?.className).not.toContain(
			"mds-accordion-content-grid--open"
		);
	});

	it("renders opened when defaultOpen is true", () => {
		const { container } = render(
			<Accordion title="Age" defaultOpen>
				42
			</Accordion>
		);
		const accordionElement = container.firstChild as HTMLElement;

		const grid = accordionElement.querySelector(
			'[class*="mds-accordion-content-grid"]'
		);
		expect(grid?.className).toContain("mds-accordion-content-grid--open");
	});

	it("toggles open/close state on click when uncontrolled", () => {
		const { container } = render(<Accordion title="Age">42</Accordion>);
		const header = container.querySelector(
			'[class*="mds-accordion-header"]'
		) as HTMLElement;
		const grid = container.querySelector(
			'[class*="mds-accordion-content-grid"]'
		) as HTMLElement;

		expect(grid.className).not.toContain(
			"mds-accordion-content-grid--open"
		);

		fireEvent.click(header);
		expect(grid.className).toContain("mds-accordion-content-grid--open");

		fireEvent.click(header);
		expect(grid.className).not.toContain(
			"mds-accordion-content-grid--open"
		);
	});

	it("respects controlled open prop", () => {
		const handleChange = vi.fn();
		const { container, rerender } = render(
			<Accordion title="Age" open={false} onChange={handleChange}>
				42
			</Accordion>
		);

		const header = container.querySelector(
			'[class*="mds-accordion-header"]'
		) as HTMLElement;
		const grid = container.querySelector(
			'[class*="mds-accordion-content-grid"]'
		) as HTMLElement;

		fireEvent.click(header);
		expect(handleChange).toHaveBeenCalledWith(true);
		expect(grid.className).not.toContain(
			"mds-accordion-content-grid--open"
		);

		rerender(
			<Accordion title="Age" open={true} onChange={handleChange}>
				42
			</Accordion>
		);
		expect(grid.className).toContain("mds-accordion-content-grid--open");
	});

	it("applies dark-gray variant to body when accordion is black", () => {
		const { container } = render(
			<Accordion title="Age" variant="black">
				42
			</Accordion>
		);

		const header = container.querySelector(
			'[class*="mds-accordion-header"]'
		) as HTMLElement;
		const body = container.querySelector(
			'[class*="mds-accordion-body-bg"]'
		) as HTMLElement;

		expect(header.className).toContain("mds-accordion-header");
		expect(body.className).toContain("mds-accordion-body-bg--dark-gray");
	});

	it("applies white variant to icon box when accordion is black", () => {
		const { container } = render(
			<Accordion title="Age" variant="black">
				42
			</Accordion>
		);

		const iconBox = container.querySelector(
			'[class*="mds-accordion-icon-box"]'
		) as HTMLElement;
		expect(iconBox.className).toContain("mds-accordion-icon-box--white");
	});
});
