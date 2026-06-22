// Copyright (c) 2026 minimorphism
// Component Typography

import React from "react";
import styles from "./Typography.module.scss";

export type TypographyVariant =
	| "h1"
	| "h2"
	| "h3"
	| "h4"
	| "h5"
	| "h6"
	| "subtitle1"
	| "subtitle2"
	| "body1"
	| "body2"
	| "caption"
	| "overline"
	| "button"
	| "link";

export type TypographyWeight =
	| "light"
	| "normal"
	| "medium"
	| "semibold"
	| "bold";
export type TypographyAlign = "left" | "center" | "right" | "justify";
export type TypographyTransform =
	| "none"
	| "uppercase"
	| "lowercase"
	| "capitalize";
export type TypographyColor =
	| "inherit"
	| "black"
	| "white"
	| "grey"
	| "primary"
	| "error";

export type TypographyProps = React.HTMLAttributes<HTMLElement> & {
	variant?: TypographyVariant;
	component?: React.ElementType;
	color?: TypographyColor;
	weight?: TypographyWeight;
	align?: TypographyAlign;
	transform?: TypographyTransform;
	gutterBottom?: boolean;
	noWrap?: boolean;
	truncate?: boolean;
	italic?: boolean;
	underline?: boolean;
	strikethrough?: boolean;
};

const variantMapping: Record<TypographyVariant, React.ElementType> = {
	h1: "h1",
	h2: "h2",
	h3: "h3",
	h4: "h4",
	h5: "h5",
	h6: "h6",
	subtitle1: "h6",
	subtitle2: "h6",
	body1: "p",
	body2: "p",
	caption: "span",
	overline: "span",
	button: "span",
	link: "span",
};

export const Typography = React.forwardRef<HTMLElement, TypographyProps>(
	(
		{
			variant = "body1",
			component,
			color = "black",
			weight,
			align,
			transform = "none",
			gutterBottom = false,
			noWrap = false,
			truncate = false,
			italic = false,
			underline = false,
			strikethrough = false,
			className = "",
			children,
			style,
			...rest
		},
		ref
	) => {
		const Component = component || variantMapping[variant] || "span";

		const typographyClasses = [
			styles["mds-typography"],
			styles[`mds-typography--${variant}`],
			styles[`mds-typography--color-${color}`],
			weight ? styles[`mds-typography--weight-${weight}`] : undefined,
			align ? styles[`mds-typography--align-${align}`] : undefined,
			transform !== "none"
				? styles[`mds-typography--transform-${transform}`]
				: undefined,
			gutterBottom ? styles["mds-typography--gutter-bottom"] : undefined,
			noWrap ? styles["mds-typography--no-wrap"] : undefined,
			truncate ? styles["mds-typography--truncate"] : undefined,
			italic ? styles["mds-typography--italic"] : undefined,
			underline ? styles["mds-typography--underline"] : undefined,
			strikethrough ? styles["mds-typography--strikethrough"] : undefined,
			className,
		]
			.filter(Boolean)
			.join(" ");

		return (
			<Component
				ref={ref}
				className={typographyClasses}
				style={style}
				{...rest}
			>
				{children}
			</Component>
		);
	}
);

Typography.displayName = "Typography";
