// Copyright (c) 2026 minimorphism
// Component MobileModal

import React, { useRef, useState, useCallback, useId, useEffect } from "react";
import styles from "./MobileModal.module.scss";
import { registerWidget, unregisterWidget } from "../../webgl/WebGLStore";
import { Icons } from "../Icons/Icons";

export type MobileModalProps = {
	open: boolean;
	onClose: () => void;
	title: string;
	children: React.ReactNode;

	titleClassName?: string;
	capsuleClassName?: string;
	closeButtonClassName?: string;
};

export const MobileModal: React.FC<MobileModalProps> = ({
	open,
	onClose,
	title,
	children,
	titleClassName,
	capsuleClassName,
	closeButtonClassName,
}) => {
	const bgRef = useRef<HTMLDivElement>(null);
	const capsuleRef = useRef<HTMLDivElement>(null);
	const iconRef = useRef<HTMLDivElement>(null);
	const closeRef = useRef<HTMLButtonElement>(null);

	const bgId = useId();
	const capsuleId = useId();
	const iconId = useId();
	const closeId = useId();

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

	useEffect(() => {
		if (shouldRender) {
			registerWidget(bgId, {
				id: bgId,
				type: "mobileModal",
				ref: bgRef,
				mouse: { x: 0, y: 0, hover: 0, click: 0 },
				payload: { variant: "black" },
				layout: {
					x: 0,
					y: 0,
					width: 0,
					height: 0,
					visualScale: 1,
					radius: 36,
				},
			});

			registerWidget(capsuleId, {
				id: capsuleId,
				type: "box",
				ref: capsuleRef,
				mouse: { x: 0, y: 0, hover: 0, click: 0 },
				payload: { variant: "dark-gray" },
				layout: {
					x: 0,
					y: 0,
					width: 0,
					height: 0,
					visualScale: 1,
					radius: 40,
				},
			});

			registerWidget(iconId, {
				id: iconId,
				type: "box",
				ref: iconRef,
				mouse: { x: 0, y: 0, hover: 0, click: 0 },
				payload: { variant: "anodized" },
				layout: {
					x: 0,
					y: 0,
					width: 0,
					height: 0,
					visualScale: 1,
					radius: 16,
				},
			});

			registerWidget(closeId, {
				id: closeId,
				type: "box",
				ref: closeRef,
				mouse: { x: 0, y: 0, hover: 0, click: 0 },
				payload: { variant: "dark-gray" },
				layout: {
					x: 0,
					y: 0,
					width: 0,
					height: 0,
					visualScale: 1,
					radius: 22,
				},
			});
		}

		return () => {
			unregisterWidget(bgId);
			unregisterWidget(capsuleId);
			unregisterWidget(iconId);
			unregisterWidget(closeId);
		};
	}, [shouldRender, bgId, capsuleId, iconId, closeId]);

	if (!shouldRender) return null;

	return (
		<>
			<div
				className={`${styles["mds-modal-overlay"]} ${animateIn ? styles["mds-modal-overlay--open"] : ""}`}
				onClick={onClose}
			/>
			<div
				className={`${styles["mds-modal-wrapper"]} gl-fade ${animateIn ? styles["mds-modal-wrapper--open"] : ""}`}
				onTransitionEnd={handleTransitionEnd}
			>
				<div
					ref={bgRef}
					className={`${styles["gl-widget"]} ${styles["mds-modal-bg"]}`}
				>
					<div className={styles["mds-modal-header"]}>
						<div
							ref={capsuleRef}
							className={`${styles["gl-widget"]} ${styles["mds-modal-capsule"]} ${capsuleClassName || ""}`}
						>
							<div
								ref={iconRef}
								className={`${styles["gl-widget"]} ${styles["mds-modal-capsule-icon"]}`}
							>
								<Icons.Alert />
							</div>
							<span
								className={`${styles["mds-modal-title"]} ${titleClassName || ""}`}
							>
								{title}
							</span>
						</div>

						<button
							ref={closeRef}
							className={`${styles["gl-widget"]} ${styles["mds-modal-close-btn"]}`}
							onClick={onClose}
						>
							<Icons.CloseModal size={60} />
						</button>
					</div>

					<div className={styles["mds-modal-content"]}>
						{children}
					</div>
				</div>
			</div>
		</>
	);
};
