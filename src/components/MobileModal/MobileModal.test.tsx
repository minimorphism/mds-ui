// Copyright (c) 2026 minimorphism
// Tests for MobileModal

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { MobileModal } from "./MobileModal";

vi.mock("../../webgl/WebGLStore", () => ({
	registerWidget: vi.fn(),
	unregisterWidget: vi.fn(),
}));

describe("MobileModal Component", () => {
	it("does not render when closed", () => {
		const { container } = render(
			<MobileModal open={false} onClose={vi.fn()} title="Alert">
				Content
			</MobileModal>
		);
		expect(container.firstChild).toBeNull();
	});

	it("renders title and content when open", () => {
		render(
			<MobileModal open={true} onClose={vi.fn()} title="Security Warning">
				<div>decoy payload</div>
			</MobileModal>
		);
		expect(screen.getByText("Security Warning")).toBeInTheDocument();
		expect(screen.getByText("decoy payload")).toBeInTheDocument();
	});

	it("calls onClose when close button is clicked", () => {
		const handleClose = vi.fn();
		render(
			<MobileModal open={true} onClose={handleClose} title="Close test">
				Content
			</MobileModal>
		);

		const closeBtn = screen.getByRole("button");
		fireEvent.click(closeBtn);
		expect(handleClose).toHaveBeenCalledTimes(1);
	});
});
