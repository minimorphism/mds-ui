// Copyright (c) 2026 minimorphism
// Component Image

import React from "react";

export type ImageProps = React.ImgHTMLAttributes<HTMLImageElement> & {
	width?: string | number;
	height?: string | number;
};

export const Image: React.FC<ImageProps> = ({
	src,
	alt,
	width = "300px",
	height,
	className = "",
	...rest
}) => {
	return (
		<div
			className={`mds-image-wrapper ${className}`}
			style={{ width, height: height || "auto" }}
		>
			<img src={src} alt={alt} {...rest} />
		</div>
	);
};
