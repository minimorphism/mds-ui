// Copyright (c) 2026 minimorphism
// Tests for Stack

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Stack } from "./Stack";

vi.mock("../../webgl/WebGLStore", () => ({
	registerWidget: vi.fn(),
	unregisterWidget: vi.fn(),
}));

global.ResizeObserver = vi.fn().mockImplementation(() => ({
	observe: vi.fn(),
	unobserve: vi.fn(),
	disconnect: vi.fn(),
}));

describe("Stack Component", () => {
	it("renders correctly with default props", () => {
		const { container } = render(<Stack>Content</Stack>);
		const stackElement = container.firstChild as HTMLElement;

		expect(stackElement).toBeInTheDocument();
		expect(stackElement.className).toContain("mds-stack");
		expect(stackElement.className).toContain("mds-stack--white");
	});

	it("applies the specified variant class", () => {
		const { container } = render(<Stack variant="black">Dark Stack</Stack>);
		const stackElement = container.firstChild as HTMLElement;

		expect(stackElement.className).toContain("mds-stack--black");
		expect(stackElement.className).not.toContain("mds-stack--white");
	});
});