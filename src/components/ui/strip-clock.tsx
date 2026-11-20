"use client";

import { Fragment, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Strip clock: each digit of hh:mm:ss is a vertical strip of numbers that
 * slides so the current digit sits in the centre window, and the current
 * digits "pop" on every tick. React port of the classic strip-clock script
 * (translateY by digit × cell height, highlight for ~1s).
 *
 * Shows a fixed time zone (not the visitor's) so it reads as "my local time".
 */

interface StripClockProps {
  timeZone: string;
  /** Short place label, e.g. "Seattle, WA". */
  place: string;
  className?: string;
}

type Parts = { h: number; m: number; s: number; zone: string };

// Max digit per strip: h1 0–2, h2 0–9, m1 0–5, m2 0–9, s1 0–5, s2 0–9
const STRIP_MAX = [2, 9, 5, 9, 5, 9];

function readTime(timeZone: string): Parts {
  const now = new Date();
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
    timeZoneName: "short",
  }).formatToParts(now);
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "0";
  return {
    h: Number(get("hour")) % 24,
    m: Number(get("minute")),
    s: Number(get("second")),
    zone: get("timeZoneName"),
  };
}

function Strip({ max, digit, tick }: { max: number; digit: number; tick: number }) {
  return (
    <div className="strip-clock__window" aria-hidden="true">
      <div
        className="strip-clock__strip"
        style={{ transform: `translateY(calc(var(--cell) * ${1 - digit}))` }}
      >
        {Array.from({ length: max + 1 }, (_, n) => (
          <span
            key={n}
            className={cn(
              "strip-clock__num",
              n === digit && "is-current",
              // alternate the animation name so it restarts every second
              n === digit && (tick % 2 ? "pop-a" : "pop-b")
            )}
          >
            {n}
          </span>
        ))}
      </div>
    </div>
  );
}

export function StripClock({ timeZone, place, className }: StripClockProps) {
  // null until mounted: the server can't know the visitor's "now",
  // so strips start at 0 and roll into place on the client.
  const [time, setTime] = useState<Parts | null>(null);

  useEffect(() => {
    let timer: number;
    const update = () => {
      setTime(readTime(timeZone));
      // re-align to the next second boundary so ticks stay crisp
      timer = window.setTimeout(update, 1000 - (Date.now() % 1000) + 5);
    };
    update();
    return () => window.clearTimeout(timer);
  }, [timeZone]);

  const h = time?.h ?? 0;
  const m = time?.m ?? 0;
  const s = time?.s ?? 0;
  const digits = [Math.floor(h / 10), h % 10, Math.floor(m / 10), m % 10, Math.floor(s / 10), s % 10];
  const label = time
    ? `Local time in ${place}: ${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")} ${time.zone}`
    : `Local time in ${place}`;

  return (
    <div
      className={cn("strip-clock", !time && "is-loading", className)}
      role="img"
      aria-label={label}
    >
      <div className="strip-clock__head">
        <span className="label-mono text-[var(--muted)]">Local time · {place}</span>
        <span className="label-mono text-[var(--muted-dark)]">{time?.zone ?? "—"}</span>
      </div>
      <div className="strip-clock__face">
        {digits.map((d, i) => (
          <Fragment key={i}>
            {i > 0 && i % 2 === 0 && (
              <span className="strip-clock__sep" aria-hidden="true">
                :
              </span>
            )}
            <Strip max={STRIP_MAX[i]} digit={d} tick={s} />
          </Fragment>
        ))}
      </div>
    </div>
  );
}

export default StripClock;
