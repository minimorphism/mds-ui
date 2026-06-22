// Copyright (c) 2026 minimorphism
// Tests for Badge

import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Badge } from "./Badge";

vi.mock("../../webgl/WebGLStore", () => ({
	registerWidget: vi.fn(),
	unregisterWidget: vi.fn(),
}));

describe("Badge Component", () => {
	it("renders correctly with content and child element", () => {
		render(
			<Badge content="99+">
				<div data-testid="target">Mail</div>
			</Badge>
		);

		expect(screen.getByTestId("target")).toBeInTheDocument();
		expect(screen.getByText("99+")).toBeInTheDocument();
	});
});
