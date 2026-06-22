// Copyright (c) 2026 minimorphism
// Tests for Modal

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Modal } from "./Modal";

vi.mock("../../webgl/WebGLStore", () => ({
	registerWidget: vi.fn(),
	unregisterWidget: vi.fn(),
}));

describe("Modal Component", () => {
	it("does not render when open is false", () => {
		const { container } = render(
			<Modal open={false} onClose={vi.fn()}>
				Content
			</Modal>
		);
		expect(container.firstChild).toBeNull();
	});

	it("renders correctly with default props when open is true", () => {
		const { container } = render(
			<Modal open={true} onClose={vi.fn()}>
				Modal Content
			</Modal>
		);
		const overlay = container.querySelector('[class*="mds-modal-overlay"]');
		expect(overlay).toBeInTheDocument();
		expect(overlay?.className).toContain("mds-modal-overlay");

		const box = container.querySelector('[class*="mds-modal-box"]');
		expect(box).toBeInTheDocument();
		expect(box?.className).toContain("mds-modal-box--white");

		expect(screen.getByText("Modal Content")).toBeInTheDocument();
	});

	it("applies the specified variant class name", () => {
		const { container } = render(
			<Modal open={true} variant="black" onClose={vi.fn()}>
				Content
			</Modal>
		);
		const box = container.querySelector('[class*="mds-modal-box"]');
		expect(box).toBeInTheDocument();
		expect(box?.className).toContain("mds-modal-box--black");
	});

	it("calls onClose when the overlay is clicked", () => {
		const handleClose = vi.fn();
		const { container } = render(
			<Modal open={true} onClose={handleClose}>
				Content
			</Modal>
		);
		const overlay = container.querySelector('[class*="mds-modal-overlay"]');
		if (overlay) {
			fireEvent.mouseDown(overlay);
		}
		expect(handleClose).toHaveBeenCalledTimes(1);
	});
});