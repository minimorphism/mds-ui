// Copyright (c) 2026 minimorphism
// Tests for Typography

import React, { createRef } from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Typography } from "./Typography";

describe("Typography Component (mds-ui)", () => {
	it("renders default variant (body1) successfully", () => {
		render(<Typography>Default Text</Typography>);
		const element = screen.getByText("Default Text");

		expect(element).toBeInTheDocument();
		expect(element.tagName).toBe("P");
		expect(element.className).toContain("mds-typography");
		expect(element.className).toContain("mds-typography--body1");
		expect(element.className).toContain("mds-typography--color-black");
	});

	it("renders the correct HTML element based on variant", () => {
		const { rerender } = render(
			<Typography variant="h1">Heading 1</Typography>
		);
		expect(screen.getByText("Heading 1").tagName).toBe("H1");

		rerender(<Typography variant="caption">Caption</Typography>);
		expect(screen.getByText("Caption").tagName).toBe("SPAN");
	});

	it("polymorphism: overrides the HTML element when 'component' prop is provided", () => {
		render(
			<Typography variant="h1" component="div">
				Polymorphic Text
			</Typography>
		);
		const element = screen.getByText("Polymorphic Text");

		expect(element.tagName).toBe("DIV");
		expect(element.className).toContain("mds-typography--h1");
	});

	it("applies modifier classes correctly for hacks and decorations", () => {
		render(
			<Typography
				weight="bold"
				align="center"
				transform="uppercase"
				italic
				underline
				strikethrough
				gutterBottom
				truncate
				noWrap
			>
				Modified Text
			</Typography>
		);

		const element = screen.getByText("Modified Text");

		expect(element.className).toContain("mds-typography--weight-bold");
		expect(element.className).toContain("mds-typography--align-center");
		expect(element.className).toContain(
			"mds-typography--transform-uppercase"
		);
		expect(element.className).toContain("mds-typography--italic");
		expect(element.className).toContain("mds-typography--underline");
		expect(element.className).toContain("mds-typography--strikethrough");
		expect(element.className).toContain("mds-typography--gutter-bottom");
		expect(element.className).toContain("mds-typography--truncate");
		expect(element.className).toContain("mds-typography--no-wrap");
	});

	it("forwards the ref to the root element", () => {
		const ref = createRef<HTMLElement>();
		render(<Typography ref={ref}>Ref Text</Typography>);

		expect(ref.current).not.toBeNull();
		expect(ref.current?.tagName).toBe("P");
		expect(ref.current?.textContent).toBe("Ref Text");
	});

	it("applies custom classes along with default ones", () => {
		render(
			<Typography className="custom-test-class">Custom Class</Typography>
		);
		const element = screen.getByText("Custom Class");

		expect(element.className).toContain("mds-typography");
		expect(element.className).toContain("custom-test-class");
	});
});
