// Copyright (c) 2026 minimorphism
// Tests for Checkbox

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Checkbox } from "./Checkbox";

describe("Checkbox Component", () => {
	it("renders correctly with default props", () => {
		const { container } = render(<Checkbox data-testid="test-checkbox" />);
		const wrapper = container.firstChild as HTMLElement;
		const input = screen.getByTestId("test-checkbox") as HTMLInputElement;

		expect(wrapper.className).toContain("mds-checkbox-wrapper");
		expect(input).toBeInTheDocument();
		expect(input.type).toBe("checkbox");
		expect(input.checked).toBe(false);
	});

	it("applies the specified variant class", () => {
		const { container } = render(<Checkbox variant="white" />);
		const visual = container.querySelector(
			'[class*="mds-checkbox-visual"]'
		);

		expect(visual).toBeInTheDocument();
		expect(visual?.className).toContain("mds-checkbox-visual--white");
		expect(visual?.className).not.toContain("mds-checkbox-visual--black");
	});

	it("toggles checked state when clicked", () => {
		render(<Checkbox data-testid="test-checkbox" />);
		const input = screen.getByTestId("test-checkbox") as HTMLInputElement;

		expect(input.checked).toBe(false);

		fireEvent.click(input);
		expect(input.checked).toBe(true);

		fireEvent.click(input);
		expect(input.checked).toBe(false);
	});

	it("respects the disabled prop", () => {
		const handleChange = vi.fn();
		render(
			<Checkbox
				disabled
				onChange={handleChange}
				data-testid="test-checkbox"
			/>
		);
		const input = screen.getByTestId("test-checkbox") as HTMLInputElement;

		expect(input).toBeDisabled();
	});

	it("calls onChange callback when interacted", () => {
		const handleChange = vi.fn();
		render(
			<Checkbox onChange={handleChange} data-testid="test-checkbox" />
		);
		const input = screen.getByTestId("test-checkbox");

		fireEvent.click(input);
		expect(handleChange).toHaveBeenCalledTimes(1);
	});

	it("forwards the ref to the native input element", () => {
		const ref = React.createRef<HTMLInputElement>();
		render(<Checkbox ref={ref} />);

		expect(ref.current).not.toBeNull();
		expect(ref.current?.tagName).toBe("INPUT");
		expect(ref.current?.type).toBe("checkbox");
	});

	it("merges custom classNames correctly", () => {
		const { container } = render(
			<Checkbox className="custom-wrapper-class" />
		);
		const wrapper = container.firstChild as HTMLElement;

		expect(wrapper.className).toContain("mds-checkbox-wrapper");
		expect(wrapper.className).toContain("custom-wrapper-class");
	});
});
