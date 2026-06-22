// Copyright (c) 2026 minimorphism
// Tests for RadioGroup

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { RadioButton } from "./RadioGroup";

describe("RadioButton Component", () => {
	it("renders radio input unchecked by default", () => {
		render(<RadioButton data-testid="radio" value="opt" />);
		const input = screen.getByTestId("radio") as HTMLInputElement;
		expect(input).toBeInTheDocument();
		expect(input.type).toBe("radio");
		expect(input.checked).toBe(false);
	});

	it("fires onChange callback on check", () => {
		const handleChange = vi.fn();
		render(<RadioButton data-testid="radio" onChange={handleChange} />);
		const input = screen.getByTestId("radio") as HTMLInputElement;

		fireEvent.click(input);
		expect(input.checked).toBe(true);
		expect(handleChange).toHaveBeenCalled();
	});

	it("applies the specified variant class correctly", () => {
		const { container } = render(<RadioButton variant="black" />);
		const bg = container.querySelector('[class*="mds-radio-bg"]');
		expect(bg).toBeInTheDocument();
		expect(bg?.className).toContain("mds-radio-bg--black");
	});

	it("respects the disabled attribute", () => {
		const handleChange = vi.fn();
		render(
			<RadioButton disabled data-testid="radio" onChange={handleChange} />
		);
		const input = screen.getByTestId("radio") as HTMLInputElement;

		expect(input).toBeDisabled();
	});
});
