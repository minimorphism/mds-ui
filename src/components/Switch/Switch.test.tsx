// Copyright (c) 2026 minimorphism
// Tests for Switch

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Switch } from "./Switch";

vi.mock("../../webgl/WebGLStore", () => ({
	registerWidget: vi.fn(),
	unregisterWidget: vi.fn(),
}));

describe("Switch Component", () => {
	it("renders correctly with default props", () => {
		const { container } = render(<Switch />);
		const switchElement = container.firstChild as HTMLElement;

		expect(switchElement).toBeInTheDocument();
		expect(switchElement.className).toContain("mds-switch");
		expect(switchElement.className).toContain("mds-switch--md");
	});

	it("toggles state uncontrolled when clicked", () => {
		const { container } = render(<Switch />);
		const switchElement = container.firstChild as HTMLElement;

		expect(switchElement.className).not.toContain("mds-switch--checked");

		fireEvent.click(switchElement);
		expect(switchElement.className).toContain("mds-switch--checked");

		fireEvent.click(switchElement);
		expect(switchElement.className).not.toContain("mds-switch--checked");
	});

	it("calls onChange but does not change internal state if fully controlled", () => {
		const handleChange = vi.fn();
		const { container } = render(
			<Switch checked={true} onChange={handleChange} />
		);
		const switchElement = container.firstChild as HTMLElement;

		expect(switchElement.className).toContain("mds-switch--checked");

		fireEvent.click(switchElement);
		expect(handleChange).toHaveBeenCalledWith(false);
		expect(switchElement.className).toContain("mds-switch--checked");
	});

	it("does not trigger toggle when disabled", () => {
		const handleChange = vi.fn();
		const { container } = render(
			<Switch disabled onChange={handleChange} />
		);
		const switchElement = container.firstChild as HTMLElement;

		expect(switchElement.className).toContain("mds-switch--disabled");

		fireEvent.click(switchElement);
		expect(handleChange).not.toHaveBeenCalled();
		expect(switchElement.className).not.toContain("mds-switch--checked");
	});
});