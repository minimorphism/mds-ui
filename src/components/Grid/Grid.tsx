// Copyright (c) 2026 minimorphism
// Component Grid

import React, { useRef, useCallback, useId, useEffect } from "react";
import styles from "./Grid.module.scss";
import { registerWidget, unregisterWidget } from "../../webgl/WebGLStore";
import type { DisableVariants } from "../../types";

export type GridProps = React.HTMLAttributes<HTMLDivElement> & {
	variant?: DisableVariants<"dark-gray">;
	disabled?: boolean;
};

export const Grid = React.forwardRef<HTMLDivElement, GridProps>(
	(
		{
			variant = "white",
			disabled = false,
			className = "",
			children,
			...rest
		},
		externalRef
	) => {
		const internalRef = useRef<HTMLDivElement | null>(null);
		const id = useId();
		const mouseRef = useRef({ x: 0, y: 0, hover: 0, click: 0 });

		const handlePointerMove = useCallback((e: React.PointerEvent) => {
			if (!internalRef.current) return;
			const rect = internalRef.current.getBoundingClientRect();
			mouseRef.current.x = e.clientX - rect.left;
			mouseRef.current.y = e.clientY - rect.top;
		}, []);

		useEffect(() => {
			registerWidget(id, {
				id,
				type: "grid",
				ref: internalRef,
				mouse: mouseRef.current,
				payload: { variant, disabled },
				layout: {
					x: 0,
					y: 0,
					width: 0,
					height: 0,
					visualScale: 1,
					radius: 20,
				},
			});

			return () => {
				unregisterWidget(id);
			};
		}, [id, variant, disabled]);

		const setRefs = useCallback(
			(node: HTMLDivElement | null) => {
				internalRef.current = node;
				if (typeof externalRef === "function") externalRef(node);
				else if (externalRef) {
					(
						externalRef as React.MutableRefObject<HTMLDivElement | null>
					).current = node;
				}
			},
			[externalRef]
		);

		return (
			<div
				ref={setRefs}
				className={[
					styles["mds-grid"],
					disabled
						? styles["mds-grid--disabled"]
						: styles[`mds-grid--${variant}`],
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
				{children}
			</div>
		);
	}
);
