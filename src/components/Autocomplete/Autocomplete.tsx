// Copyright (c) 2026 minimorphism
// Component Autocomplete

import React, { useRef, useState, useCallback, useId, useEffect } from "react";
import styles from "./Autocomplete.module.scss";
import { registerWidget, unregisterWidget } from "../../webgl/WebGLStore";
import { Icons } from "../Icons/Icons";
import type { DisableVariants } from "../../types";

export interface AutocompleteOption {
	id: string | number;
	label: string;
}

export type AutocompleteProps = Omit<
	React.HTMLAttributes<HTMLDivElement>,
	"onChange" | "defaultValue"
> & {
	variant?: DisableVariants<"dark-gray">;
	options?: AutocompleteOption[];
	value?: string;
	defaultValue?: string;
	placeholder?: string;
	onChangeValue?: (value: string) => void;
	onSelectOption?: (option: AutocompleteOption) => void;
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

const getBoxVariant = (
	variant: DisableVariants<"dark-gray">
): "anodized" | "black" => {
	if (variant === "black") return "anodized";
	return "black";
};

const getBodyVariant = (
	variant: DisableVariants<"dark-gray">
): DisableVariants<"dark-gray"> | "dark-gray" => {
	if (variant === "black") return "dark-gray";
	return variant;
};

export const Autocomplete = React.forwardRef<HTMLDivElement, AutocompleteProps>(
	(
		{
			variant = "white",
			options = [],
			value,
			defaultValue = "",
			placeholder,
			onChangeValue,
			onSelectOption,
			open,
			defaultOpen = false,
			onChange,
			className = "",
			style,
			...rest
		},
		externalRef
	) => {
		const isControlledOpen = open !== undefined;
		const [internalOpen, setInternalOpen] = useState(
			isControlledOpen ? open : defaultOpen
		);
		const isOpen = isControlledOpen ? open : internalOpen;

		const isControlledValue = value !== undefined;
		const [internalValue, setInternalValue] = useState(
			isControlledValue ? value : defaultValue
		);
		const currentValue = isControlledValue ? value : internalValue;

		const internalContainerRef = useRef<HTMLDivElement | null>(null);
		const internalHeaderRef = useRef<HTMLDivElement | null>(null);
		const internalBodyRef = useRef<HTMLDivElement | null>(null);
		const internalIconRef = useRef<HTMLDivElement | null>(null);

		const headerId = useId();
		const bodyId = useId();
		const iconId = useId();

		const mouseHeaderRef = useRef({ x: 0, y: 0, hover: 0, click: 0 });
		const mouseBodyRef = useRef({ x: 0, y: 0, hover: 0, click: 0 });
		const mouseIconRef = useRef({ x: 0, y: 0, hover: 0, click: 0 });

		const iconVariant = getIconVariant(variant);
		const boxVariant = getBoxVariant(variant);
		const bodyVariant = getBodyVariant(variant);

		const filteredOptions = options.filter((opt) =>
			opt.label.toLowerCase().includes(currentValue.toLowerCase())
		);

		useEffect(() => {
			const handleClickOutside = (event: MouseEvent | TouchEvent) => {
				if (
					internalContainerRef.current &&
					!internalContainerRef.current.contains(event.target as Node)
				) {
					if (isOpen) {
						if (!isControlledOpen) setInternalOpen(false);
						if (onChange) onChange(false);
					}
				}
			};

			document.addEventListener("mousedown", handleClickOutside);
			document.addEventListener("touchstart", handleClickOutside);

			return () => {
				document.removeEventListener("mousedown", handleClickOutside);
				document.removeEventListener("touchstart", handleClickOutside);
			};
		}, [isOpen, isControlledOpen, onChange]);

		const handleToggle = () => {
			const newState = !isOpen;
			if (!isControlledOpen) setInternalOpen(newState);
			if (onChange) onChange(newState);
		};

		const handleInputClick = () => {
			if (!isOpen) {
				if (!isControlledOpen) setInternalOpen(true);
				if (onChange) onChange(true);
			}
		};

		const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
			const val = e.target.value;
			if (!isControlledValue) setInternalValue(val);
			if (onChangeValue) onChangeValue(val);

			if (!isOpen) {
				if (!isControlledOpen) setInternalOpen(true);
				if (onChange) onChange(true);
			}
		};

		const handleSelect = (opt: AutocompleteOption) => {
			if (onSelectOption) onSelectOption(opt);
			if (!isControlledValue) setInternalValue(opt.label);
			if (onChangeValue) onChangeValue(opt.label);

			if (!isControlledOpen) setInternalOpen(false);
			if (onChange) onChange(false);
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
				type: "autocomplete-header",
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
				type: "autocomplete-body",
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
				type: "autocomplete-icon",
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
					styles["mds-autocomplete"],
					styles[`mds-autocomplete--${variant}`],
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
						styles["mds-autocomplete-body-bg"],
						styles[`mds-autocomplete-body-bg--${bodyVariant}`],
					].join(" ")}
				/>
				<div
					ref={internalHeaderRef}
					className={styles["mds-autocomplete-header"]}
					onPointerEnter={() => {
						mouseHeaderRef.current.hover = 1;
						mouseIconRef.current.hover = 1;
					}}
					onPointerLeave={() => {
						mouseHeaderRef.current.hover = 0;
						mouseIconRef.current.hover = 0;
						mouseIconRef.current.click = 0;
					}}
				>
					<input
						type="text"
						className={styles["mds-autocomplete-input"]}
						value={currentValue}
						onChange={handleInputChange}
						onClick={handleInputClick}
						placeholder={placeholder}
						aria-expanded={isOpen}
					/>
					<div
						ref={internalIconRef}
						className={[
							styles["mds-autocomplete-icon-box"],
							styles[`mds-autocomplete-icon-box--${iconVariant}`],
						].join(" ")}
						onClick={handleToggle}
						onPointerDown={() => {
							mouseIconRef.current.click = 1;
						}}
						onPointerUp={() => {
							mouseIconRef.current.click = 0;
						}}
					>
						<Icons.ChevronIconAccordion
							className={[
								styles["mds-autocomplete-chevron"],
								isOpen &&
									styles["mds-autocomplete-chevron--open"],
							]
								.filter(Boolean)
								.join(" ")}
						/>
					</div>
				</div>
				<div
					className={[
						styles["mds-autocomplete-content-grid"],
						isOpen && styles["mds-autocomplete-content-grid--open"],
					]
						.filter(Boolean)
						.join(" ")}
				>
					<div className={styles["mds-autocomplete-content-inner"]}>
						<div className={styles["mds-autocomplete-content"]}>
							{/* ---> ИЗМЕНЕНО: Рендер отфильтрованных элементов */}
							{filteredOptions.length > 0 ? (
								filteredOptions.map((opt) => (
									<div
										key={opt.id}
										className={
											styles["mds-autocomplete-item"]
										}
										onClick={() => handleSelect(opt)}
									>
										<div
											className={[
												styles[
													"mds-autocomplete-item-box"
												],
												styles[
													`mds-autocomplete-item-box--${boxVariant}`
												],
											].join(" ")}
										/>
										<span>{opt.label}</span>
									</div>
								))
							) : (
								<div
									className={styles["mds-autocomplete-item"]}
									style={{ opacity: 0.5, cursor: "default" }}
								>
									<span>Nothing found</span>
								</div>
							)}
						</div>
					</div>
				</div>{" "}
			</div>
		);
	}
);
