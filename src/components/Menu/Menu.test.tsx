// Copyright (c) 2026 minimorphism
// Tests for Menu

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Menu } from "./Menu";

describe("Menu Component", () => {
	it("renders correctly with default props", () => {
		const { container } = render(<Menu />);
		const buttonElement = container.firstChild as HTMLButtonElement;

		expect(buttonElement).toBeInTheDocument();
		expect(buttonElement.tagName).toBe("BUTTON");
		expect(buttonElement.className).toContain("mds-menu-btn");
		expect(buttonElement.className).toContain("mds-menu-btn--black");
	});

	it("applies the specified variant class", () => {
		const { container } = render(<Menu variant="white" />);
		const buttonElement = container.firstChild as HTMLElement;

		expect(buttonElement.className).toContain("mds-menu-btn");
		expect(buttonElement.className).toContain("mds-menu-btn--white");
		expect(buttonElement.className).not.toContain("mds-menu-btn--black");
	});
});