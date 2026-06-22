// Copyright (c) 2026 minimorphism
// Component RadioGroup

import React from "react";
import styles from "./RadioGroup.module.scss";
import type { DisableVariants } from "../../types";

export type RadioButtonProps = React.InputHTMLAttributes<HTMLInputElement> & {
	variant?: DisableVariants<"dark-gray">;
};

export const RadioButton = React.forwardRef<HTMLInputElement, RadioButtonProps>(
	({ variant = "white", className = "", ...rest }, ref) => {
		return (
			<label
				className={[styles["mds-radio-wrapper"], className]
					.filter(Boolean)
					.join(" ")}
			>
				<input
					ref={ref}
					type="radio"
					className={styles["mds-radio-input"]}
					{...rest}
				/>
				<div
					className={`${styles["mds-radio-bg"]} ${styles[`mds-radio-bg--${variant}`]}`}
				>
					<div className={styles["mds-radio-dot"]} />
				</div>
			</label>
		);
	}
);

RadioButton.displayName = "RadioButton";
