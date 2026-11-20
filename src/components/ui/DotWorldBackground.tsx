"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import {
  DOT_COLS,
  DOT_ROWS,
  continents,
  continentColors,
  dotBase,
} from "@/data/dotWorld";

/**
 * Animated dot world map, drawn behind the whole site.
 *
 * Each continent's dots flash to its colour and fade back to the base dot
 * colour (linear, like the original keyframes), each with its own random
 * phase. Drawn on one <canvas> rather than ~700 animated DOM nodes, so it
 * stays cheap as a full-screen background:
 * - scaled to cover the viewport (centered), crisp at any devicePixelRatio
 * - ~30fps, paused automatically when the tab is hidden (rAF)
 * - static frame under prefers-reduced-motion
 * - follows the light/dark theme
 */

const HIDDEN_ON = ["/fun", "/landing"];
const FRAME_MS = 1000 / 30;

type Dot = { col: number; row: number; key: string; period: number; phase: number };
type RGB = [number, number, number];

const hexToRgb = (hex: string): RGB => {
  const n = parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
};

function buildDots(): Dot[] {
  // Later continents win on shared cells, matching the Sass cascade order.
  const byCell = new Map<number, Dot>();
  for (const c of continents) {
    for (const cell of c.cells) {
      const i = cell - 1;
      byCell.set(cell, {
        col: i % DOT_COLS,
        row: Math.floor(i / DOT_COLS),
        key: c.key,
        period: c.period,
        phase: Math.random() * c.period,
      });
    }
  }
  return Array.from(byCell.values());
}

export function DotWorldBackground() {
  const pathname = usePathname();
  const hidden = HIDDEN_ON.some((p) => pathname === p || pathname.startsWith(`${p}/`));
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (hidden) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const dots = buildDots();
    let theme: "dark" | "light" =
      document.documentElement.dataset.theme === "light" ? "light" : "dark";
    let palette: Record<string, RGB> = {};
    let base: RGB = hexToRgb(dotBase[theme]);
    const loadPalette = () => {
      palette = Object.fromEntries(
        Object.entries(continentColors).map(([k, v]) => [k, hexToRgb(v[theme])])
      );
      base = hexToRgb(dotBase[theme]);
    };
    loadPalette();

    // Layout: cover the viewport with the 55×35 grid, centred.
    let cell = 0;
    let offX = 0;
    let offY = 0;
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cell = Math.max(w / DOT_COLS, h / DOT_ROWS);
      offX = (w - cell * DOT_COLS) / 2;
      offY = (h - cell * DOT_ROWS) / 2;
    };

    const draw = (now: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const r = cell * 0.25; // original dot: half the cell, round
      for (const d of dots) {
        const t = ((now + d.phase) % d.period) / d.period; // 0 → 1, linear
        const c = palette[d.key];
        ctx.fillStyle = `rgb(${Math.round(c[0] + (base[0] - c[0]) * t)},${Math.round(
          c[1] + (base[1] - c[1]) * t
        )},${Math.round(c[2] + (base[2] - c[2]) * t)})`;
        ctx.beginPath();
        ctx.arc(offX + (d.col + 0.5) * cell, offY + (d.row + 0.5) * cell, r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let raf = 0;
    let last = 0;
    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      if (now - last < FRAME_MS) return;
      last = now;
      draw(now);
    };
    const start = () => {
      cancelAnimationFrame(raf);
      if (reduced.matches) draw(1234); // one still frame
      else raf = requestAnimationFrame(loop);
    };

    const themeObserver = new MutationObserver(() => {
      const next = document.documentElement.dataset.theme === "light" ? "light" : "dark";
      if (next !== theme) {
        theme = next;
        loadPalette();
        if (reduced.matches) draw(1234);
      }
    });
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    const onResize = () => {
      resize();
      if (reduced.matches) draw(1234);
    };

    resize();
    start();
    window.addEventListener("resize", onResize);
    reduced.addEventListener("change", start);
    return () => {
      cancelAnimationFrame(raf);
      themeObserver.disconnect();
      window.removeEventListener("resize", onResize);
      reduced.removeEventListener("change", start);
    };
  }, [hidden]);

  if (hidden) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="dot-world-bg fixed inset-0 -z-10 pointer-events-none"
    />
  );
}
