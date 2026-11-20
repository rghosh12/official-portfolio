"use client";

import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import type { KeyboardEvent, ReactNode } from "react";
import {
  AnimatePresence,
  motion,
  useAnimationControls,
  useReducedMotion,
} from "motion/react";
import { ArrowDown, ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

/**
 * Year-paged timeline, adapted from 21st.dev "timeline-02".
 *
 * Differences from the original:
 * - Entries are grouped by the year they START. An entry that runs into
 *   later years appears once in full (its start year) and, in each later
 *   year, as a compact "continuing" row pinned to the top. The same element
 *   morphs between the two, so nothing is duplicated.
 * - Scrolling pages through years. Inside a year the content scrolls
 *   normally; at the end of a year the first scroll gesture holds (with a
 *   nudge + hint), the second moves to the next/previous year. At the first
 *   and last year the page is released so the user can leave the timeline.
 * - Transitions move vertically in the scroll direction, so paging reads as
 *   one continuous page rather than swapping slides.
 */

export interface TimelineEntry {
  id: string;
  startYear: number;
  /** Inclusive. Equal to startYear for single-year entries. */
  endYear: number;
  /** Sort key within a year (e.g. 202406 for June 2024). */
  order: number;
  /** Full card, shown in the start year. */
  full: ReactNode;
  /** Compact row, shown at the top of each later year the entry spans. */
  compact?: ReactNode;
}

interface TimelineProps {
  entries: TimelineEntry[];
  noun?: { one: string; many: string };
  label?: string;
  className?: string;
}

type Dir = 1 | -1;

const GESTURE_GAP_MS = 220; // wheel events closer than this belong to one gesture
const LOCK_MS = 650; // swallow input while a year transition plays
const DOCK_MS = 700; // swallow input while the timeline docks to the viewport
const SWIPE_MIN = 48;

const itemVariants = {
  enter: (d: Dir) => ({ opacity: 0, y: d * 56 }),
  center: { opacity: 1, y: 0 },
  exit: (d: Dir) => ({ opacity: 0, y: d * -56 }),
};

export const Timeline = ({
  entries,
  noun = { one: "entry", many: "entries" },
  label = "Timeline",
  className,
}: TimelineProps) => {
  const years = useMemo(
    () => Array.from(new Set(entries.map((e) => e.startYear))).sort((a, b) => a - b),
    [entries]
  );

  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState<Dir>(1);
  const [armed, setArmed] = useState<Dir | null>(null);
  const reduced = useReducedMotion();
  const nudge = useAnimationControls();

  const rootRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Mutable gesture state read by the native listeners.
  const st = useRef({
    index: 0,
    armed: null as Dir | null,
    lastWheel: 0,
    gestureDir: 0,
    gestureUsed: false,
    lockUntil: 0,
    dockUntil: 0,
    arrive: "click" as "down" | "up" | "click",
    touchX: 0,
    touchY: 0,
    touchAtTop: true,
    touchAtBottom: true,
    touchInPanel: false,
  });
  st.current.index = index;
  st.current.armed = armed;

  const year = years[index];

  const { continuing, starting } = useMemo(() => {
    const byOrder = (a: TimelineEntry, b: TimelineEntry) => a.order - b.order;
    return {
      continuing: entries
        .filter((e) => e.compact && e.startYear < year && e.endYear >= year)
        .sort(byOrder),
      starting: entries.filter((e) => e.startYear === year).sort(byOrder),
    };
  }, [entries, year]);

  const goTo = useCallback(
    (next: number, how: "down" | "up" | "click") => {
      const s = st.current;
      if (next < 0 || next >= years.length || next === s.index) return;
      s.arrive = how;
      s.lockUntil = performance.now() + LOCK_MS;
      s.armed = null;
      setArmed(null);
      setDir(how === "up" ? -1 : how === "down" ? 1 : next > s.index ? 1 : -1);
      setIndex(next);
    },
    [years.length]
  );

  /** A scroll gesture that hit the end of the current year. */
  const boundaryGesture = useCallback(
    (d: Dir) => {
      const s = st.current;
      if (s.armed === d) {
        goTo(s.index + d, d > 0 ? "down" : "up");
        return;
      }
      s.armed = d;
      setArmed(d);
      nudge.start({
        y: [0, d * -14, 0],
        transition: { duration: reduced ? 0 : 0.45, ease: "easeOut" },
      });
    },
    [goTo, nudge, reduced]
  );

  // Keep the latest callbacks reachable from the native listeners.
  const boundaryRef = useRef(boundaryGesture);
  boundaryRef.current = boundaryGesture;
  const reducedRef = useRef(reduced);
  reducedRef.current = reduced;

  const dock = (rect: DOMRect) => {
    st.current.dockUntil = performance.now() + DOCK_MS;
    window.scrollTo({
      top: window.scrollY + rect.top,
      behavior: reducedRef.current ? "auto" : "smooth",
    });
  };

  // ── Wheel (mouse + trackpad) ────────────────────────────────────────────
  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      const root = rootRef.current;
      const panel = panelRef.current;
      if (e.ctrlKey || !root || !panel) return;
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;

      let dy = e.deltaY;
      if (e.deltaMode === 1) dy *= 16;
      else if (e.deltaMode === 2) dy *= window.innerHeight;
      if (Math.abs(dy) < 0.5) return;

      const d: Dir = dy > 0 ? 1 : -1;
      const s = st.current;
      const now = performance.now();
      const newGesture = now - s.lastWheel > GESTURE_GAP_MS || d !== s.gestureDir;
      s.lastWheel = now;
      s.gestureDir = d;
      if (newGesture) s.gestureUsed = false;

      const rect = root.getBoundingClientRect();
      const vh = window.innerHeight;
      const docked = Math.abs(rect.top) <= 2;

      if (!docked) {
        if (now < s.dockUntil) {
          e.preventDefault();
          return;
        }
        const fromAbove = d > 0 && rect.top > 2 && rect.top < vh * 0.7;
        const fromBelow = d < 0 && rect.top < -2 && rect.bottom > vh * 0.3;
        if (fromAbove || fromBelow) {
          e.preventDefault();
          s.gestureUsed = true; // the docking gesture never counts toward paging
          dock(rect);
        }
        return; // otherwise the page scrolls normally
      }

      if (now < s.dockUntil || now < s.lockUntil) {
        e.preventDefault();
        return;
      }

      const canScroll =
        d > 0
          ? panel.scrollTop + panel.clientHeight < panel.scrollHeight - 1
          : panel.scrollTop > 0;

      if (canScroll) {
        e.preventDefault();
        panel.scrollTop += dy;
        s.gestureUsed = true;
        if (s.armed) {
          s.armed = null;
          setArmed(null);
        }
        return;
      }

      const atEdge = (d > 0 && s.index === years.length - 1) || (d < 0 && s.index === 0);
      if (atEdge) {
        // Release to the page on a fresh gesture; swallow leftover inertia.
        if (s.gestureUsed) e.preventDefault();
        return;
      }

      e.preventDefault();
      if (!newGesture || s.gestureUsed) return;
      s.gestureUsed = true;
      boundaryRef.current(d);
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, [years.length]);

  // ── Touch ───────────────────────────────────────────────────────────────
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const onStart = (e: TouchEvent) => {
      const p = panelRef.current;
      if (!p) return;
      const s = st.current;
      s.touchX = e.touches[0].clientX;
      s.touchY = e.touches[0].clientY;
      s.touchAtTop = p.scrollTop <= 0;
      s.touchAtBottom = p.scrollTop + p.clientHeight >= p.scrollHeight - 1;
      s.touchInPanel = p.contains(e.target as Node);
    };

    // Keep the page still while docked, except at the first/last year edges.
    const onMove = (e: TouchEvent) => {
      const p = panelRef.current;
      if (!p || !e.cancelable) return;
      const s = st.current;
      const t = e.touches[0];
      const dy = s.touchY - t.clientY;
      const dx = s.touchX - t.clientX;
      if (Math.abs(dx) > Math.abs(dy)) return; // horizontal: year rail on mobile
      if (Math.abs(root.getBoundingClientRect().top) > 2) return;
      const d: Dir = dy > 0 ? 1 : -1;
      const canScroll =
        d > 0 ? p.scrollTop + p.clientHeight < p.scrollHeight - 1 : p.scrollTop > 0;
      if (s.touchInPanel && canScroll) return;
      const atEdge = (d > 0 && s.index === years.length - 1) || (d < 0 && s.index === 0);
      if (atEdge && !s.touchInPanel) return;
      e.preventDefault();
    };

    const onEnd = (e: TouchEvent) => {
      const s = st.current;
      const dy = s.touchY - e.changedTouches[0].clientY;
      const dx = s.touchX - e.changedTouches[0].clientX;
      if (Math.abs(dy) < SWIPE_MIN || Math.abs(dx) > Math.abs(dy)) return;
      const d: Dir = dy > 0 ? 1 : -1;
      const rect = root.getBoundingClientRect();
      const vh = window.innerHeight;

      if (Math.abs(rect.top) > 2) {
        const fromAbove = d > 0 && rect.top > 2 && rect.top < vh * 0.7;
        const fromBelow = d < 0 && rect.top < -2 && rect.bottom > vh * 0.3;
        if (fromAbove || fromBelow) dock(rect);
        return;
      }
      if (performance.now() < s.lockUntil) return;
      if (d > 0 && !s.touchAtBottom) return;
      if (d < 0 && !s.touchAtTop) return;

      const atEdge = (d > 0 && s.index === years.length - 1) || (d < 0 && s.index === 0);
      if (atEdge) {
        if (s.touchInPanel) {
          window.scrollBy({ top: d * vh * 0.5, behavior: reducedRef.current ? "auto" : "smooth" });
        }
        return;
      }
      boundaryRef.current(d);
    };

    root.addEventListener("touchstart", onStart, { passive: true });
    root.addEventListener("touchmove", onMove, { passive: false });
    root.addEventListener("touchend", onEnd, { passive: true });
    return () => {
      root.removeEventListener("touchstart", onStart);
      root.removeEventListener("touchmove", onMove);
      root.removeEventListener("touchend", onEnd);
    };
  }, [years.length]);

  // Land at the top of a year when moving forward, at its bottom when moving back.
  // Pinned synchronously after commit (no rAF, so it also holds in background tabs).
  useLayoutEffect(() => {
    const p = panelRef.current;
    if (!p) return;
    const how = st.current.arrive;
    let pinned = 0;
    const pin = () => {
      pinned = how === "up" ? p.scrollHeight - p.clientHeight : 0;
      p.scrollTop = pinned;
    };
    pin();
    // Re-pin once exit/enter animations settle, unless the reader already moved.
    const t = window.setTimeout(() => {
      if (Math.abs(p.scrollTop - pinned) < 2) pin();
    }, 500);
    return () => window.clearTimeout(t);
  }, [index]);

  // Center the active year in the rail without scrolling the page.
  useEffect(() => {
    const rail = railRef.current;
    const btn = buttonRefs.current[index];
    if (!rail || !btn) return;
    const vertical = getComputedStyle(rail).flexDirection === "column";
    const behavior = reduced ? "auto" : "smooth";
    if (vertical) {
      rail.scrollTo({ top: btn.offsetTop - rail.clientHeight / 2 + btn.offsetHeight / 2, behavior });
    } else {
      rail.scrollTo({ left: btn.offsetLeft - rail.clientWidth / 2 + btn.offsetWidth / 2, behavior });
    }
  }, [index, reduced]);

  const onRailKey = (e: KeyboardEvent<HTMLDivElement>) => {
    const step =
      e.key === "ArrowDown" || e.key === "ArrowRight" ? 1 : e.key === "ArrowUp" || e.key === "ArrowLeft" ? -1 : 0;
    if (!step) return;
    e.preventDefault();
    const next = Math.min(years.length - 1, Math.max(0, index + step));
    goTo(next, "click");
    buttonRefs.current[next]?.focus();
  };

  const transition = { duration: reduced ? 0 : 0.45, ease: [0.22, 1, 0.36, 1] as const };
  const countLabel = `${starting.length} ${starting.length === 1 ? noun.one : noun.many}${
    continuing.length ? ` · ${continuing.length} ongoing` : ""
  }`;
  const targetYear = armed ? years[index + armed] : undefined;

  if (years.length === 0) return null;

  return (
    <div
      ref={rootRef}
      role="region"
      aria-label={label}
      className={cn("relative w-full h-[100svh] pt-16 pb-4", className)}
    >
      <div className="h-full grid grid-cols-1 grid-rows-[auto_auto_minmax(0,1fr)] lg:grid-cols-[6.5rem_minmax(0,3fr)_minmax(0,8fr)] lg:grid-rows-1 gap-x-8 gap-y-4">
        {/* Year rail */}
        <div className="relative min-h-0 flex lg:flex-col items-center">
          <div
            ref={railRef}
            role="tablist"
            aria-label="Years"
            aria-orientation="vertical"
            onKeyDown={onRailKey}
            className="relative flex flex-row lg:flex-col items-center gap-3 lg:gap-4 overflow-auto no-scrollbar w-full lg:h-full px-[40%] lg:px-0 lg:py-40 pt-1"
          >
            <span
              aria-hidden
              className="hidden lg:block absolute left-1/2 -translate-x-1/2 top-40 bottom-40 w-px bg-[var(--border)]"
            />
            {years.map((y, i) => (
              <Button
                key={y}
                ref={(el) => {
                  buttonRefs.current[i] = el;
                }}
                role="tab"
                aria-selected={i === index}
                tabIndex={i === index ? 0 : -1}
                variant={i === index ? "default" : "outline"}
                onClick={() => goTo(i, "click")}
                // Selected year is the primary face, latched down (aria-selected).
                className={cn(
                  "shrink-0 tabular-nums",
                  armed && i === index + armed && "box-btn--hint animate-pulse"
                )}
              >
                {y}
              </Button>
            ))}
          </div>
        </div>

        {/* Year summary */}
        <div className="flex flex-row lg:flex-col items-end lg:items-start justify-between lg:justify-start gap-3 lg:pt-10 xl:ps-6">
          <div className="flex flex-col items-start gap-3">
            <Badge
              variant="secondary"
              className="rounded-full h-6 px-2.5 py-1 whitespace-nowrap font-mono font-normal text-[11px] text-[var(--text-secondary)] hover:bg-secondary"
            >
              {countLabel}
            </Badge>
            <div className="relative overflow-hidden">
              <AnimatePresence mode="popLayout" initial={false} custom={dir}>
                <motion.h2
                  key={year}
                  custom={dir}
                  variants={itemVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={transition}
                  className="text-6xl lg:text-7xl xl:text-8xl font-normal tracking-[-0.04em] leading-none text-foreground tabular-nums"
                >
                  {year}
                </motion.h2>
              </AnimatePresence>
            </div>
          </div>
          <div className="flex flex-col items-end lg:items-start gap-1.5 lg:mt-4">
            <span className="label-mono text-[var(--muted)]">
              {String(index + 1).padStart(2, "0")} / {String(years.length).padStart(2, "0")}
            </span>
            <span className="label-mono text-[var(--muted-dark)] hidden lg:block max-w-[16rem]">
              Scroll to read. At the end of a year, scroll once more to move on.
            </span>
          </div>
        </div>

        {/* Entries */}
        <div className="relative min-h-0">
          <div
            ref={panelRef}
            tabIndex={0}
            aria-label={`${label}: ${year}`}
            className="h-full overflow-y-auto [@media(pointer:coarse)]:overscroll-contain no-scrollbar lg:pt-10 pb-24 outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] rounded-xl"
          >
            <motion.div animate={nudge}>
              <AnimatePresence mode="popLayout" initial={false} custom={dir}>
                {[...continuing.map((e) => ({ e, mode: "compact" as const })),
                  ...starting.map((e) => ({ e, mode: "full" as const }))].map(({ e, mode }) => (
                  <motion.div
                    key={e.id}
                    layout="position"
                    custom={dir}
                    variants={itemVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={transition}
                    className="mb-4"
                  >
                    <AnimatePresence mode="popLayout" initial={false}>
                      <motion.div
                        key={mode}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: reduced ? 0 : 0.18 }}
                      >
                        {mode === "compact" ? e.compact : e.full}
                      </motion.div>
                    </AnimatePresence>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Edge fades */}
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[var(--page-bg)] to-transparent pointer-events-none" />

          {/* "Scroll again" hint */}
          <AnimatePresence>
            {armed && targetYear !== undefined && (
              <motion.div
                key={armed}
                role="status"
                initial={{ opacity: 0, y: armed * 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: reduced ? 0 : 0.25 }}
                className={cn(
                  "absolute inset-x-0 flex justify-center z-20 pointer-events-none",
                  armed > 0 ? "bottom-4" : "top-2 lg:top-4"
                )}
              >
                <span className="inline-flex items-center gap-2 rounded-full border border-[var(--accent)]/40 bg-[var(--surface)] px-3 py-1.5 label-mono text-[var(--accent)] shadow-lg backdrop-blur">
                  {armed > 0 ? <ArrowDown size={12} aria-hidden /> : <ArrowUp size={12} aria-hidden />}
                  Scroll again for {targetYear}
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Timeline;
