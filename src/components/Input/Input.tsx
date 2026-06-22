// Copyright (c) 2026 minimorphism
// Component Input

import React, { useRef, useState, useCallback, useId, useEffect } from "react";
import styles from "./Input.module.scss";
import { registerWidget, unregisterWidget } from "../../webgl/WebGLStore";
import { Icons } from "../Icons/Icons";
import type { Variant } from "../../types";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> &
	React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
		variant?: Variant;
		size?: "sm" | "md" | "lg";
		isPassword?: boolean;
		multiline?: boolean;
		icon?: React.ReactNode;
	};

export const Input = React.forwardRef<
	HTMLInputElement | HTMLTextAreaElement,
	InputProps
>(
	(
		{
			variant = "white",
			size = "md",
			className = "",
			isPassword,
			multiline,
			disabled,
			icon,
			...rest
		},
		externalRef
	) => {
		const containerRef = useRef<HTMLDivElement>(null);
		const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);
		const id = useId();

		const [showPassword, setShowPassword] = useState(false);
		const [mouseState, setMouseState] = useState({
			x: 0,
			y: 0,
			hover: 0,
			click: 0,
		});

		const handleMouseMove = useCallback((e: React.MouseEvent) => {
			if (!containerRef.current) return;
			const rect = containerRef.current.getBoundingClientRect();
			setMouseState((p) => ({
				...p,
				x: e.clientX - rect.left,
				y: e.clientY - rect.top,
			}));
		}, []);

		useEffect(() => {
			registerWidget(id, {
				id,
				type: "input",
				ref: containerRef,
				mouse: mouseState,
				payload: {
					variant,
					disabled: !!disabled,
					multiline: !!multiline,
				},
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
		}, [id, variant, mouseState, disabled, multiline]);

		const setRefs = useCallback(
			(node: HTMLInputElement | HTMLTextAreaElement | null) => {
				// @ts-ignore
				inputRef.current = node;
				if (typeof externalRef === "function") externalRef(node);
				else if (externalRef) {
					(
						externalRef as React.MutableRefObject<
							HTMLInputElement | HTMLTextAreaElement | null
						>
					).current = node;
				}
			},
			[externalRef]
		);

		return (
			<div
				ref={containerRef}
				className={[
					styles["mds-input-container"],
					disabled
						? styles["mds-input-container--disabled"]
						: styles[`mds-input-container--${variant}`],
					size !== "md" && styles[`mds-input-container--${size}`],
					multiline && styles["mds-input-container--multiline"],
					icon && styles["mds-input-container--with-icon"],
					className,
				]
					.filter(Boolean)
					.join(" ")}
				onMouseMove={handleMouseMove}
				onMouseEnter={() => setMouseState((p) => ({ ...p, hover: 1 }))}
				onMouseLeave={() =>
					setMouseState((p) => ({ ...p, hover: 0, click: 0 }))
				}
				onMouseDown={() => setMouseState((p) => ({ ...p, click: 1 }))}
				onMouseUp={() => setMouseState((p) => ({ ...p, click: 0 }))}
			>
				{icon && (
					<div
						className={styles["mds-input-icon"]}
						aria-hidden="true"
					>
						{icon}
					</div>
				)}

				{multiline ? (
					<textarea
						ref={setRefs as React.Ref<HTMLTextAreaElement>}
						className={[
							styles["mds-input-field"],
							icon && styles["mds-input-field--with-icon"],
						]
							.filter(Boolean)
							.join(" ")}
						disabled={disabled}
						{...rest}
					/>
				) : (
					<input
						ref={setRefs as React.Ref<HTMLInputElement>}
						type={
							isPassword && !showPassword
								? "password"
								: rest.type || "text"
						}
						className={[
							styles["mds-input-field"],
							isPassword && styles["mds-input-field--password"],
							icon && styles["mds-input-field--with-icon"],
						]
							.filter(Boolean)
							.join(" ")}
						disabled={disabled}
						{...rest}
					/>
				)}

				{isPassword && !multiline && (
					<button
						type="button"
						className={styles["mds-input-eye"]}
						onClick={(e) => {
							e.preventDefault();
							setShowPassword(!showPassword);
						}}
						tabIndex={-1}
					>
						{showPassword ? (
							<Icons.EyeOpenIcon size={33} />
						) : (
							<Icons.EyeClosedIcon size={33} />
						)}
					</button>
				)}
			</div>
		);
	}
);

Input.displayName = "Input";
