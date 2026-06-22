// Copyright (c) 2026 minimorphism
// Component Modal

import React, { useRef, useCallback, useId, useEffect, useState } from "react";
import styles from "./Modal.module.scss";
import { registerWidget, unregisterWidget } from "../../webgl/WebGLStore";
import type { Variant } from "../../types";

export type ModalProps = {
	variant?: Variant;
	open: boolean;
	onClose: () => void;
	children: React.ReactNode;
};

export const Modal: React.FC<ModalProps> = ({
	variant = "white",
	open,
	onClose,
	children,
}) => {
	const internalRef = useRef<HTMLDivElement | null>(null);
	const id = useId();
	const [shouldRender, setShouldRender] = useState(open);
	const [animateIn, setAnimateIn] = useState(false);

	useEffect(() => {
		if (open) {
			setShouldRender(true);
			requestAnimationFrame(() =>
				requestAnimationFrame(() => setAnimateIn(true))
			);
		} else setAnimateIn(false);
	}, [open]);

	const handleTransitionEnd = () => {
		if (!open && !animateIn) setShouldRender(false);
	};

	useEffect(() => {
		if (shouldRender) {
			registerWidget(id, {
				id,
				type: "modal",
				ref: internalRef,
				mouse: { x: 0, y: 0, hover: 0, click: 0 },
				payload: { variant },
				layout: {
					x: 0,
					y: 0,
					width: 0,
					height: 0,
					visualScale: 1,
					radius: 24,
				},
			});
		}
		return () => {
			unregisterWidget(id);
		};
	}, [shouldRender, id, variant]);

	if (!shouldRender) return null;

	return (
		<div
			className={[
				styles["mds-modal-overlay"],
				animateIn && styles["mds-modal-overlay--open"],
			]
				.filter(Boolean)
				.join(" ")}
			onMouseDown={onClose}
			onTransitionEnd={handleTransitionEnd}
		>
			<div
				ref={internalRef}
				onMouseDown={(e) => e.stopPropagation()}
				className={[
					styles["mds-modal-box"],
					"gl-fade",
					animateIn && styles["mds-modal-box--open"],
					styles[`mds-modal-box--${variant}`],
				]
					.filter(Boolean)
					.join(" ")}
			>
				<div className={styles["mds-modal-content"]}>{children}</div>
			</div>
		</div>
	);
};
