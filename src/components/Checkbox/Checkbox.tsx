// Copyright (c) 2026 minimorphism
// Component Checkbox

import React from "react";
import styles from "./Checkbox.module.scss";
import type { DisableVariants } from "../../types";
import { Icons } from "../Icons/Icons";

export type CheckboxProps = React.InputHTMLAttributes<HTMLInputElement> & {
	variant?: DisableVariants<"dark-gray" | "anodized">;
};

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
	({ variant = "black", className = "", ...rest }, ref) => {
		return (
			<label
				className={[styles["mds-checkbox-wrapper"], className]
					.filter(Boolean)
					.join(" ")}
			>
				<input
					ref={ref}
					type="checkbox"
					className={styles["mds-checkbox-input"]}
					{...rest}
				/>
				<span
					className={`${styles["mds-checkbox-visual"]} ${styles[`mds-checkbox-visual--${variant}`]}`}
				>
					<Icons.Checkbox />
				</span>
			</label>
		);
	}
);
