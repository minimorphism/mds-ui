// Copyright (c) 2026 minimorphism
// Component Divider

import React from "react";
import styles from "./Divider.module.scss";

export type DividerProps = React.HTMLAttributes<HTMLDivElement> & {
	margin?: string;
};

export const Divider: React.FC<DividerProps> = ({
	className = "",
	style,
	margin,
	...rest
}) => {
	const combinedStyle = {
		...style,
		...(margin ? { margin } : {}),
	};

	return (
		<div
			className={[styles["mds-divider"], className]
				.filter(Boolean)
				.join(" ")}
			style={combinedStyle}
			{...rest}
		/>
	);
};
