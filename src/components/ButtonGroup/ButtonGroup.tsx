// Copyright (c) 2026 minimorphism
// Component ButtonGroup

import React from "react";
import styles from "./ButtonGroup.module.scss";
import { Button } from "../Button/Button";
import type { Variant } from "../../types";

export type ButtonGroupProps = React.HTMLAttributes<HTMLDivElement> & {
	variant?: Variant;
	labels: string[];
	activeLabel?: string;
	onSelect?: (label: string) => void;
};

export const ButtonGroup = React.forwardRef<HTMLDivElement, ButtonGroupProps>(
	(
		{
			variant = "white",
			labels,
			activeLabel,
			onSelect,
			className = "",
			...rest
		},
		ref
	) => {
		const getButtonRadius = (
			index: number,
			total: number
		): [number, number, number, number] | number => {
			if (total === 1) return 20;
			if (index === 0) return [20, 0, 0, 20];
			if (index === total - 1) return [0, 20, 20, 0];
			return 0;
		};

		return (
			<div
				ref={ref}
				className={[
					styles["mds-button-group"],
					styles[`mds-button-group--${variant}`],
					className,
				]
					.filter(Boolean)
					.join(" ")}
				{...rest}
			>
				{labels.map((label, index) => {
					const isActive = activeLabel === label;

					return (
						<div
							className={styles["mds-button-group__cell"]}
							key={label}
						>
							<Button
								variant={variant}
								radius={getButtonRadius(index, labels.length)}
								className={[
									styles["mds-button-group__item"],
									isActive
										? styles["mds-button-group__active"]
										: "",
								]
									.filter(Boolean)
									.join(" ")}
								onClick={() => onSelect && onSelect(label)}
							>
								{label}
							</Button>

							{index < labels.length - 1 && (
								<div
									className={
										styles["mds-button-group__separator"]
									}
								/>
							)}
						</div>
					);
				})}
			</div>
		);
	}
);
