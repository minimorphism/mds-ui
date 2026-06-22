// Copyright (c) 2026 minimorphism
// Component Progress

import React, { useRef, useId, useEffect } from "react";
import styles from "./Progress.module.scss";
import { registerWidget, unregisterWidget } from "../../webgl/WebGLStore";
import type { Variant } from "../../types";

export type ProgressProps = {
	variant?: Variant;
	progress: number;
};

const getInnerVariant = (outerVariant: Variant): Variant => {
	switch (outerVariant) {
		case "white":
		case "anodized":
			return "black";
		case "black":
			return "white";
		case "dark-gray":
			return "black";
		default:
			return outerVariant;
	}
};

export const Progress: React.FC<ProgressProps> = ({
	variant = "white",
	progress,
}) => {
	const outerRef = useRef<HTMLDivElement | null>(null);
	const innerRef = useRef<HTMLDivElement | null>(null);

	const outerId = useId();
	const innerId = `${outerId}-inner`;

	const boundedProgress = Math.max(0, Math.min(100, progress));
	const innerVariant = getInnerVariant(variant);

	useEffect(() => {
		if (typeof window !== "undefined" && (window as any).forceWebGLRender) {
			(window as any).forceWebGLRender(450, true);
		}
	}, [progress]);

	useEffect(() => {
		registerWidget(outerId, {
			id: outerId,
			type: "progress",
			ref: outerRef,
			mouse: { x: 0, y: 0, hover: 0, click: 0 },
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
			unregisterWidget(outerId);
		};
	}, [outerId, variant]);

	useEffect(() => {
		registerWidget(innerId, {
			id: innerId,
			type: "progress-inner",
			ref: innerRef,
			mouse: { x: 0, y: 0, hover: 0, click: 0 },
			payload: { variant: innerVariant },
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
			unregisterWidget(innerId);
		};
	}, [innerId, innerVariant]);

	return (
		<div
			ref={outerRef}
			className={[
				styles["mds-progress"],
				styles[`mds-progress--${variant}`],
			].join(" ")}
		>
			<div
				ref={innerRef}
				className={styles["mds-progress-inner"]}
				style={{ width: `${boundedProgress}%` }}
			/>
		</div>
	);
};
