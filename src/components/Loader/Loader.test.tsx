// Copyright (c) 2026 minimorphism
// Tests for Loader

import React from "react";
import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Loader } from "./Loader";

describe("Loader Component", () => {
	it("renders correctly with default props", () => {
		const { container } = render(<Loader />);
		const loaderElement = container.firstChild as HTMLElement;

		expect(loaderElement).toBeInTheDocument();
		expect(loaderElement.tagName).toBe("DIV");
		expect(loaderElement.className).toContain("loader");
		expect(loaderElement.className).toContain("loader--black");
		expect(loaderElement).toHaveStyle({ width: "40px", height: "40px" });
	});

	it("applies the specified variant class name", () => {
		const { container } = render(<Loader variant="white" />);
		const loaderElement = container.firstChild as HTMLElement;

		expect(loaderElement.className).toContain("loader--white");
		expect(loaderElement.className).not.toContain("loader--black");
	});
});