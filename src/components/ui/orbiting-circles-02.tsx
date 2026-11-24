import React from "react";
import ParticleSphereAnimation from "@/components/ui/orbiting-circles-02-utils/particalsphear";

/**
 * Orbiting circles around a particle globe (21st.dev "orbiting-circles-02"),
 * adapted for this site:
 * - Tailwind v3 sizes (the original used v4 spacing like w-110)
 * - icons are any React node (the site passes skill logos), placed evenly
 *   around each ring; the original's +180° "mirror" copies are optional
 * - optional `center` content sits on the globe (the site's logo)
 * - keyframes live in globals.css; themed with site tokens
 * The orbits are pure CSS, so this renders on the server; only the globe
 * canvas is a client component.
 */

export interface OrbitIcon {
  /** Accessible name (the whole visual is decorative; kept for titles). */
  label: string;
  node: React.ReactNode;
  /** Start angle in degrees; omit to spread icons evenly. */
  angle?: number;
}

export interface Orbit {
  /** Tailwind size classes for the ring, e.g. "w-[27.5rem] h-[27.5rem]". */
  size: string;
  /** Seconds per revolution. */
  duration: number;
  icons: OrbitIcon[];
  /** Add a copy of each icon 180° opposite (the original demo's behaviour). */
  mirror?: boolean;
}

interface OrbitingCirclesGlobeProps {
  orbits: Orbit[];
  /** Content placed on the globe (e.g. a logo). */
  center?: React.ReactNode;
  className?: string;
}

export default function OrbitingCirclesGlobe({ orbits, center, className }: OrbitingCirclesGlobeProps) {
  return (
    <div
      aria-hidden="true"
      className={`relative w-full h-[27.5rem] md:h-[40rem] overflow-hidden flex justify-center ${className ?? ""}`}
    >
      {/* Centre particle globe, half below the bottom edge */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 aspect-square pointer-events-none w-[18.75rem] md:w-[36.25rem] z-10">
        <ParticleSphereAnimation />
      </div>

      {center && (
        <div className="absolute left-1/2 -translate-x-1/2 bottom-[3.25rem] md:bottom-[6.5rem] z-20">{center}</div>
      )}

      {/* Orbiting rings */}
      {orbits.map((orbit, index) => {
        const isCW = index % 2 === 0;
        const orbitAnim = isCW ? "orbit-cw" : "orbit-ccw";
        const counterAnim = isCW ? "counter-cw" : "counter-ccw";

        const spaced = orbit.icons.map((ic, i) => ({
          ...ic,
          angle: ic.angle ?? (360 / orbit.icons.length) * i,
        }));
        const allIcons = orbit.mirror
          ? [...spaced, ...spaced.map((ic) => ({ ...ic, angle: ic.angle + 180, label: `${ic.label}-mirror` }))]
          : spaced;

        return (
          <div
            key={index}
            className={`absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 rounded-full border border-[var(--border)] ${orbit.size}`}
          >
            {allIcons.map((iconData, iconIndex) => (
              <div
                key={iconIndex}
                className="absolute top-0 left-1/2 h-1/2 -ml-6 md:-ml-7 origin-bottom flex flex-col justify-start items-center"
                style={
                  {
                    "--start-angle": `${iconData.angle}deg`,
                    animation: `${orbitAnim} ${orbit.duration}s linear infinite`,
                  } as React.CSSProperties
                }
              >
                <div
                  title={iconData.label}
                  className="w-12 h-12 md:w-14 md:h-14 p-2.5 md:p-3 flex items-center justify-center border border-[var(--border-hover)] rounded-full bg-[#F4F6EC] shadow-sm -mt-6 md:-mt-7 relative z-10"
                  style={
                    {
                      "--counter-offset": `${-iconData.angle}deg`,
                      animation: `${counterAnim} ${orbit.duration}s linear infinite`,
                    } as React.CSSProperties
                  }
                >
                  {iconData.node}
                </div>
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
}
