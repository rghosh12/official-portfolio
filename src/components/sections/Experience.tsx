import { MapPin } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Section } from "@/components/ui/Section";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { experience, type Experience as ExperienceItem } from "@/data/resume";

export function Experience() {
  const research = experience.filter((e) => e.type === "Research");
  const other = experience.filter((e) => e.type !== "Research");

  return (
    <Section id="experience" divider>
      <SectionHeading
        label="Experience"
        title="Research &amp; Professional Experience"
        description="Four research institutions across two countries, plus campus roles."
      />

      {/* Research — foregrounded as a timeline of cards */}
      <h3 className="text-xs font-semibold tracking-wider uppercase text-[var(--muted)] mb-8">
        Research Experience
      </h3>
      <div className="flex flex-col gap-6 mb-16">
        {research.map((exp, index) => (
          <AnimatedSection key={exp.id} delay={index * 60} animation="fade-up">
            <ResearchCard exp={exp} />
          </AnimatedSection>
        ))}
      </div>

      {/* Other roles — condensed, visually subordinate */}
      <h3 className="text-xs font-semibold tracking-wider uppercase text-[var(--muted)] mb-6">
        Other Experience
      </h3>
      <div className="flex flex-col divide-y divide-[var(--border)] border-y border-[var(--border)]">
        {other.map((exp) => (
          <div
            key={exp.id}
            className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 py-4"
          >
            <div>
              <p className="text-sm font-medium text-[var(--text)]">{exp.role}</p>
              <p className="text-xs text-[var(--muted)] mt-0.5">{exp.org}</p>
            </div>
            <p className="text-xs text-[var(--muted)] shrink-0">{exp.period}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

function ResearchCard({ exp }: { exp: ExperienceItem }) {
  return (
    <div className="relative bg-[var(--surface-2)] border border-[var(--border)] rounded-xl p-6 pl-7 hover:border-[var(--accent)] transition-colors">
      {/* Accent rule = timeline node */}
      <span className="absolute left-0 top-6 bottom-6 w-[3px] rounded-full bg-[var(--accent)]" />

      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
        <div>
          <h4 className="font-semibold text-[var(--text)] text-base leading-snug">
            {exp.role}
          </h4>
          <p className="text-[var(--accent)] text-sm mt-1">{exp.org}</p>
          {exp.pi && (
            <p className="text-xs text-[var(--muted)] mt-1">PI: {exp.pi}</p>
          )}
        </div>
        <div className="text-left sm:text-right shrink-0">
          <p className="text-xs text-[var(--muted)]">{exp.period}</p>
          <p className="flex items-center sm:justify-end gap-1 text-xs text-[var(--muted)] mt-1">
            <MapPin size={11} />
            {exp.location}
          </p>
        </div>
      </div>

      <ul className="flex flex-col gap-2">
        {exp.bullets.slice(0, 2).map((b, i) => (
          <li
            key={i}
            className="text-sm text-[var(--muted)] leading-relaxed pl-4 relative"
          >
            <span className="absolute left-0 top-2 w-1.5 h-1.5 rounded-full bg-[var(--accent)]/60" />
            {b}
          </li>
        ))}
      </ul>
    </div>
  );
}
