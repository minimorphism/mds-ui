// Copyright (c) 2026 minimorphism
// Tests for Link

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { Link } from "./Link";
import { registerWidget, unregisterWidget } from "../../webgl/WebGLStore";

vi.mock("../../webgl/WebGLStore", () => ({
	registerWidget: vi.fn(),
	unregisterWidget: vi.fn(),
}));

describe("Link Component", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("renders correctly with custom text and standard tag name", () => {
		render(
			<Link variant="black-text" href="https://example.com">
				Click here
			</Link>
		);
		const linkElement = screen.getByRole("link");

		expect(linkElement).toBeInTheDocument();
		expect(linkElement.tagName).toBe("A");
		expect(linkElement).toHaveAttribute("href", "https://example.com");
		expect(linkElement).toHaveTextContent("Click here");
	});

	it("applies the specified variant class name", () => {
		const { container } = render(<Link variant="white-pill">Label</Link>);
		const element = container.firstChild as HTMLElement;

		expect(element.className).toContain("mds-link");
		expect(element.className).toContain("mds-link--white-pill");
	});

	it("registers the widget in WebGLStore only for pill variants", () => {
		render(<Link variant="black-pill">Pill Link</Link>);
		expect(registerWidget).toHaveBeenCalledTimes(1);

		vi.clearAllMocks();
		render(<Link variant="black-text">Text Link</Link>);
		expect(registerWidget).not.toHaveBeenCalled();
	});

	it("unregisters the widget on unmount for pill variants", () => {
		const { unmount } = render(<Link variant="white-pill">Pill Link</Link>);
		unmount();
		expect(unregisterWidget).toHaveBeenCalledTimes(1);
	});
});
