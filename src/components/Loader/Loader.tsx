// Copyright (c) 2026 minimorphism
// Component Loader

import React from "react";
import styles from "./Loader.module.scss";

export const Loader: React.FC<{
	variant?: "black" | "white";
	size?: number;
}> = ({ variant = "black", size = 40 }) => (
	<div
		className={`${styles.loader} ${styles[`loader--${variant}`]}`}
		style={{ width: size, height: size }}
	>
		<svg viewBox="22 22 44 44">
			<circle cx="44" cy="44" r="20.2" fill="none" strokeWidth="3.6" />
		</svg>
	</div>
);
