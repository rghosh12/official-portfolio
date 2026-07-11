"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import type { SvgWorldMapInstance } from "@/types/svg-world-map";
import { countriesVisited, visitedCountryColor } from "@/data/resume";

const MAP_HOST_ID = "world-map-parking";
const MAP_CONTAINER_ID = "svg-world-map-container";

const MAP_OPTIONS = {
  libPath: "/world-map/",
  bigMap: false,
  showOcean: true,
  showAntarctica: false,
  showLabels: true,
  showMicroLabels: false,
  showMicroStates: true,
  showInfoBox: false,
  oceanColor: "#0a0a0a",
  worldColor: "#262626",
  labelFill: { out: "#737373", over: "#e5e5e5", click: "#fafafa" },
  countryStroke: { out: "#404040", over: "#525252", click: "#8b9d83" },
  countryStrokeWidth: { out: "0.5", over: "0.8", click: "1" },
  provinceFill: { out: "#262626", over: "#404040", click: "#525252" },
  provinceStroke: { out: "#404040", over: "#525252", click: "#8b9d83" },
  provinceStrokeWidth: { out: "0.1", over: "0.5", click: "0.5" },
  groupCountries: true,
  trackCoords: false,
};

function loadSvgWorldMapScript(): Promise<void> {
  if (window.svgWorldMap) return Promise.resolve();

  return new Promise((resolve, reject) => {
    const existing = document.querySelector('script[data-svg-world-map="true"]');
    if (existing) {
      existing.addEventListener("load", () => resolve());
      existing.addEventListener("error", () => reject(new Error("Failed to load world map")));
      return;
    }

    const script = document.createElement("script");
    script.src = "/world-map/svg-world-map.js";
    script.async = true;
    script.dataset.svgWorldMap = "true";
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load world map"));
    document.body.appendChild(script);
  });
}

function getOrCreateMapHost(): HTMLDivElement {
  let host = document.getElementById(MAP_HOST_ID) as HTMLDivElement | null;
  if (!host) {
    host = document.createElement("div");
    host.id = MAP_HOST_ID;
    host.style.display = "none";
    document.body.appendChild(host);
  }
  return host;
}

function parkMapContainer() {
  const container = document.getElementById(MAP_CONTAINER_ID);
  const host = getOrCreateMapHost();
  if (container && container.parentElement !== host) {
    host.appendChild(container);
  }
}

interface WorldMapModalProps {
  open: boolean;
  onClose: () => void;
}

export function WorldMapModal({ open, onClose }: WorldMapModalProps) {
  const mapMountRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<SvgWorldMapInstance | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const highlightVisitedCountries = useCallback((map: SvgWorldMapInstance) => {
    const visitedColors = Object.fromEntries(
      countriesVisited.map(({ code }) => [code, visitedCountryColor])
    );
    map.reset();
    map.update(visitedColors);
  }, []);

  useEffect(() => {
    if (!open) {
      parkMapContainer();
      return;
    }

    let cancelled = false;

    async function initMap() {
      setLoading(true);
      setError(null);

      try {
        await loadSvgWorldMapScript();
        if (cancelled || !mapMountRef.current) return;

        if (!mapInstanceRef.current) {
          if (!window.svgWorldMap) {
            throw new Error("World map library unavailable");
          }
          mapInstanceRef.current = await window.svgWorldMap(MAP_OPTIONS);
        }

        const container = document.getElementById(MAP_CONTAINER_ID);
        if (container && mapMountRef.current) {
          mapMountRef.current.appendChild(container);
          container.style.display = "block";
          container.style.width = "100%";
          container.style.height = "100%";
          container.style.position = "relative";
        }

        highlightVisitedCountries(mapInstanceRef.current);
      } catch {
        if (!cancelled) {
          setError("Unable to load the world map. Please try again.");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    initMap();

    return () => {
      cancelled = true;
      parkMapContainer();
    };
  }, [open, highlightVisitedCountries]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="world-map-title"
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        aria-label="Close world map"
        onClick={onClose}
      />

      <div className="relative w-full max-w-5xl bg-[var(--surface-2)] border border-[var(--border)] rounded-2xl shadow-2xl overflow-hidden">
        <div className="flex items-start justify-between gap-4 px-5 py-4 border-b border-[var(--border)]">
          <div>
            <h2 id="world-map-title" className="text-lg font-semibold text-[var(--text)]">
              Countries Visited
            </h2>
            <p className="text-sm text-[var(--muted)] mt-1">
              Highlighted countries match travel from research, study, and work.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="shrink-0 p-2 rounded-lg border border-[var(--border)] text-[var(--muted)] hover:text-[var(--text)] hover:border-[var(--accent)] transition-colors"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        <div className="px-5 py-3 border-b border-[var(--border)] flex flex-wrap gap-x-4 gap-y-2">
          {countriesVisited.map(({ code, name }) => (
            <span key={code} className="inline-flex items-center gap-2 text-sm text-[var(--text-secondary)]">
              <span className="w-2.5 h-2.5 rounded-full bg-[var(--accent)]" aria-hidden />
              {name}
            </span>
          ))}
        </div>

        <div className="relative aspect-[1000/507] bg-[var(--page-bg)]">
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center text-sm text-[var(--muted)]">
              Loading map…
            </div>
          )}
          {error && (
            <div className="absolute inset-0 flex items-center justify-center px-6 text-center text-sm text-[var(--error-light)]">
              {error}
            </div>
          )}
          <div ref={mapMountRef} className="absolute inset-0" />
        </div>

        <p className="px-5 py-3 text-[11px] text-[var(--muted)] border-t border-[var(--border)]">
          Map powered by{" "}
          <a
            href="https://github.com/raphaellepuschitz/SVG-World-Map"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--accent)] hover:text-[var(--accent-light)]"
          >
            SVG World Map
          </a>
        </p>
      </div>
    </div>
  );
}
