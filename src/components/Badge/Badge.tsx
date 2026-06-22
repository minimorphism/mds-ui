// Copyright (c) 2026 minimorphism
// Component Badge

import React, { useRef, useCallback, useId, useEffect } from "react";
import styles from "./Badge.module.scss";
import { registerWidget, unregisterWidget } from "../../webgl/WebGLStore";
import type { DisableVariants } from "../../types";

export type BadgeProps = React.HTMLAttributes<HTMLDivElement> & {
	variant?: DisableVariants<"dark-gray">;
	content: React.ReactNode;
};

export const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
	(
		{ variant = "black", content, children, className = "", ...rest },
		externalRef
	) => {
		const containerRef = useRef<HTMLDivElement | null>(null);
		const badgeRef = useRef<HTMLDivElement | null>(null);
		const id = useId();
		const mouseRef = useRef({ x: 0, y: 0, hover: 0, click: 0 });

		const handlePointerMove = useCallback((e: React.PointerEvent) => {
			if (!badgeRef.current) return;
			const rect = badgeRef.current.getBoundingClientRect();
			mouseRef.current.x = e.clientX - rect.left;
			mouseRef.current.y = e.clientY - rect.top;
		}, []);

		useEffect(() => {
			registerWidget(id, {
				id,
				type: "badge",
				ref: badgeRef,
				mouse: mouseRef.current,
				payload: { variant },
				layout: {
					x: 0,
					y: 0,
					width: 0,
					height: 0,
					visualScale: 1,
					radius: 14,
				},
			});
			return () => {
				unregisterWidget(id);
			};
		}, [id, variant]);

		const setRefs = useCallback(
			(node: HTMLDivElement | null) => {
				containerRef.current = node;
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
				className={[styles["mds-badge-container"], className]
					.filter(Boolean)
					.join(" ")}
				{...rest}
			>
				<div className={styles["mds-badge-target"]}>{children}</div>
				<div
					ref={badgeRef}
					className={[
						styles["mds-badge"],
						styles[`mds-badge--${variant}`],
					].join(" ")}
					onPointerMove={handlePointerMove}
					onPointerEnter={() => {
						mouseRef.current.hover = 1;
					}}
					onPointerLeave={() => {
						mouseRef.current.hover = 0;
						mouseRef.current.click = 0;
					}}
				>
					<div className={styles["mds-badge-content"]}>{content}</div>
				</div>
			</div>
		);
	}
);
