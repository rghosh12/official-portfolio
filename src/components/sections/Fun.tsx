import { BookOpen, MapPin } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Section } from "@/components/ui/Section";
import { countriesVisited, heroStats } from "@/data/resume";
import { WorldMapInline } from "@/components/sections/WorldMapInline";

export function Fun() {
  return (
    <Section id="fun">
      <SectionHeading
        label="Beyond the lab"
        title="Fun"
        description="Personal milestones and places explored along the way."
      />

      <div className="grid sm:grid-cols-2 gap-5 mb-8">
        <div className="bg-[var(--surface-2)] border border-[var(--border)] rounded-xl p-6">
          <div className="flex items-start gap-4">
            <div className="w-9 h-9 rounded-lg bg-[var(--surface)] border border-[var(--border)] flex items-center justify-center shrink-0">
              <BookOpen size={17} className="text-[var(--accent)]" />
            </div>
            <div>
              <p className="text-3xl font-bold text-[var(--text)]">
                {heroStats.literatureReadingCount}
              </p>
              <p className="text-sm text-[var(--muted)] mt-1">Literature Reading Counter</p>
            </div>
          </div>
        </div>

        <div className="bg-[var(--surface-2)] border border-[var(--border)] rounded-xl p-6">
          <div className="flex items-start gap-4">
            <div className="w-9 h-9 rounded-lg bg-[var(--surface)] border border-[var(--border)] flex items-center justify-center shrink-0">
              <MapPin size={17} className="text-[var(--accent)]" />
            </div>
            <div>
              <p className="text-3xl font-bold text-[var(--text)]">{countriesVisited.length}</p>
              <p className="text-sm text-[var(--muted)] mt-1">Countries Visited</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[var(--surface-2)] border border-[var(--border)] rounded-xl p-6">
        <div className="flex flex-wrap gap-x-4 gap-y-2 mb-4">
          {countriesVisited.map(({ code, name }) => (
            <span
              key={code}
              className="inline-flex items-center gap-2 text-sm text-[var(--text-secondary)]"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-[var(--accent)]" aria-hidden />
              {name}
            </span>
          ))}
        </div>
        <WorldMapInline />
      </div>
    </Section>
  );
}
