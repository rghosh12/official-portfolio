"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";
import { ProgressRadial } from "@/components/ui/progress";
import { profile } from "@/data/resume";
import { INTRO_SEEN_KEY } from "@/lib/intro";

/**
 * First-visit intro: a branded loader with a radial progress gauge that
 * completes, then an iris opens from the centre of the gauge to reveal
 * the site.
 *
 * - Progress follows real readiness (window load + fonts), with a minimum
 *   so the moment reads, and a hard maximum so it never blocks.
 * - Shown once per browser session. An inline <head> script marks repeat
 *   visits before first paint (see layout.tsx), so there is no flash.
 * - Skip button and Escape key; reduced-motion users get a short fade.
 * - Rendered in the server HTML; a <noscript> rule hides it without JS.
 */

const MIN_MS = 1700; // shortest the gauge takes to fill
const MAX_MS = 4500; // never hold the visitor longer than this
const HOLD_MS = 280; // beat at 100% before the iris opens
const HIDDEN_ON = ["/landing"];

const STATUS = [
  "Loading portfolio",
  "Indexing research",
  "Compiling projects",
  "Calibrating timeline",
  "Ready",
];

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

export function IntroLoader() {
  const pathname = usePathname();
  const reduced = useReducedMotion();
  const [phase, setPhase] = useState<"loading" | "opening" | "done">("loading");
  const [progress, setProgress] = useState(0);
  const openedRef = useRef(false);

  const finish = useCallback(() => {
    try {
      sessionStorage.setItem(INTRO_SEEN_KEY, "1");
    } catch {
      /* storage unavailable: intro simply shows again next load */
    }
    document.documentElement.classList.remove("intro-lock");
    setPhase("done");
  }, []);

  const open = useCallback(() => {
    if (openedRef.current) return;
    openedRef.current = true;
    setProgress(100);
    setPhase("opening");
  }, []);

  useEffect(() => {
    const html = document.documentElement;
    if (html.dataset.introSeen || HIDDEN_ON.includes(pathname)) {
      setPhase("done");
      return;
    }
    html.classList.add("intro-lock");

    let ready = document.readyState === "complete";
    let fontsReady = false;
    const onLoad = () => (ready = true);
    window.addEventListener("load", onLoad);
    (document.fonts?.ready ?? Promise.resolve()).then(() => (fontsReady = true));

    const start = performance.now();
    let raf = 0;
    let holdTimer = 0;
    const tick = (now: number) => {
      const t = now - start;
      const loaded = ready && fontsReady;
      // Ease toward 92% on time alone; only the last stretch waits on readiness.
      let p = easeOutCubic(Math.min(1, t / MIN_MS)) * 92;
      if (loaded && t >= MIN_MS) p = 100;
      if (t >= MAX_MS) p = 100;
      setProgress((prev) => Math.max(prev, p));
      if (p >= 100) {
        holdTimer = window.setTimeout(open, HOLD_MS);
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    // Safety net if rAF is throttled (e.g. background tab).
    const failSafe = window.setTimeout(open, MAX_MS + 1500);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") open();
    };
    window.addEventListener("keydown", onKey);

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(holdTimer);
      window.clearTimeout(failSafe);
      window.removeEventListener("load", onLoad);
      window.removeEventListener("keydown", onKey);
      html.classList.remove("intro-lock");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Reduced motion: no iris, just a short fade. Otherwise a safety timer
  // removes the overlay even if the iris animation is stalled.
  useEffect(() => {
    if (phase !== "opening") return;
    const t = window.setTimeout(finish, reduced ? 400 : 1800);
    return () => window.clearTimeout(t);
  }, [phase, reduced, finish]);

  if (phase === "done") return null;

  const pct = Math.round(progress);
  const status = STATUS[Math.min(STATUS.length - 1, Math.floor((pct / 100) * (STATUS.length - 1)))];
  const opening = phase === "opening";

  return (
    // The iris is a CSS transition on the registered --hole property
    // (globals.css), so the browser animates it natively.
    <div
      className={cn("intro-overlay", opening && "is-opening", opening && reduced && "is-reduced")}
      role="dialog"
      aria-modal="true"
      aria-label="Loading Rupak Ghosh's portfolio"
      onTransitionEnd={(e) => {
        if (opening && e.target === e.currentTarget && (e.propertyName === "--hole" || e.propertyName === "opacity")) {
          finish();
        }
      }}
    >
      {/* Background layer — placeholder for the Superdesign background */}
      <div className="intro-bg" aria-hidden="true" />

      {/* Frame */}
      <div className="intro-frame">
        <div className="intro-corner intro-corner--tl">
          <span className="intro-mark">RG</span>
          <span className="label-mono text-[var(--muted)]">Portfolio</span>
        </div>
        <div className="intro-corner intro-corner--tr label-mono text-[var(--muted)]">
          {profile.location.replace(/\s+\d{5}$/, "")}
        </div>
        <div className="intro-corner intro-corner--bl label-mono text-[var(--muted-dark)]">
          © {new Date().getFullYear()} {profile.name}
        </div>
        <div className="intro-corner intro-corner--br">
          <button type="button" className="box-btn box-btn--sm" onClick={open}>
            Skip intro
          </button>
        </div>
      </div>

      {/* Centre: gauge + logo, then identity */}
      <div className="intro-center">
        <div className="intro-gauge">
          <ProgressRadial
            value={progress}
            size={148}
            strokeWidth={6}
            startAngle={-225}
            endAngle={45}
            trackClassName="text-[var(--border)]"
            indicatorClassName="text-[var(--accent)] !transition-none"
            aria-hidden="true"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logos/orbit-core.png"
              alt=""
              width={84}
              height={84}
              className="w-[84px] h-[84px] rounded-full"
              style={{ boxShadow: "0 0 0 2px var(--border-hover)" }}
            />
          </ProgressRadial>
          <span className="intro-pct tabular-nums" aria-live="off">
            {String(pct).padStart(3, "0")}
            <span className="text-[var(--muted)]">%</span>
          </span>
        </div>

        <div className="intro-identity">
          <p className="intro-name">{profile.name}</p>
          <p className="intro-title">{profile.title.replace(/\s*\|\s*/g, " · ")}</p>
          <p className="label-mono text-[var(--accent)] intro-status" role="status">
            {status}
            {pct < 100 && <span className="intro-dots" aria-hidden="true" />}
          </p>
        </div>
      </div>
    </div>
  );
}

export default IntroLoader;
