"use client";

import { useEffect, useRef } from "react";

/**
 * Particle sphere for the orbiting-circles globe: points on a Fibonacci
 * sphere, slowly rotating, drawn on a canvas that fills its parent.
 * Front-facing points are brighter and larger, so it reads as a globe.
 *
 * - colour comes from the theme accent (re-read when the theme changes)
 * - only animates while on screen; one still frame under reduced motion
 */

interface ParticleSphereProps {
  /** Number of particles. */
  count?: number;
}

function cssColor(varName: string): [number, number, number] {
  const probe = document.createElement("span");
  probe.style.color = `var(${varName})`;
  probe.style.display = "none";
  document.body.appendChild(probe);
  const rgb = getComputedStyle(probe).color.match(/\d+(\.\d+)?/g)?.map(Number) ?? [200, 200, 200];
  probe.remove();
  return [rgb[0], rgb[1], rgb[2]];
}

export default function ParticleSphereAnimation({ count = 900 }: ParticleSphereProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    // Fibonacci sphere
    const golden = Math.PI * (3 - Math.sqrt(5));
    const pts = Array.from({ length: count }, (_, i) => {
      const y = 1 - (2 * (i + 0.5)) / count;
      const r = Math.sqrt(1 - y * y);
      const phi = i * golden;
      return { x: Math.cos(phi) * r, y, z: Math.sin(phi) * r, seed: (i * 9301 + 49297) % 233280 / 233280 };
    });

    let accent = cssColor("--accent");
    let ink = cssColor("--text");
    let w = 0;
    let h = 0;
    let dpr = 1;

    const resize = () => {
      const box = canvas.parentElement?.getBoundingClientRect();
      if (!box) return;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = box.width;
      h = box.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const tilt = 0.38;
    const cosT = Math.cos(tilt);
    const sinT = Math.sin(tilt);

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      const R = Math.min(w, h) * 0.46;
      const cx = w / 2;
      const cy = h / 2;
      const a = t * 0.00012;
      const cosA = Math.cos(a);
      const sinA = Math.sin(a);
      for (const p of pts) {
        // rotate around Y, then tilt around X
        const x1 = p.x * cosA + p.z * sinA;
        const z1 = -p.x * sinA + p.z * cosA;
        const y2 = p.y * cosT - z1 * sinT;
        const z2 = p.y * sinT + z1 * cosT;
        const depth = (z2 + 1) / 2; // 0 back → 1 front
        const shimmer = 0.85 + 0.15 * Math.sin(t * 0.0015 + p.seed * 12);
        const alpha = (0.08 + 0.8 * depth * depth) * shimmer;
        const size = 0.5 + 1.5 * depth;
        // front points take the accent, back points lean toward the ink colour
        const c = depth > 0.5 ? accent : ink;
        ctx.fillStyle = `rgba(${c[0]},${c[1]},${c[2]},${alpha.toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(cx + x1 * R, cy + y2 * R, size, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let raf = 0;
    let visible = false;
    const loop = (now: number) => {
      draw(now);
      raf = requestAnimationFrame(loop);
    };
    const start = () => {
      cancelAnimationFrame(raf);
      if (reduced.matches || !visible) {
        draw(4000);
        return;
      }
      raf = requestAnimationFrame(loop);
    };

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      start();
    });
    io.observe(canvas);

    const ro = new ResizeObserver(() => {
      resize();
      if (!visible || reduced.matches) draw(4000);
    });
    if (canvas.parentElement) ro.observe(canvas.parentElement);

    const themeObserver = new MutationObserver(() => {
      accent = cssColor("--accent");
      ink = cssColor("--text");
      if (!visible || reduced.matches) draw(4000);
    });
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    resize();
    start();
    reduced.addEventListener("change", start);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      themeObserver.disconnect();
      reduced.removeEventListener("change", start);
    };
  }, [count]);

  return <canvas ref={canvasRef} aria-hidden="true" className="block w-full h-full" />;
}
