// Copyright (c) 2026 minimorphism
// Component Avatar

import React, { useRef, useId, useEffect, useCallback } from "react";
import styles from "./Avatar.module.scss";
import { registerWidget, unregisterWidget } from "../../webgl/WebGLStore";
import type { DisableVariants } from "../../types";

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
	variant?: DisableVariants<"dark-gray">;
	src?: string;
	alt?: string;
}

export const Avatar: React.FC<AvatarProps> = ({
	variant = "white",
	src,
	alt = "User Avatar",
	className = "",
	...rest
}) => {
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
			type: "button",
			ref: internalRef,
			mouse: mouseRef.current,
			payload: {
				variant: variant,
				disabled: false,
			},
			layout: {
				x: 0,
				y: 0,
				width: 0,
				height: 0,
				visualScale: 1,
				radius: 16,
			},
		});

		return () => {
			unregisterWidget(id);
		};
	}, [id, variant]);

	return (
		<div
			ref={internalRef}
			className={[
				styles["mds-avatar"],
				styles[`mds-avatar--${variant}`],
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
			{src ? (
				<img
					className={styles["mds-avatar__image"]}
					src={src}
					alt={alt}
				/>
			) : (
				<div className={styles["mds-avatar__placeholder"]}>
					<div className={styles["mds-avatar__head"]} />
					<div className={styles["mds-avatar__body"]} />
				</div>
			)}
		</div>
	);
};
