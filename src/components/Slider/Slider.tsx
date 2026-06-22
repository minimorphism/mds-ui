// Copyright (c) 2026 minimorphism
// Component Slider

import React, { useRef, useState, useCallback, useId, useEffect } from "react";
import styles from "./Slider.module.scss";
import { registerWidget, unregisterWidget } from "../../webgl/WebGLStore";
import type { Variant } from "../../types";

export type SliderSize = "sm" | "md" | "lg";

export type SliderProps = Omit<
	React.HTMLAttributes<HTMLDivElement>,
	"onChange"
> & {
	variant?: Variant;
	size?: SliderSize;
	value?: number;
	defaultValue?: number;
	min?: number;
	max?: number;
	step?: number;
	disabled?: boolean;
	onChange?: (value: number) => void;
};

const getThumbVariant = (variant: Variant): Variant => {
	switch (variant) {
		case "white":
			return "black";
		case "black":
			return "white";
		case "anodized":
			return "black";
		case "dark-gray":
			return "anodized";
		default:
			return "white";
	}
};

export const Slider = React.forwardRef<HTMLDivElement, SliderProps>(
	(
		{
			variant = "white",
			size = "md",
			value,
			defaultValue = 0,
			min = 0,
			max = 100,
			step = 1,
			disabled = false,
			onChange,
			className = "",
			style,
			...rest
		},
		externalRef
	) => {
		const isControlled = value !== undefined;
		const [internalValue, setInternalValue] = useState(
			isControlled ? value : defaultValue
		);
		const currentValue = isControlled ? value : internalValue;

		const internalTrackRef = useRef<HTMLDivElement | null>(null);
		const internalThumbRef = useRef<HTMLDivElement | null>(null);
		const trackId = useId();
		const thumbId = useId();

		const mouseTrackRef = useRef({ x: 0, y: 0, hover: 0, click: 0 });
		const mouseThumbRef = useRef({ x: 0, y: 0, hover: 0, click: 0 });
		const isDragging = useRef(false);

		const thumbVariant = getThumbVariant(variant);

		const calculateValueFromPointer = useCallback(
			(clientX: number) => {
				if (!internalTrackRef.current) return currentValue;
				const rect = internalTrackRef.current.getBoundingClientRect();
				const percent = Math.max(
					0,
					Math.min(1, (clientX - rect.left) / rect.width)
				);
				const rawValue = min + percent * (max - min);

				if (step > 0) {
					const stepped = Math.round(rawValue / step) * step;
					return Math.max(min, Math.min(max, stepped));
				}
				return Math.max(min, Math.min(max, rawValue));
			},
			[min, max, step, currentValue]
		);

		const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
			if (disabled) return;
			isDragging.current = true;
			mouseTrackRef.current.click = 1;
			mouseThumbRef.current.click = 1;

			if (internalTrackRef.current) {
				internalTrackRef.current.setPointerCapture(e.pointerId);
			}

			const newValue = calculateValueFromPointer(e.clientX);
			if (!isControlled) setInternalValue(newValue);
			if (onChange && newValue !== currentValue) onChange(newValue);
		};

		const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
			if (disabled) return;

			if (internalTrackRef.current) {
				const rect = internalTrackRef.current.getBoundingClientRect();
				mouseTrackRef.current.x = e.clientX - rect.left;
				mouseTrackRef.current.y = e.clientY - rect.top;
			}
			if (internalThumbRef.current) {
				const rect = internalThumbRef.current.getBoundingClientRect();
				mouseThumbRef.current.x = e.clientX - rect.left;
				mouseThumbRef.current.y = e.clientY - rect.top;
			}

			if (isDragging.current) {
				const newValue = calculateValueFromPointer(e.clientX);
				if (!isControlled) setInternalValue(newValue);
				if (onChange && newValue !== currentValue) onChange(newValue);
			}
		};

		const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
			if (disabled) return;
			isDragging.current = false;
			mouseTrackRef.current.click = 0;
			mouseThumbRef.current.click = 0;

			if (internalTrackRef.current) {
				internalTrackRef.current.releasePointerCapture(e.pointerId);
			}
		};

		useEffect(() => {
			const percent = (currentValue - min) / (max - min);

			registerWidget(trackId, {
				id: trackId,
				type: "slider",
				ref: internalTrackRef,
				mouse: mouseTrackRef.current,
				payload: { variant, size },
				layout: {
					x: 0,
					y: 0,
					width: 0,
					height: 0,
					visualScale: 1,
					radius: 20,
				},
			});

			registerWidget(thumbId, {
				id: thumbId,
				type: "slider-thumb",
				ref: internalThumbRef,
				mouse: mouseThumbRef.current,
				payload: { variant: thumbVariant, size, value: percent },
				layout: {
					x: 0,
					y: 0,
					width: 0,
					height: 0,
					visualScale: 1,
					radius: 20,
				},
			});

			const trackNode = internalTrackRef.current;
			let resizeObserver: ResizeObserver | null = null;

			if (trackNode) {
				resizeObserver = new ResizeObserver(() => {
					if (
						typeof window !== "undefined" &&
						(window as any).forceWebGLRender
					) {
						(window as any).forceWebGLRender(150, true);
					}
				});
				resizeObserver.observe(trackNode);
			}

			return () => {
				if (resizeObserver) resizeObserver.disconnect();
				unregisterWidget(trackId);
				unregisterWidget(thumbId);
			};
		}, [
			trackId,
			thumbId,
			variant,
			thumbVariant,
			size,
			currentValue,
			min,
			max,
		]);

		const setRefs = useCallback(
			(node: HTMLDivElement | null) => {
				internalTrackRef.current = node;
				if (typeof externalRef === "function") externalRef(node);
				else if (externalRef) {
					(
						externalRef as React.MutableRefObject<HTMLDivElement | null>
					).current = node;
				}
			},
			[externalRef]
		);

		const percent = (currentValue - min) / (max - min);

		return (
			<div
				ref={setRefs}
				role="slider"
				aria-valuemin={min}
				aria-valuemax={max}
				aria-valuenow={currentValue}
				aria-disabled={disabled}
				className={[
					styles["mds-slider"],
					styles[`mds-slider--${variant}`],
					styles[`mds-slider--${size}`],
					disabled && styles["mds-slider--disabled"],
					className,
				]
					.filter(Boolean)
					.join(" ")}
				style={
					{
						...style,
						"--slider-progress": `${percent * 100}%`,
					} as React.CSSProperties
				}
				onPointerDown={handlePointerDown}
				onPointerMove={handlePointerMove}
				onPointerUp={handlePointerUp}
				onPointerEnter={() => {
					mouseTrackRef.current.hover = 1;
					mouseThumbRef.current.hover = 1;
				}}
				onPointerLeave={(e) => {
					if (!isDragging.current) {
						mouseTrackRef.current.hover = 0;
						mouseThumbRef.current.hover = 0;
					}
					handlePointerUp(e);
				}}
				{...rest}
			>
				<div
					ref={internalThumbRef}
					className={[
						styles["mds-slider-thumb"],
						styles[`mds-slider-thumb--${thumbVariant}`],
					].join(" ")}
					style={{}}
				/>
			</div>
		);
	}
);
