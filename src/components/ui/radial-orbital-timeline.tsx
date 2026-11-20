"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { CSSProperties, KeyboardEvent, MouseEvent, ElementType, ReactNode } from "react";
import { ArrowRight, Link as LinkIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export interface OrbitalLink {
  name: string;
  href?: string;
  /** Rendered inside a 32px square. */
  icon: ReactNode;
}

export interface TimelineItem {
  id: number;
  title: string;
  /** Short mono caption shown in the card header (e.g. "8 tools"). */
  meta: string;
  content?: string;
  category: string;
  icon: ElementType;
  relatedIds: number[];
  links?: OrbitalLink[];
}

interface RadialOrbitalTimelineProps {
  timelineData: TimelineItem[];
  /** Accessible label for the whole orbit. */
  label?: string;
}

const MAX_RADIUS = 190;
const LABEL_ALLOWANCE = 52; // keeps node labels inside the container

/**
 * Radial orbital timeline, adapted from 21st.dev for this site:
 * - sized from its container (ResizeObserver) instead of h-screen
 * - themed with the site tokens instead of hard-coded black/white
 * - nodes are keyboard-operable buttons; auto-rotation honours
 *   prefers-reduced-motion
 * - the detail card lists links (logos) instead of status/energy
 */
export default function RadialOrbitalTimeline({
  timelineData,
  label = "Orbital timeline",
}: RadialOrbitalTimelineProps) {
  const [activeNodeId, setActiveNodeId] = useState<number | null>(null);
  const [rotationAngle, setRotationAngle] = useState(0);
  const [autoRotate, setAutoRotate] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [radius, setRadius] = useState(MAX_RADIUS);
  const [containerWidth, setContainerWidth] = useState(0);
  const [cardHeight, setCardHeight] = useState(0);
  const measureCard = useCallback((el: HTMLDivElement | null) => {
    setCardHeight(el ? el.offsetHeight : 0);
  }, []);
  const containerRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);

  // Size the orbit from the available width.
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      const w = entry.contentRect.width;
      setContainerWidth(w);
      setRadius(Math.max(90, Math.min(MAX_RADIUS, w / 2 - LABEL_ALLOWANCE)));
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!autoRotate || reducedMotion) return;
    const timer = setInterval(() => {
      setRotationAngle((prev) => Number(((prev + 0.3) % 360).toFixed(3)));
    }, 50);
    return () => clearInterval(timer);
  }, [autoRotate, reducedMotion]);

  const getRelatedItems = useCallback(
    (itemId: number | null): number[] =>
      timelineData.find((item) => item.id === itemId)?.relatedIds ?? [],
    [timelineData]
  );

  const reset = () => {
    setActiveNodeId(null);
    setAutoRotate(true);
  };

  const toggleItem = (id: number) => {
    if (activeNodeId === id) {
      reset();
      return;
    }
    setActiveNodeId(id);
    setAutoRotate(false);
    // Bring the selected node to the top of the orbit.
    const index = timelineData.findIndex((item) => item.id === id);
    setRotationAngle(270 - (index / timelineData.length) * 360);
  };

  const handleContainerClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === containerRef.current || e.target === orbitRef.current) reset();
  };

  const handleNodeKey = (e: KeyboardEvent<HTMLDivElement>, id: number) => {
    if (e.target !== e.currentTarget) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleItem(id);
    } else if (e.key === "Escape") {
      reset();
    }
  };

  const calculateNodePosition = (index: number, total: number) => {
    const angle = ((index / total) * 360 + rotationAngle) % 360;
    const radian = (angle * Math.PI) / 180;
    // Rounded so server and client render identical style strings (no hydration mismatch).
    const round = (n: number) => Math.round(n * 100) / 100;
    const x = round(radius * Math.cos(radian));
    const y = round(radius * Math.sin(radian));
    const zIndex = Math.round(100 + 50 * Math.cos(radian));
    const opacity = round(Math.max(0.45, Math.min(1, 0.45 + 0.55 * ((1 + Math.sin(radian)) / 2))));
    return { x, y, zIndex, opacity };
  };

  const relatedToActive = getRelatedItems(activeNodeId);

  // The open card hangs below the top node; on small (stacked) layouts,
  // reserve the part that spills past the orbit so it doesn't cover what follows.
  const CARD_OFFSET = 76; // matches top-[4.75rem]
  const cardSpill =
    activeNodeId !== null && cardHeight > 0
      ? Math.max(0, CARD_OFFSET + cardHeight - radius - containerWidth / 2 + 16)
      : 0;

  return (
    <div
      ref={containerRef}
      onClick={handleContainerClick}
      role="group"
      aria-label={label}
      className="relative w-full aspect-square flex items-center justify-center [overflow-x:clip] max-lg:mb-[var(--card-spill)] transition-[margin] duration-500"
      style={{ "--card-spill": `${Math.round(cardSpill)}px` } as CSSProperties}
    >
      <div
        ref={orbitRef}
        className="absolute inset-0 flex items-center justify-center"
        style={{ perspective: "1000px" }}
      >
        {/* Core */}
        <div className="absolute w-14 h-14 rounded-full bg-gradient-to-br from-[var(--accent)] via-[var(--accent-hover)] to-[var(--border-hover)] animate-pulse flex items-center justify-center z-10 pointer-events-none">
          <div className="absolute w-[4.5rem] h-[4.5rem] rounded-full border border-[var(--accent)]/30 animate-ping opacity-70" />
          <div
            className="absolute w-[5.5rem] h-[5.5rem] rounded-full border border-[var(--accent)]/15 animate-ping opacity-50"
            style={{ animationDelay: "0.5s" }}
          />
          <div className="w-7 h-7 rounded-full bg-[var(--page-bg)]/80 backdrop-blur-md" />
        </div>

        {/* Orbit ring */}
        <div
          className="absolute rounded-full border border-[var(--border)] pointer-events-none"
          style={{ width: radius * 2, height: radius * 2 }}
        />

        {timelineData.map((item, index) => {
          const position = calculateNodePosition(index, timelineData.length);
          const isExpanded = activeNodeId === item.id;
          const isRelated = relatedToActive.includes(item.id);
          const Icon = item.icon;

          return (
            <div
              key={item.id}
              role="button"
              tabIndex={0}
              aria-expanded={isExpanded}
              aria-label={`${item.title}: ${item.meta}`}
              // transform/opacity only: animating z-index would let other nodes
              // paint over the opening card mid-transition.
              className="absolute transition-[transform,opacity] duration-700 cursor-pointer outline-none group"
              style={{
                transform: `translate(${position.x}px, ${position.y}px)`,
                zIndex: isExpanded ? 200 : position.zIndex,
                opacity: isExpanded ? 1 : position.opacity,
              }}
              onClick={(e) => {
                e.stopPropagation();
                toggleItem(item.id);
              }}
              onKeyDown={(e) => handleNodeKey(e, item.id)}
            >
              {/* Halo */}
              <div
                className={`absolute rounded-full pointer-events-none ${isRelated ? "animate-pulse" : ""}`}
                style={{
                  background:
                    "radial-gradient(circle, color-mix(in srgb, var(--accent) 22%, transparent) 0%, transparent 70%)",
                  width: 64,
                  height: 64,
                  left: -12,
                  top: -12,
                }}
              />

              <div
                className={`relative w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 group-focus-visible:ring-2 group-focus-visible:ring-[var(--accent)] group-focus-visible:ring-offset-2 group-focus-visible:ring-offset-[var(--page-bg)] ${
                  isExpanded
                    ? "bg-[var(--accent)] text-[var(--accent-foreground)] border-[var(--accent)] shadow-glow scale-125"
                    : isRelated
                    ? "bg-[var(--surface-3)] text-[var(--accent)] border-[var(--accent)] animate-pulse"
                    : "bg-[var(--surface)] text-[var(--text-secondary)] border-[var(--border-hover)] group-hover:border-[var(--accent)] group-hover:text-[var(--accent)]"
                }`}
              >
                <Icon size={16} aria-hidden="true" />
              </div>

              <div
                className={`absolute top-12 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-medium tracking-[-0.01em] transition-colors duration-300 pointer-events-none ${
                  isExpanded ? "text-[var(--accent)]" : "text-[var(--text-secondary)]"
                }`}
              >
                {item.title}
              </div>

              {isExpanded && (
                <Card
                  ref={measureCard}
                  className="absolute top-[4.75rem] left-1/2 -translate-x-1/2 w-72 max-w-[calc(100vw-2rem)] bg-[var(--surface)] backdrop-blur-lg border-[var(--border-hover)] shadow-xl rounded-xl overflow-visible cursor-default"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-px h-3 bg-[var(--accent)]/60" />
                  <CardHeader className="p-4 pb-2">
                    <div className="flex justify-between items-center">
                      <Badge className="px-2 py-0 font-mono font-normal text-[11px] rounded-md bg-[var(--accent)]/15 text-[var(--accent)] border-[var(--accent)]/30 hover:bg-[var(--accent)]/15">
                        {item.category}
                      </Badge>
                      <span className="label-mono text-[var(--muted)]">{item.meta}</span>
                    </div>
                    <CardTitle className="text-base font-normal tracking-[-0.01em] mt-2">
                      {item.title}
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="p-4 pt-0 text-xs text-[var(--text-secondary)]">
                    {item.content && <p className="mb-3">{item.content}</p>}

                    {item.links && item.links.length > 0 && (
                      <ul className="grid grid-cols-3 gap-2">
                        {item.links.map((link) => {
                          const tile = (
                            <>
                              <span className="w-8 h-8 flex items-center justify-center transition-transform duration-300 group-hover/tile:scale-110">
                                {link.icon}
                              </span>
                              <span className="text-[11px] leading-tight text-center font-sans group-hover/tile:text-[var(--accent)] transition-colors">
                                {link.name}
                              </span>
                            </>
                          );
                          const tileClass =
                            "group/tile flex flex-col items-center justify-center gap-1.5 p-2 h-full rounded-lg border border-[var(--border)] bg-[var(--surface-2)] hover:border-[var(--accent)] transition-colors no-underline";
                          return (
                            <li key={link.name} className="font-sans">
                              {link.href ? (
                                <a
                                  href={link.href}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  aria-label={`Visit ${link.name} official site`}
                                  className={`${tileClass} text-[var(--text-secondary)]`}
                                  style={{ textDecoration: "none" }}
                                >
                                  {tile}
                                </a>
                              ) : (
                                <div className={tileClass}>{tile}</div>
                              )}
                            </li>
                          );
                        })}
                      </ul>
                    )}

                    {item.relatedIds.length > 0 && (
                      <div className="mt-3 pt-3 border-t border-[var(--border)]">
                        <div className="flex items-center mb-2 text-[var(--muted)]">
                          <LinkIcon size={10} className="mr-1" aria-hidden="true" />
                          <span className="label-mono">Connected</span>
                        </div>
                        <div className="flex flex-wrap gap-x-1.5 gap-y-0.5">
                          {item.relatedIds.map((relatedId) => {
                            const relatedItem = timelineData.find((i) => i.id === relatedId);
                            if (!relatedItem) return null;
                            return (
                              <Button
                                key={relatedId}
                                variant="outline"
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleItem(relatedId);
                                }}
                              >
                                {relatedItem.title}
                                <ArrowRight size={10} className="opacity-60" aria-hidden="true" />
                              </Button>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
