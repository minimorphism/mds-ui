// Copyright (c) 2026 minimorphism
// Shared component types

export type Variant = "white" | "black" | "anodized" | "dark-gray";
export type DisableVariants<T extends Variant> = Exclude<Variant, T>;
export type PillVariant =
	`${DisableVariants<"anodized" | "dark-gray">}-${"text" | "pill"}`;
