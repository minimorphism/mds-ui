// Copyright (c) 2026 minimorphism
// Component Stack

import React, { useRef, useCallback, useId, useEffect } from "react";
import styles from "./Stack.module.scss";
import { registerWidget, unregisterWidget } from "../../webgl/WebGLStore";
import type { Variant } from "../../types";

export type StackProps = React.HTMLAttributes<HTMLDivElement> & {
	variant?: Variant;
};

export const Stack = React.forwardRef<HTMLDivElement, StackProps>(
	({ variant = "white", className = "", children, ...rest }, externalRef) => {
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
				type: "stack",
				ref: internalRef,
				mouse: mouseRef.current,
				payload: { variant },
				layout: {
					x: 0,
					y: 0,
					width: 0,
					height: 0,
					visualScale: 1,
					radius: 10,
				},
			});

			const node = internalRef.current;
			let resizeObserver: ResizeObserver | null = null;

			if (node) {
				resizeObserver = new ResizeObserver(() => {
					if (
						typeof window !== "undefined" &&
						(window as any).forceWebGLRender
					) {
						(window as any).forceWebGLRender(150, true);
					}
				});
				resizeObserver.observe(node);
			}

			return () => {
				if (resizeObserver) {
					resizeObserver.disconnect();
				}
				unregisterWidget(id);
			};
		}, [id, variant]);

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
					styles["mds-stack"],
					styles[`mds-stack--${variant}`],
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
				{...rest}
			>
				<div className={styles["mds-stack-content"]}>{children}</div>
			</div>
		);
	}
);
