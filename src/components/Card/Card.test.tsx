// Copyright (c) 2026 minimorphism
// Tests for Card

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Card } from "./Card";

vi.mock("../../webgl/WebGLStore", () => ({
	registerWidget: vi.fn(),
	unregisterWidget: vi.fn(),
}));

describe("Card Component", () => {
	it("renders correctly with default props", () => {
		const { container } = render(<Card>Content</Card>);
		const cardElement = container.firstChild as HTMLElement;

		expect(cardElement).toBeInTheDocument();
		expect(cardElement.className).toContain("mds-card");
		expect(cardElement.className).toContain("mds-card--white");

		const contentElement = screen.getByText("Content");
		expect(contentElement).toBeInTheDocument();
		expect(contentElement.className).toContain("mds-card-content");
	});

	it("applies the specified variant class", () => {
		const { container } = render(<Card variant="black">Black Card</Card>);
		const cardElement = container.firstChild as HTMLElement;

		expect(cardElement.className).toContain("mds-card");
		expect(cardElement.className).toContain("mds-card--black");
		expect(cardElement.className).not.toContain("mds-card--white");
	});

	it("applies the anodized variant correctly", () => {
		const { container } = render(
			<Card variant="anodized">Anodized Card</Card>
		);
		const cardElement = container.firstChild as HTMLElement;

		expect(cardElement.className).toContain("mds-card");
		expect(cardElement.className).toContain("mds-card--anodized");
	});

	it("applies disabled class and removes variant class when disabled is true", () => {
		const { container } = render(
			<Card variant="anodized" disabled>
				Locked
			</Card>
		);
		const cardElement = container.firstChild as HTMLElement;

		expect(cardElement.className).toContain("mds-card");
		expect(cardElement.className).toContain("mds-card--disabled");
		expect(cardElement.className).not.toContain("mds-card--anodized");
	});

	it("merges custom className correctly", () => {
		const { container } = render(<Card className="custom-card-class" />);
		const cardElement = container.firstChild as HTMLElement;

		expect(cardElement.className).toContain("mds-card");
		expect(cardElement.className).toContain("custom-card-class");
	});
});
