// Copyright (c) 2026 minimorphism
// Component Link

import React, { useRef, useCallback, useId, useEffect } from "react";
import styles from "./Link.module.scss";
import { registerWidget, unregisterWidget } from "../../webgl/WebGLStore";
import type { PillVariant } from "../../types";

export type LinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
	variant: PillVariant;
};

export const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
	({ variant, className = "", children, ...rest }, externalRef) => {
		const internalRef = useRef<HTMLAnchorElement | null>(null);
		const id = useId();
		const mouseRef = useRef({ x: 0, y: 0, hover: 0, click: 0 });

		const isPill = variant === "black-pill" || variant === "white-pill";

		const handlePointerMove = useCallback(
			(e: React.PointerEvent) => {
				if (!internalRef.current || !isPill) return;
				const rect = internalRef.current.getBoundingClientRect();
				mouseRef.current.x = e.clientX - rect.left;
				mouseRef.current.y = e.clientY - rect.top;
			},
			[isPill]
		);

		useEffect(() => {
			if (!isPill) return;

			registerWidget(id, {
				id,
				type: "link",
				ref: internalRef,
				mouse: mouseRef.current,
				payload: { variant },
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
		}, [id, variant, isPill]);

		const setRefs = useCallback(
			(node: HTMLAnchorElement | null) => {
				internalRef.current = node;
				if (typeof externalRef === "function") externalRef(node);
				else if (externalRef) {
					(
						externalRef as React.MutableRefObject<HTMLAnchorElement | null>
					).current = node;
				}
			},
			[externalRef]
		);

		return (
			<a
				ref={setRefs}
				className={[
					styles["mds-link"],
					styles[`mds-link--${variant}`],
					className,
				]
					.filter(Boolean)
					.join(" ")}
				onPointerMove={handlePointerMove}
				onPointerEnter={() => {
					if (isPill) mouseRef.current.hover = 1;
				}}
				onPointerLeave={() => {
					if (isPill) {
						mouseRef.current.hover = 0;
						mouseRef.current.click = 0;
					}
				}}
				onPointerDown={() => {
					if (isPill) mouseRef.current.click = 1;
				}}
				onPointerUp={() => {
					if (isPill) mouseRef.current.click = 0;
				}}
				{...rest}
			>
				<span className={styles["mds-link-text"]}>{children}</span>
			</a>
		);
	}
);
