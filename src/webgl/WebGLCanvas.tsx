// Copyright (c) 2026 minimorphism
// WebGL Canvas

import React, { useEffect, useRef, useState, useId } from "react";
import { createPortal } from "react-dom";
import {
	widgetRegistry,
	layerDefinitions,
	type WidgetInstance,
	type LayerDefinition,
	setRegistryChangeListener,
} from "./WebGLStore";

const widgetVertexShaderSource = `
precision mediump float;
attribute vec2 a_position;
uniform vec4 u_box;
uniform vec2 u_resolution;
void main() {
  vec2 uv = a_position * 0.5 + 0.5;
  vec2 pixel_pos = u_box.xy + uv * u_box.zw;
  vec2 clip_pos = (pixel_pos / u_resolution) * 2.0 - 1.0;
  gl_Position = vec4(clip_pos.x, -clip_pos.y, 0.0, 1.0);
}
`;

function createShader(gl: WebGLRenderingContext, type: number, source: string) {
	const shader = gl.createShader(type);
	if (!shader) return null;
	gl.shaderSource(shader, source);
	gl.compileShader(shader);
	if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
		console.error("Shader error:", gl.getShaderInfoLog(shader));
		gl.deleteShader(shader);
		return null;
	}
	return shader;
}

function createProgram(
	gl: WebGLRenderingContext,
	vsSource: string,
	fsSource: string
) {
	const vs = createShader(gl, gl.VERTEX_SHADER, vsSource);
	const fs = createShader(gl, gl.FRAGMENT_SHADER, fsSource);
	if (!vs || !fs) return null;
	const program = gl.createProgram();
	if (!program) return null;
	gl.attachShader(program, vs);
	gl.attachShader(program, fs);
	gl.linkProgram(program);
	if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
		console.error("Program link error:", gl.getProgramInfoLog(program));
		gl.deleteProgram(program);
		return null;
	}
	return program;
}

const parseZIndex = (value: string): number => {
	if (!value || value === "auto") return 0;
	const z = Number.parseInt(value, 10);
	return Number.isFinite(z) ? z : 0;
};

let isLayoutDirty = true;
let isStyleDirty = true;
let isPageTransitionActive = false;
let globalCanvasMounted = false;

const syncAllWidgetLayouts = (
	canvas: HTMLCanvasElement,
	canvasRect: DOMRect
) => {
	if (canvasRect.width === 0 || canvasRect.height === 0) return;

	const scaleX = canvas.width / canvasRect.width;
	const scaleY = canvas.height / canvasRect.height;

	const globalSyncRequired = isLayoutDirty || isPageTransitionActive;

	for (const widget of widgetRegistry.values()) {
		const node = widget.ref.current;
		if (!node) continue;

		const isWidgetInteracting =
			widget.mouse.hover > 0 || widget.mouse.click > 0;
		const needsSync =
			globalSyncRequired ||
			isWidgetInteracting ||
			widget.layout.width === 0;

		if (needsSync) {
			const currentOffsetWidth = node.offsetWidth;
			widget.payload._baseWidth = currentOffsetWidth;

			const style = window.getComputedStyle(node);

			if (widget.payload._radius === undefined || isStyleDirty) {
				widget.payload._radius = [
					parseFloat(style.borderTopLeftRadius) || 0,
					parseFloat(style.borderTopRightRadius) || 0,
					parseFloat(style.borderBottomRightRadius) || 0,
					parseFloat(style.borderBottomLeftRadius) || 0,
				];
				widget.layout.zIndex = parseZIndex(style.zIndex);
			}

			const rect = node.getBoundingClientRect();
			const centerX = rect.left + rect.width / 2;
			const centerY = rect.top + rect.height / 2;

			let isCovered = false;
			const wasAutoHidden = widget.payload._autoHidden;

			if (
				style.display === "none" ||
				(style.visibility === "hidden" && !wasAutoHidden)
			) {
				isCovered = true;
			} else if (
				centerX >= 0 &&
				centerY >= 0 &&
				centerX <= window.innerWidth &&
				centerY <= window.innerHeight
			) {
				if (wasAutoHidden) {
					node.style.visibility = "";
				}
				const topEl = document.elementFromPoint(centerX, centerY);
				if (topEl) {
					isCovered =
						topEl !== node &&
						!node.contains(topEl) &&
						!topEl.contains(node);

					const isBackdrop =
						widget.type.endsWith("-body") ||
						widget.type === "slider" ||
						widget.type === "progress" ||
						widget.payload?.isBackdrop === true;

					if (
						isCovered &&
						isBackdrop &&
						node.parentElement &&
						node.parentElement.contains(topEl)
					) {
						isCovered = false;
					}
				}
				if (wasAutoHidden && isCovered) {
					node.style.visibility = "hidden";
				}
			}

			if (isCovered) {
				node.style.visibility = "hidden";
				widget.payload._autoHidden = true;
				widget.layout.opacity = 0;
			} else {
				if (wasAutoHidden) {
					node.style.visibility = "";
					widget.payload._autoHidden = false;
				}
			}

			let opacity = isCovered ? 0.0 : 1.0;
			if (!isCovered) {
				const nodeOp = parseFloat(style.opacity);
				if (!isNaN(nodeOp)) opacity *= nodeOp;

				const fadeNode = node.closest(".gl-fade") as HTMLElement;
				if (fadeNode && fadeNode !== node) {
					const fadeOp = parseFloat(
						window.getComputedStyle(fadeNode).opacity
					);
					if (!isNaN(fadeOp)) opacity *= fadeOp;
				}
			}
			widget.layout.opacity = opacity;

			widget.layout.x = (rect.left - canvasRect.left) * scaleX;
			widget.layout.y = (rect.top - canvasRect.top) * scaleY;
			widget.layout.width = rect.width * scaleX;
			widget.layout.height = rect.height * scaleY;

			const visualScale =
				widget.payload._baseWidth > 0
					? (rect.width / widget.payload._baseWidth) * scaleX
					: scaleX;
			widget.layout.visualScale = visualScale;

			const maxRadius =
				Math.min(widget.layout.width, widget.layout.height) / 2.0;
			const r = widget.payload._radius;
			widget.layout.radius = [
				Math.min(r[0] * visualScale, maxRadius),
				Math.min(r[1] * visualScale, maxRadius),
				Math.min(r[2] * visualScale, maxRadius),
				Math.min(r[3] * visualScale, maxRadius),
			];

			let clipTop = -99999;
			let clipLeft = -99999;
			let clipBottom = 99999;
			let clipRight = 99999;
			let hasClip = false;

			let parent = node.parentElement;
			while (parent && parent !== document.body) {
				const pStyle = window.getComputedStyle(parent);
				if (
					pStyle.overflow === "hidden" ||
					pStyle.overflowY === "hidden" ||
					pStyle.overflowX === "hidden"
				) {
					const parentRect = parent.getBoundingClientRect();
					clipTop = Math.max(clipTop, parentRect.top);
					clipLeft = Math.max(clipLeft, parentRect.left);
					clipBottom = Math.min(clipBottom, parentRect.bottom);
					clipRight = Math.min(clipRight, parentRect.right);
					hasClip = true;
				}
				parent = parent.parentElement;
			}

			if (hasClip) {
				(widget.layout as any).clip = {
					x: (clipLeft - canvasRect.left) * scaleX,
					y: (clipTop - canvasRect.top) * scaleY,
					w: Math.max(0, clipRight - clipLeft) * scaleX,
					h: Math.max(0, clipBottom - clipTop) * scaleY,
				};
			} else {
				delete (widget.layout as any).clip;
			}
		}
	}

	isLayoutDirty = false;
	isStyleDirty = false;
};

type RenderItem = { widget: WidgetInstance; def: LayerDefinition };

let forceRenderRef = (durationMs?: number, isGlobalTransition?: boolean) => {};
export const forceWebGLRender = (
	durationMs?: number,
	isGlobalTransition?: boolean
) => {
	forceRenderRef(durationMs, isGlobalTransition);
};

let activeCanvasId: string | null = null;

export const WebGLCanvas = () => {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const instanceId = useId();
	const [isPrimary, setIsPrimary] = useState(false);

	useEffect(() => {
		if (globalCanvasMounted) {
			console.warn(
				"WebGLCanvas is a singleton and has already been mounted."
			);
			return;
		}
		globalCanvasMounted = true;
		activeCanvasId = instanceId;
		setIsPrimary(true);

		return () => {
			if (activeCanvasId === instanceId) {
				activeCanvasId = null;
				globalCanvasMounted = false;
			}
		};
	}, [instanceId]);

	useEffect(() => {
		if (!isPrimary) return;
		const canvas = canvasRef.current;
		if (!canvas) return;

		const gl = canvas.getContext("webgl", {
			alpha: true,
			antialias: true,
			premultipliedAlpha: true,
			preserveDrawingBuffer: true,
		});
		if (!gl) return;

		const quadBuffer = gl.createBuffer();
		if (!quadBuffer) return;
		gl.bindBuffer(gl.ARRAY_BUFFER, quadBuffer);
		gl.bufferData(
			gl.ARRAY_BUFFER,
			new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
			gl.STATIC_DRAW
		);

		gl.disable(gl.DEPTH_TEST);
		gl.disable(gl.CULL_FACE);

		const widgetPrograms = new Map<string, WebGLProgram>();

		const getWidgetProgram = (type: string, fragmentShader: string) => {
			const cached = widgetPrograms.get(type);
			if (cached) return cached;
			let fsSource: any = fragmentShader;
			if (
				typeof fsSource === "object" &&
				fsSource !== null &&
				"default" in fsSource
			)
				fsSource = fsSource.default;
			const program = createProgram(
				gl,
				widgetVertexShaderSource,
				String(fsSource)
			);
			if (!program) return null;
			widgetPrograms.set(type, program);
			return program;
		};

		const renderFrame = () => {
			const dpr = window.devicePixelRatio || 1;
			const canvasRect = canvas.getBoundingClientRect();

			const targetW = Math.round(canvasRect.width * dpr);
			const targetH = Math.round(canvasRect.height * dpr);

			if (targetW <= 0 || targetH <= 0) return;

			if (canvas.width !== targetW || canvas.height !== targetH) {
				canvas.width = targetW;
				canvas.height = targetH;
				isLayoutDirty = true;
			}

			syncAllWidgetLayouts(canvas, canvasRect);

			const items: RenderItem[] = [];
			for (const widget of widgetRegistry.values()) {
				const def = layerDefinitions.get(widget.type);
				if (!def) continue;
				items.push({ widget, def });
			}

			items.sort((a, b) => {
				const za = a.widget.layout.zIndex ?? 0;
				const zb = b.widget.layout.zIndex ?? 0;
				if (za !== zb) return za - zb;
				const nA = a.widget.ref.current;
				const nB = b.widget.ref.current;
				if (nA && nB) {
					const rel = nA.compareDocumentPosition(nB);
					if (rel & Node.DOCUMENT_POSITION_FOLLOWING) return -1;
					if (rel & Node.DOCUMENT_POSITION_PRECEDING) return 1;
				}
				return (a.widget.mountOrder ?? 0) - (b.widget.mountOrder ?? 0);
			});

			gl.bindFramebuffer(gl.FRAMEBUFFER, null);
			gl.viewport(0, 0, targetW, targetH);
			gl.clearColor(0, 0, 0, 0);
			gl.disable(gl.SCISSOR_TEST);
			gl.clear(gl.COLOR_BUFFER_BIT);

			if (items.length === 0) return;

			gl.enable(gl.BLEND);
			gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
			gl.enable(gl.SCISSOR_TEST);

			for (const item of items) {
				const { widget, def } = item;

				const clip = (widget.layout as any).clip;
				if (clip) {
					if (clip.w <= 0 || clip.h <= 0) continue;
					const sx = Math.round(clip.x);
					const sy = Math.round(targetH - (clip.y + clip.h));
					const sw = Math.round(clip.w);
					const sh = Math.round(clip.h);
					gl.scissor(sx, sy, sw, sh);
				} else {
					gl.scissor(0, 0, targetW, targetH);
				}

				const program = getWidgetProgram(
					widget.type,
					def.fragmentShader
				);
				if (!program) continue;

				gl.useProgram(program);
				gl.bindBuffer(gl.ARRAY_BUFFER, quadBuffer);
				const posLoc = gl.getAttribLocation(program, "a_position");
				if (posLoc >= 0) {
					gl.enableVertexAttribArray(posLoc);
					gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);
				}

				const uniforms = def.getUniforms(widget, canvas);
				if (!uniforms) continue;
				for (const [name, value] of Object.entries(uniforms)) {
					const loc = gl.getUniformLocation(program, name);
					if (loc === null) continue;
					if (typeof value === "number") gl.uniform1f(loc, value);
					else if (value instanceof Float32Array) {
						if (value.length === 2) gl.uniform2fv(loc, value);
						else if (value.length === 4) gl.uniform4fv(loc, value);
					}
				}
				gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
			}
			gl.disable(gl.SCISSOR_TEST);
		};

		let renderRequested = false;
		let animationActiveUntil = 0;
		let activeAnimationsCount = 0;

		const performRender = () => {
			renderRequested = false;
			renderFrame();

			if (
				activeAnimationsCount > 0 ||
				performance.now() < animationActiveUntil
			) {
				requestRender();
			} else {
				isPageTransitionActive = false;
			}
		};

		const requestRender = () => {
			if (!renderRequested) {
				renderRequested = true;
				requestAnimationFrame(performRender);
			}
		};

		const markLayoutDirty = () => {
			isLayoutDirty = true;
			requestRender();
		};
		const markStyleDirty = () => {
			isStyleDirty = true;
			markLayoutDirty();
		};

		setRegistryChangeListener(() => {
			forceRenderRef(500, true);
		});

		forceRenderRef = (durationMs = 350, isGlobalTransition = true) => {
			animationActiveUntil = performance.now() + durationMs;
			isPageTransitionActive = isGlobalTransition;
			if (isGlobalTransition) isLayoutDirty = true;
			requestRender();
		};

		(window as any).forceWebGLRender = forceRenderRef;
		window.addEventListener("resize", markStyleDirty, { passive: true });
		window.addEventListener("scroll", markLayoutDirty, {
			passive: true,
			capture: true,
		});

		const mutationObserver = new MutationObserver(() => {
			markLayoutDirty();
		});
		mutationObserver.observe(document.body, {
			childList: true,
			subtree: true,
			attributes: true,
			attributeFilter: ["style", "class"],
		});

		markStyleDirty();

		const t1 = setTimeout(() => forceRenderRef(200, true), 150);
		const t2 = setTimeout(() => forceRenderRef(200, true), 400);
		const t3 = setTimeout(() => forceRenderRef(200, true), 800);

		return () => {
			window.removeEventListener("resize", markStyleDirty);
			window.removeEventListener("scroll", markLayoutDirty, true);
			mutationObserver.disconnect();
			clearTimeout(t1);
			clearTimeout(t2);
			clearTimeout(t3);
			setRegistryChangeListener(() => {});
			delete (window as any).forceWebGLRender;
			forceRenderRef = () => {};
		};
	}, [isPrimary]);

	if (!isPrimary) return null;

	return createPortal(
		<canvas
			ref={canvasRef}
			style={{
				position: "fixed",
				inset: 0,
				width: "100%",
				height: "100%",
				pointerEvents: "none",
				zIndex: -1,
			}}
		/>,
		document.body
	);
};
