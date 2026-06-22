// Copyright (c) 2026 minimorphism
// Component Menu

import React from "react";
import styles from "./Menu.module.scss";

export type MenuProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
	variant?: "black" | "white";
};

export const Menu = React.forwardRef<HTMLButtonElement, MenuProps>(
	({ variant = "black", className = "", ...rest }, ref) => {
		return (
			<button
				ref={ref}
				className={[
					styles["mds-menu-btn"],
					styles[`mds-menu-btn--${variant}`],
					className,
				]
					.filter(Boolean)
					.join(" ")}
				{...rest}
			>
				<div className={styles["mds-menu-icon"]}>
					<span className={styles["mds-menu-line"]} />
					<span className={styles["mds-menu-line"]} />
					<span className={styles["mds-menu-line"]} />
				</div>
			</button>
		);
	}
);
