// Copyright (c) 2026 minimorphism
// Component Button

import React, { useRef, useCallback, useId, useEffect } from "react";
import styles from "./Button.module.scss";
import { registerWidget, unregisterWidget } from "../../webgl/WebGLStore";
import type { Variant } from "../../types";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
	variant?: Variant;
	size?: "sm" | "md" | "lg";
	radius?: number | [number, number, number, number];
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	(
		{
			variant = "white",
			size = "md",
			radius,
			className = "",
			disabled,
			children,
			...rest
		},
		externalRef
	) => {
		const internalRef = useRef<HTMLButtonElement | null>(null);
		const id = useId();
		const mouseRef = useRef({ x: 0, y: 0, hover: 0, click: 0 });

		const defaultRadius = size === "sm" || size === "lg" ? 32 : 20;
		const currentRadius = radius !== undefined ? radius : defaultRadius;

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
				type: "button",
				ref: internalRef,
				mouse: mouseRef.current,
				payload: { variant, disabled: !!disabled },
				layout: {
					x: 0,
					y: 0,
					width: 0,
					height: 0,
					visualScale: 1,
					radius: currentRadius,
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
					styles["mds-button"],
					disabled
						? styles["mds-button--disabled"]
						: styles[`mds-button--${variant}`],
					size !== "md" && styles[`mds-button--${size}`],
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
				<span className={styles["mds-button-text"]}>{children}</span>
			</button>
		);
	}
);
