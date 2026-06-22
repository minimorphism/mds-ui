// Copyright (c) 2026 minimorphism
// Tests for Divider

import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Divider } from "./Divider";

describe("Divider Component", () => {
	it("renders correctly with default props", () => {
		const { container } = render(<Divider data-testid="test-divider" />);
		const dividerElement = container.firstChild as HTMLElement;

		expect(dividerElement).toBeInTheDocument();
		expect(dividerElement.tagName).toBe("DIV");
		expect(dividerElement.className).toContain("mds-divider");
	});

	it("applies custom margin via style prop", () => {
		const { container } = render(<Divider margin="24px 0" />);
		const dividerElement = container.firstChild as HTMLElement;

		expect(dividerElement).toHaveStyle({ margin: "24px 0px" });
	});

	it("merges custom style object with the margin prop safely", () => {
		const { container } = render(
			<Divider margin="10px" style={{ opacity: "0.5" }} />
		);
		const dividerElement = container.firstChild as HTMLElement;

		expect(dividerElement).toHaveStyle({
			margin: "10px",
			opacity: "0.5",
		});
	});

	it("merges custom className correctly", () => {
		const { container } = render(
			<Divider className="custom-divider-class" />
		);
		const dividerElement = container.firstChild as HTMLElement;

		expect(dividerElement.className).toContain("mds-divider");
		expect(dividerElement.className).toContain("custom-divider-class");
	});
});
