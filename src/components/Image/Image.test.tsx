// Copyright (c) 2026 minimorphism
// Tests for Image

import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Image } from "./Image";

describe("Image Component", () => {
	it("renders the image with the correct src and alt attributes", () => {
		render(<Image src="test-image.jpg" alt="Test Alt Description" />);
		const imgElement = screen.getByRole("img");

		expect(imgElement).toBeInTheDocument();
		expect(imgElement).toHaveAttribute("src", "test-image.jpg");
		expect(imgElement).toHaveAttribute("alt", "Test Alt Description");
	});

	it("applies the default width and auto height to the wrapper", () => {
		const { container } = render(<Image src="test.jpg" alt="Test" />);
		const wrapperElement = container.firstChild as HTMLElement;

		expect(wrapperElement).toHaveClass("mds-image-wrapper");
		expect(wrapperElement).toHaveStyle({ width: "300px", height: "auto" });
	});

	it("applies custom width and height passed as strings", () => {
		const { container } = render(
			<Image src="test.jpg" alt="Test" width="100%" height="250px" />
		);
		const wrapperElement = container.firstChild as HTMLElement;

		expect(wrapperElement).toHaveStyle({ width: "100%", height: "250px" });
	});

	it("applies custom width and height passed as numbers", () => {
		const { container } = render(
			<Image src="test.jpg" alt="Test" width={500} height={400} />
		);
		const wrapperElement = container.firstChild as HTMLElement;

		// React автоматически конвертирует числа в пиксели в объекте style
		expect(wrapperElement).toHaveStyle({ width: "500px", height: "400px" });
	});

	it("merges custom className onto the wrapper element", () => {
		const { container } = render(
			<Image src="test.jpg" alt="Test" className="custom-image-class" />
		);
		const wrapperElement = container.firstChild as HTMLElement;

		expect(wrapperElement).toHaveClass("mds-image-wrapper");
		expect(wrapperElement).toHaveClass("custom-image-class");
	});

	it("passes additional rest props down to the native img element", () => {
		render(
			<Image
				src="test.jpg"
				alt="Test"
				loading="lazy"
				data-testid="native-img"
				aria-hidden="true"
			/>
		);
		const imgElement = screen.getByTestId("native-img");

		expect(imgElement).toBeInTheDocument();
		expect(imgElement).toHaveAttribute("loading", "lazy");
		expect(imgElement).toHaveAttribute("aria-hidden", "true");
	});
});