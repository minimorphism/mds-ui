// Copyright (c) 2026 minimorphism
// Tests for Grid

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Grid } from "./Grid";

vi.mock("../../webgl/WebGLStore", () => ({
	registerWidget: vi.fn(),
	unregisterWidget: vi.fn(),
}));

describe("Grid Component", () => {
	it("renders correctly with default props", () => {
		const { container } = render(
			<Grid>
				<div data-testid="child">Grid Content</div>
			</Grid>
		);
		const gridElement = container.firstChild as HTMLElement;

		expect(gridElement).toBeInTheDocument();
		expect(gridElement.className).toContain("mds-grid");
		expect(gridElement.className).toContain("mds-grid--white");

		const childElement = screen.getByTestId("child");
		expect(childElement).toBeInTheDocument();
		expect(childElement).toHaveTextContent("Grid Content");
	});

	it("applies the specified variant class", () => {
		const { container } = render(<Grid variant="black">Dark Grid</Grid>);
		const gridElement = container.firstChild as HTMLElement;

		expect(gridElement.className).toContain("mds-grid");
		expect(gridElement.className).toContain("mds-grid--black");
		expect(gridElement.className).not.toContain("mds-grid--white");
	});

	it("applies disabled class and styling when disabled is true", () => {
		const { container } = render(
			<Grid variant="anodized" disabled>
				Disabled Grid
			</Grid>
		);
		const gridElement = container.firstChild as HTMLElement;

		expect(gridElement.className).toContain("mds-grid");
		expect(gridElement.className).toContain("mds-grid--disabled");
		expect(gridElement.className).not.toContain("mds-grid--anodized");
	});

	it("merges custom className correctly", () => {
		const { container } = render(
			<Grid className="custom-grid-layout">Test</Grid>
		);
		const gridElement = container.firstChild as HTMLElement;

		expect(gridElement.className).toContain("mds-grid");
		expect(gridElement.className).toContain("custom-grid-layout");
	});

	it("forwards the ref correctly", () => {
		const ref = React.createRef<HTMLDivElement>();
		render(<Grid ref={ref}>Ref Test</Grid>);

		expect(ref.current).not.toBeNull();
		expect(ref.current?.tagName).toBe("DIV");
		expect(ref.current?.className).toContain("mds-grid");
	});
});