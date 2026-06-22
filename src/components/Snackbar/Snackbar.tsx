// Copyright (c) 2026 minimorphism
// Component Snackbar

import React, { useRef, useState, useCallback, useId, useEffect } from "react";
import styles from "./Snackbar.module.scss";
import { registerWidget, unregisterWidget } from "../../webgl/WebGLStore";
import type { DisableVariants } from "../../types";

export type SnackbarProps = React.HTMLAttributes<HTMLDivElement> & {
	variant?: DisableVariants<"dark-gray">;
	open: boolean;
	message: string;
	icon?: React.ReactNode;
};

const getIconVariant = (
	variant: DisableVariants<"dark-gray">
): DisableVariants<"dark-gray"> => {
	if (variant === "black") return "anodized";
	return "black";
};

export const Snackbar = React.forwardRef<HTMLDivElement, SnackbarProps>(
	(
		{
			variant = "white",
			open,
			message,
			icon,
			className = "",
			style,
			...rest
		},
		externalRef
	) => {
		const internalMainRef = useRef<HTMLDivElement | null>(null);
		const internalIconRef = useRef<HTMLDivElement | null>(null);
		const mainId = useId();
		const iconId = useId();

		const [shouldRender, setShouldRender] = useState(open);
		const [animateIn, setAnimateIn] = useState(false);

		useEffect(() => {
			if (open) {
				setShouldRender(true);
				requestAnimationFrame(() =>
					requestAnimationFrame(() => setAnimateIn(true))
				);
			} else {
				setAnimateIn(false);
			}
		}, [open]);

		const handleTransitionEnd = () => {
			if (!open && !animateIn) setShouldRender(false);
		};

		const iconVariant = getIconVariant(variant);

		useEffect(() => {
			if (shouldRender) {
				registerWidget(mainId, {
					id: mainId,
					type: "snackbar",
					ref: internalMainRef,
					mouse: { x: 0, y: 0, hover: 0, click: 0 },
					payload: { variant },
					layout: {
						x: 0,
						y: 0,
						width: 0,
						height: 0,
						visualScale: 1,
						radius: 20,
					},
				});

				if (icon) {
					registerWidget(iconId, {
						id: iconId,
						type: "snackbar",
						ref: internalIconRef,
						mouse: { x: 0, y: 0, hover: 0, click: 0 },
						payload: { variant: iconVariant },
						layout: {
							x: 0,
							y: 0,
							width: 0,
							height: 0,
							visualScale: 1,
							radius: 20,
						},
					});
				}
			}

			return () => {
				unregisterWidget(mainId);
				unregisterWidget(iconId);
			};
		}, [shouldRender, mainId, iconId, variant, iconVariant, icon]);

		const setRefs = useCallback(
			(node: HTMLDivElement | null) => {
				internalMainRef.current = node;
				if (typeof externalRef === "function") externalRef(node);
				else if (externalRef) {
					(
						externalRef as React.MutableRefObject<HTMLDivElement | null>
					).current = node;
				}
			},
			[externalRef]
		);

		if (!shouldRender) return null;

		return (
			<div
				className={[
					styles["mds-snackbar-wrapper"],
					"gl-fade",
					animateIn && styles["mds-snackbar-wrapper--open"],
				]
					.filter(Boolean)
					.join(" ")}
				onTransitionEnd={handleTransitionEnd}
			>
				<div
					ref={setRefs}
					className={[
						styles["mds-snackbar"],
						styles[`mds-snackbar--${variant}`],
						className,
					]
						.filter(Boolean)
						.join(" ")}
					style={style}
					{...rest}
				>
					{icon && (
						<div
							ref={internalIconRef}
							className={[
								styles["mds-snackbar-icon"],
								styles[`mds-snackbar-icon--${iconVariant}`],
							].join(" ")}
						>
							{icon}
						</div>
					)}
					<span className={styles["mds-snackbar-text"]}>
						{message}
					</span>
				</div>
			</div>
		);
	}
);
