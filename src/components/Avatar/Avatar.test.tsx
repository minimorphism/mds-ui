// Copyright (c) 2026 minimorphism
// Tests for Avatar

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Avatar } from "./Avatar";

vi.mock("../../webgl/WebGLStore", () => ({
	registerWidget: vi.fn(),
	unregisterWidget: vi.fn(),
}));

describe("Avatar Component", () => {
	it("renders placeholder correctly when src is not provided", () => {
		const { container } = render(<Avatar />);
		const avatarElement = container.firstChild as HTMLElement;

		expect(avatarElement).toBeInTheDocument();
		expect(avatarElement.className).toContain("mds-avatar");
		expect(avatarElement.className).toContain("mds-avatar--white");

		const placeholder = avatarElement.querySelector(
			'[class*="mds-avatar__placeholder"]'
		);
		expect(placeholder).toBeInTheDocument();
		expect(
			placeholder?.querySelector('[class*="mds-avatar__head"]')
		).toBeInTheDocument();
		expect(
			placeholder?.querySelector('[class*="mds-avatar__body"]')
		).toBeInTheDocument();
	});

	it("renders image instead of placeholder when src is provided", () => {
		const mockSrc = "https://example.com/avatar.jpg";
		const { container } = render(<Avatar src={mockSrc} alt="John Doe" />);
		const avatarElement = container.firstChild as HTMLElement;

		const imgElement = screen.getByRole("img") as HTMLImageElement;
		expect(imgElement).toBeInTheDocument();
		expect(imgElement.className).toContain("mds-avatar__image");
		expect(imgElement.src).toBe(mockSrc);
		expect(imgElement.alt).toBe("John Doe");

		expect(
			avatarElement.querySelector('[class*="mds-avatar__placeholder"]')
		).not.toBeInTheDocument();
	});

	it("applies the specified variant class", () => {
		const { container, rerender } = render(<Avatar variant="black" />);
		let avatarElement = container.firstChild as HTMLElement;
		expect(avatarElement.className).toContain("mds-avatar--black");

		rerender(<Avatar variant="anodized" />);
		avatarElement = container.firstChild as HTMLElement;
		expect(avatarElement.className).toContain("mds-avatar--anodized");
	});

	it("merges custom className correctly", () => {
		const { container } = render(
			<Avatar className="custom-avatar-class" />
		);
		const avatarElement = container.firstChild as HTMLElement;

		expect(avatarElement.className).toContain("mds-avatar");
		expect(avatarElement.className).toContain("custom-avatar-class");
	});

	it("handles pointer events correctly without errors", () => {
		const handlePointerMove = vi.fn();
		const { container } = render(
			<Avatar onPointerMove={handlePointerMove}>Interactive</Avatar>
		);
		const avatarElement = container.firstChild as HTMLElement;

		fireEvent.pointerMove(avatarElement, { clientX: 25, clientY: 25 });
		expect(handlePointerMove).toHaveBeenCalled();
	});
});
