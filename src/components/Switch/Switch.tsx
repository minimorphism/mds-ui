// Copyright (c) 2026 minimorphism
// Component Switch.tsx

import React, { useRef, useCallback, useId, useEffect, useState } from "react";
import styles from "./Switch.module.scss";
import { registerWidget, unregisterWidget } from "../../webgl/WebGLStore";

export type SwitchTheme = "white" | "black" | "anodized" | "dark-gray";
export type SwitchSize = "sm" | "md" | "lg";

export type SwitchProps = Omit<
	React.HTMLAttributes<HTMLDivElement>,
	"onChange"
> & {
	variant?: SwitchTheme;
	size?: SwitchSize;
	checked?: boolean;
	defaultChecked?: boolean;
	onChange?: (checked: boolean) => void;
	disabled?: boolean;
};

const getVariantsMapping = (theme: SwitchTheme) => {
	switch (theme) {
		case "white":
			return { track: "white", thumb: "black" };
		case "black":
			return { track: "black", thumb: "white" };
		case "anodized":
			return { track: "anodized", thumb: "dark-gray" };
		case "dark-gray":
			return { track: "dark-gray", thumb: "black" };
		default:
			return { track: "white", thumb: "black" };
	}
};

export const Switch = React.forwardRef<HTMLDivElement, SwitchProps>(
	(
		{
			variant = "white",
			size = "md",
			checked,
			defaultChecked = false,
			onChange,
			disabled = false,
			className = "",
			...rest
		},
		externalRef
	) => {
		const [internalChecked, setInternalChecked] = useState(defaultChecked);
		const isChecked = checked !== undefined ? checked : internalChecked;

		const baseId = useId();
		const trackId = `${baseId}-track`;
		const thumbId = `${baseId}-thumb`;

		const trackRef = useRef<HTMLDivElement | null>(null);
		const thumbRef = useRef<HTMLDivElement | null>(null);

		const trackMouse = useRef({ x: 0, y: 0, hover: 0, click: 0 });
		const thumbMouse = useRef({ x: 0, y: 0, hover: 0, click: 0 });

		const partsVariants = getVariantsMapping(variant);

		const triggerWebGLAnimation = useCallback(() => {
			if (
				typeof window !== "undefined" &&
				(window as any).forceWebGLRender
			) {
				(window as any).forceWebGLRender(500, true);
			}
		}, []);

		useEffect(() => {
			triggerWebGLAnimation();
		}, [isChecked, triggerWebGLAnimation]);

		useEffect(() => {
			registerWidget(trackId, {
				id: trackId,
				type: "box",
				ref: trackRef,
				mouse: trackMouse.current,
				payload: {
					variant: partsVariants.track,
					disabled,
					isBackdrop: true,
				},
				layout: {
					x: 0,
					y: 0,
					width: 0,
					height: 0,
					visualScale: 1,
					radius: 999,
				},
			});

			registerWidget(thumbId, {
				id: thumbId,
				type: "box",
				ref: thumbRef,
				mouse: thumbMouse.current,
				payload: { variant: partsVariants.thumb, disabled },
				layout: {
					x: 0,
					y: 0,
					width: 0,
					height: 0,
					visualScale: 1,
					radius: 999,
				},
			});

			return () => {
				unregisterWidget(trackId);
				unregisterWidget(thumbId);
			};
		}, [
			trackId,
			thumbId,
			partsVariants.track,
			partsVariants.thumb,
			disabled,
			size,
		]);

		const handleToggle = useCallback(() => {
			if (disabled) return;
			const newValue = !isChecked;
			if (checked === undefined) {
				setInternalChecked(newValue);
			}
			onChange?.(newValue);
			triggerWebGLAnimation();
		}, [disabled, isChecked, checked, onChange, triggerWebGLAnimation]);

		const handleTrackMove = useCallback((e: React.PointerEvent) => {
			if (!trackRef.current) return;
			const rect = trackRef.current.getBoundingClientRect();
			trackMouse.current.x = e.clientX - rect.left;
			trackMouse.current.y = e.clientY - rect.top;
		}, []);

		const handleThumbMove = useCallback((e: React.PointerEvent) => {
			if (!thumbRef.current) return;
			const rect = thumbRef.current.getBoundingClientRect();
			thumbMouse.current.x = e.clientX - rect.left;
			thumbMouse.current.y = e.clientY - rect.top;
		}, []);

		const switchClasses = [
			styles["mds-switch"],
			styles[`mds-switch--${size}`],
			isChecked && styles["mds-switch--checked"],
			disabled && styles["mds-switch--disabled"],
			className,
		]
			.filter(Boolean)
			.join(" ");

		return (
			<div
				ref={externalRef}
				className={switchClasses}
				onClick={handleToggle}
				{...rest}
			>
				<div
					ref={trackRef}
					className={[
						styles["mds-switch__track"],
						styles[`mds-switch__track--${partsVariants.track}`],
					].join(" ")}
					onPointerMove={handleTrackMove}
					onPointerEnter={() => {
						trackMouse.current.hover = 1;
						triggerWebGLAnimation();
					}}
					onPointerLeave={() => {
						trackMouse.current.hover = 0;
						trackMouse.current.click = 0;
					}}
					onPointerDown={() => {
						trackMouse.current.click = 1;
					}}
					onPointerUp={() => {
						trackMouse.current.click = 0;
					}}
				/>
				<div
					ref={thumbRef}
					className={[
						styles["mds-switch__thumb"],
						styles[`mds-switch__thumb--${partsVariants.thumb}`],
					].join(" ")}
					onPointerMove={handleThumbMove}
					onPointerEnter={() => {
						thumbMouse.current.hover = 1;
						triggerWebGLAnimation();
					}}
					onPointerLeave={() => {
						thumbMouse.current.hover = 0;
						thumbMouse.current.click = 0;
					}}
					onPointerDown={() => {
						thumbMouse.current.click = 1;
						triggerWebGLAnimation();
					}}
					onPointerUp={() => {
						thumbMouse.current.click = 0;
						triggerWebGLAnimation();
					}}
				/>
			</div>
		);
	}
);

Switch.displayName = "Switch";
