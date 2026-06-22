// Copyright (c) 2026 minimorphism
// Tests for Snackbar

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Snackbar } from "./Snackbar";

vi.mock("../../webgl/WebGLStore", () => ({
	registerWidget: vi.fn(),
	unregisterWidget: vi.fn(),
}));

describe("Snackbar Component", () => {
	it("does not render into DOM when open is false initially", () => {
		const { container } = render(
			<Snackbar open={false} message="Hidden Message" />
		);
		expect(container.firstChild).toBeNull();
	});

	it("renders correctly and displays message when open is true", () => {
		const { container } = render(
			<Snackbar open={true} message="Visible Message" />
		);

		const wrapper = container.querySelector(
			'[class*="mds-snackbar-wrapper"]'
		);
		expect(wrapper).toBeInTheDocument();

		const textElement = screen.getByText("Visible Message");
		expect(textElement).toBeInTheDocument();
		expect(textElement.className).toContain("mds-snackbar-text");
	});

	it("applies the correct variant classes to the main body", () => {
		const { container } = render(
			<Snackbar open={true} variant="black" message="Black Variant" />
		);
		const snackbar = container.querySelector(
			'[class*="mds-snackbar"]:not([class*="wrapper"])'
		);
		expect(snackbar?.className).toContain("mds-snackbar--black");
	});

	it("renders the icon and applies inverted variant to it", () => {
		const MockIcon = <svg data-testid="mock-icon" />;
		const { container, getByTestId } = render(
			<Snackbar
				open={true}
				variant="black"
				message="With Icon"
				icon={MockIcon}
			/>
		);

		expect(getByTestId("mock-icon")).toBeInTheDocument();

		const iconContainer = container.querySelector(
			'[class*="mds-snackbar-icon"]'
		);
		expect(iconContainer).toBeInTheDocument();
		expect(iconContainer?.className).toContain(
			"mds-snackbar-icon--anodized"
		);
	});

	it("waits for transition end before unmounting", () => {
		const { container, rerender } = render(
			<Snackbar open={true} message="Closing Test" />
		);

		const wrapper = container.querySelector(
			'[class*="mds-snackbar-wrapper"]'
		) as HTMLElement;
		expect(wrapper).toBeInTheDocument();

		rerender(<Snackbar open={false} message="Closing Test" />);

		expect(
			container.querySelector('[class*="mds-snackbar-wrapper"]')
		).toBeInTheDocument();

		fireEvent.transitionEnd(wrapper);

		expect(container.firstChild).toBeNull();
	});
});
