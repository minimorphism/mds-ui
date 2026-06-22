// Copyright (c) 2026 minimorphism
// Component Chip

import React, { useRef, useCallback, useId, useEffect } from "react";
import styles from "./Chip.module.scss";
import { registerWidget, unregisterWidget } from "../../webgl/WebGLStore";
import type { DisableVariants } from "../../types";

export type ChipProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
	variant?: DisableVariants<"dark-gray">;
};

export const Chip = React.forwardRef<HTMLButtonElement, ChipProps>(
	(
		{ variant = "white", className = "", disabled, children, ...rest },
		externalRef
	) => {
		const internalRef = useRef<HTMLButtonElement | null>(null);
		const id = useId();
		const mouseRef = useRef({ x: 0, y: 0, hover: 0, click: 0 });

		const handlePointerMove = useCallback(
			(e: React.PointerEvent) => {
				if (!internalRef.current || disabled) return;
				const rect = internalRef.current.getBoundingClientRect();
				mouseRef.current.x = e.clientX - rect.left;
				mouseRef.current.y = e.clientY - rect.top;
			},
			[disabled]
		);

		useEffect(() => {
			registerWidget(id, {
				id,
				type: "chip",
				ref: internalRef,
				mouse: mouseRef.current,
				payload: { variant, disabled: !!disabled },
				layout: {
					x: 0,
					y: 0,
					width: 0,
					height: 0,
					visualScale: 1,
					radius: 9999,
				},
			});

			return () => {
				unregisterWidget(id);
			};
		}, [id, variant, disabled]);

		const setRefs = useCallback(
			(node: HTMLButtonElement | null) => {
				internalRef.current = node;
				if (typeof externalRef === "function") externalRef(node);
				else if (externalRef) {
					(
						externalRef as React.MutableRefObject<HTMLButtonElement | null>
					).current = node;
				}
			},
			[externalRef]
		);

		return (
			<button
				ref={setRefs}
				disabled={disabled}
				className={[
					styles["mds-chip"],
					disabled
						? styles["mds-chip--disabled"]
						: styles[`mds-chip--${variant}`],
					className,
				]
					.filter(Boolean)
					.join(" ")}
				onPointerMove={handlePointerMove}
				onPointerEnter={() => {
					mouseRef.current.hover = 1;
				}}
				onPointerLeave={() => {
					mouseRef.current.hover = 0;
					mouseRef.current.click = 0;
				}}
				onPointerDown={() => {
					mouseRef.current.click = 1;
				}}
				onPointerUp={() => {
					mouseRef.current.click = 0;
				}}
				{...rest}
			>
				<span className={styles["mds-chip-text"]}>{children}</span>
			</button>
		);
	}
);
