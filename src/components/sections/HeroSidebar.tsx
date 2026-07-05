"use client";

import { useState } from "react";
import { MapPin } from "lucide-react";
import { countriesVisited, heroStats } from "@/data/resume";
import { WorldMapModal } from "@/components/sections/WorldMapModal";

const primaryInterests = [
  "Computational Neuroscience",
  "Neural Networks and Deep Learning (BioLLMs)",
];

export function HeroSidebar() {
  const [mapOpen, setMapOpen] = useState(false);

  return (
    <>
      <div className="hidden lg:block">
        <div className="bg-[var(--surface-2)] border border-[var(--border)] rounded-2xl p-7">
          <p className="text-xs font-semibold tracking-[0.15em] uppercase text-[var(--muted)] mb-5">
            Primary Interests
          </p>
          <ul className="flex flex-col gap-4">
            {primaryInterests.map((area) => (
              <li key={area} className="flex items-start gap-3">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[var(--accent)] shrink-0" />
                <span className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  {area}
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-7 pt-6 border-t border-[var(--border)] grid grid-cols-2 gap-4">
            <div>
              <p className="text-2xl font-bold text-[var(--text)]">
                {heroStats.researchPapersRead}
              </p>
              <p className="text-xs text-[var(--muted)] mt-0.5">Research papers read</p>
            </div>
            <button
              type="button"
              onClick={() => setMapOpen(true)}
              className="text-left rounded-lg -m-2 p-2 hover:bg-white/5 transition-colors group"
              aria-label="Show countries visited on world map"
            >
              <p className="text-2xl font-bold text-[var(--text)] group-hover:text-[var(--accent-light)] transition-colors">
                {countriesVisited.length}
              </p>
              <p className="text-xs text-[var(--muted)] mt-0.5 inline-flex items-center gap-1 group-hover:text-[var(--accent)] transition-colors">
                <MapPin size={12} aria-hidden />
                Countries visited
              </p>
            </button>
          </div>
        </div>
      </div>

      <WorldMapModal open={mapOpen} onClose={() => setMapOpen(false)} />
    </>
  );
}
