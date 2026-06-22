// Copyright (c) 2026 minimorphism
// Tests for Alert

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Alert } from "./Alert";

vi.mock("../../webgl/WebGLStore", () => ({
	registerWidget: vi.fn(),
	unregisterWidget: vi.fn(),
}));

describe("Alert Component", () => {
	it("does not render into DOM when open is false initially", () => {
		const { container } = render(
			<Alert open={false} message="Hidden Message" />
		);
		expect(container.firstChild).toBeNull();
	});

	it("renders correctly and displays message when open is true", () => {
		const { container } = render(
			<Alert open={true} message="Visible Message" />
		);

		const wrapper = container.querySelector('[class*="mds-alert-wrapper"]');
		expect(wrapper).toBeInTheDocument();

		const textElement = screen.getByText("Visible Message");
		expect(textElement).toBeInTheDocument();
		expect(textElement.className).toContain("mds-alert-text");
	});

	it("applies the correct variant classes to the main body", () => {
		const { container } = render(
			<Alert open={true} variant="black" message="Black Variant" />
		);
		const alertEl = container.querySelector(
			'[class*="mds-alert"]:not([class*="wrapper"])'
		);
		expect(alertEl).toBeInTheDocument();
		expect(alertEl?.className).toContain("mds-alert--black");
	});

	it("renders the icon and applies inverted variant to it", () => {
		const MockIcon = <svg data-testid="mock-icon" />;
		const { container, getByTestId } = render(
			<Alert
				open={true}
				variant="black"
				message="With Icon"
				icon={MockIcon}
			/>
		);

		expect(getByTestId("mock-icon")).toBeInTheDocument();

		const iconContainer = container.querySelector(
			'[class*="mds-alert-icon"]'
		);
		expect(iconContainer).toBeInTheDocument();
		expect(iconContainer?.className).toContain("mds-alert-icon--anodized");
	});

	it("renders black icon for white variant", () => {
		const MockIcon = <svg data-testid="mock-icon" />;
		const { container } = render(
			<Alert
				open={true}
				variant="white"
				message="White variant"
				icon={MockIcon}
			/>
		);

		const iconContainer = container.querySelector(
			'[class*="mds-alert-icon"]'
		);
		expect(iconContainer).toBeInTheDocument();
		expect(iconContainer?.className).toContain("mds-alert-icon--black");
	});

	it("waits for transition end before unmounting", () => {
		const { container, rerender } = render(
			<Alert open={true} message="Closing Test" />
		);

		const wrapper = container.querySelector(
			'[class*="mds-alert-wrapper"]'
		) as HTMLElement;
		expect(wrapper).toBeInTheDocument();

		rerender(<Alert open={false} message="Closing Test" />);

		expect(
			container.querySelector('[class*="mds-alert-wrapper"]')
		).toBeInTheDocument();

		fireEvent.transitionEnd(wrapper);

		expect(container.firstChild).toBeNull();
	});
});
