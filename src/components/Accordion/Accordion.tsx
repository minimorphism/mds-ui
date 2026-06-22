// Copyright (c) 2026 minimorphism
// Component Accordion

import React, { useRef, useState, useCallback, useId, useEffect } from "react";
import styles from "./Accordion.module.scss";
import { registerWidget, unregisterWidget } from "../../webgl/WebGLStore";
import { Icons } from "../Icons/Icons";
import type { DisableVariants } from "../../types";

export type AccordionProps = Omit<
	React.HTMLAttributes<HTMLDivElement>,
	"onChange" | "title"
> & {
	variant?: DisableVariants<"dark-gray">;
	title: React.ReactNode;
	open?: boolean;
	defaultOpen?: boolean;
	onChange?: (isOpen: boolean) => void;
};

const getIconVariant = (
	variant: DisableVariants<"dark-gray">
): DisableVariants<"dark-gray"> | "dark-gray" => {
	switch (variant) {
		case "white":
			return "black";
		case "black":
			return "white";
		case "anodized":
			return "black";
		default:
			return "white";
	}
};

const getBodyVariant = (
	variant: DisableVariants<"dark-gray">
): DisableVariants<"dark-gray"> | "dark-gray" => {
	if (variant === "black") return "dark-gray";
	return variant;
};

export const Accordion = React.forwardRef<HTMLDivElement, AccordionProps>(
	(
		{
			variant = "white",
			title,
			children,
			open,
			defaultOpen = false,
			onChange,
			className = "",
			style,
			...rest
		},
		externalRef
	) => {
		const isControlled = open !== undefined;
		const [internalOpen, setInternalOpen] = useState(
			isControlled ? open : defaultOpen
		);
		const isOpen = isControlled ? open : internalOpen;

		const internalContainerRef = useRef<HTMLDivElement | null>(null);
		const internalHeaderRef = useRef<HTMLButtonElement | null>(null);
		const internalBodyRef = useRef<HTMLDivElement | null>(null);
		const internalIconRef = useRef<HTMLDivElement | null>(null);

		const headerId = useId();
		const bodyId = useId();
		const iconId = useId();

		const mouseHeaderRef = useRef({ x: 0, y: 0, hover: 0, click: 0 });
		const mouseBodyRef = useRef({ x: 0, y: 0, hover: 0, click: 0 });
		const mouseIconRef = useRef({ x: 0, y: 0, hover: 0, click: 0 });

		const iconVariant = getIconVariant(variant);
		const bodyVariant = getBodyVariant(variant);

		const handleToggle = () => {
			const newState = !isOpen;
			if (!isControlled) setInternalOpen(newState);
			if (onChange) onChange(newState);
		};

		const handlePointerMove = (e: React.PointerEvent) => {
			if (internalHeaderRef.current) {
				const rect = internalHeaderRef.current.getBoundingClientRect();
				mouseHeaderRef.current.x = e.clientX - rect.left;
				mouseHeaderRef.current.y = e.clientY - rect.top;
			}
			if (internalBodyRef.current) {
				const rect = internalBodyRef.current.getBoundingClientRect();
				mouseBodyRef.current.x = e.clientX - rect.left;
				mouseBodyRef.current.y = e.clientY - rect.top;
			}
			if (internalIconRef.current) {
				const rect = internalIconRef.current.getBoundingClientRect();
				mouseIconRef.current.x = e.clientX - rect.left;
				mouseIconRef.current.y = e.clientY - rect.top;
			}
		};

		useEffect(() => {
			if (
				typeof window !== "undefined" &&
				(window as any).forceWebGLRender
			) {
				(window as any).forceWebGLRender(350, true);
			}
		}, [isOpen]);

		useEffect(() => {
			registerWidget(headerId, {
				id: headerId,
				type: "accordion-header",
				ref: internalHeaderRef,
				mouse: mouseHeaderRef.current,
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

			registerWidget(bodyId, {
				id: bodyId,
				type: "accordion-body",
				ref: internalBodyRef,
				mouse: mouseBodyRef.current,
				payload: { variant: bodyVariant },
				layout: {
					x: 0,
					y: 0,
					width: 0,
					height: 0,
					visualScale: 1,
					radius: 20,
				},
			});

			registerWidget(iconId, {
				id: iconId,
				type: "accordion-icon",
				ref: internalIconRef,
				mouse: mouseIconRef.current,
				payload: { variant: iconVariant },
				layout: {
					x: 0,
					y: 0,
					width: 0,
					height: 0,
					visualScale: 1,
					radius: 15,
				},
			});

			const containerNode = internalContainerRef.current;
			let resizeObserver: ResizeObserver | null = null;

			if (containerNode) {
				resizeObserver = new ResizeObserver(() => {
					if (
						typeof window !== "undefined" &&
						(window as any).forceWebGLRender
					) {
						(window as any).forceWebGLRender(150, true);
					}
				});
				resizeObserver.observe(containerNode);
			}

			return () => {
				if (resizeObserver) resizeObserver.disconnect();
				unregisterWidget(headerId);
				unregisterWidget(bodyId);
				unregisterWidget(iconId);
			};
		}, [headerId, bodyId, iconId, variant, bodyVariant, iconVariant]);

		const setRefs = useCallback(
			(node: HTMLDivElement | null) => {
				internalContainerRef.current = node;
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
					styles["mds-accordion"],
					styles[`mds-accordion--${variant}`],
					className,
				]
					.filter(Boolean)
					.join(" ")}
				style={style}
				onPointerMove={handlePointerMove}
				onPointerEnter={() => {
					mouseBodyRef.current.hover = 1;
				}}
				onPointerLeave={() => {
					mouseBodyRef.current.hover = 0;
				}}
				{...rest}
			>
				<div
					ref={internalBodyRef}
					className={[
						styles["mds-accordion-body-bg"],
						styles[`mds-accordion-body-bg--${bodyVariant}`],
					].join(" ")}
				/>

				<button
					ref={internalHeaderRef}
					type="button"
					className={styles["mds-accordion-header"]}
					onClick={handleToggle}
					onPointerEnter={() => {
						mouseHeaderRef.current.hover = 1;
						mouseIconRef.current.hover = 1;
					}}
					onPointerLeave={() => {
						mouseHeaderRef.current.hover = 0;
						mouseIconRef.current.hover = 0;
						mouseIconRef.current.click = 0;
					}}
					onPointerDown={() => {
						mouseIconRef.current.click = 1;
					}}
					onPointerUp={() => {
						mouseIconRef.current.click = 0;
					}}
					aria-expanded={isOpen}
				>
					<span className={styles["mds-accordion-title"]}>
						{title}
					</span>
					<div
						ref={internalIconRef}
						className={[
							styles["mds-accordion-icon-box"],
							styles[`mds-accordion-icon-box--${iconVariant}`],
						].join(" ")}
					>
						<Icons.ChevronIconAccordion
							className={[
								styles["mds-accordion-chevron"],
								isOpen && styles["mds-accordion-chevron--open"],
							]
								.filter(Boolean)
								.join(" ")}
						/>
					</div>
				</button>

				<div
					className={[
						styles["mds-accordion-content-grid"],
						isOpen && styles["mds-accordion-content-grid--open"],
					]
						.filter(Boolean)
						.join(" ")}
				>
					<div className={styles["mds-accordion-content-inner"]}>
						<div className={styles["mds-accordion-content"]}>
							{children}
						</div>
					</div>
				</div>
			</div>
		);
	}
);
