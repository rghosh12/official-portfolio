import { MapPin } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Section } from "@/components/ui/Section";
import { OrgLogo } from "@/components/ui/OrgLogo";
import Timeline, { type TimelineEntry } from "@/components/ui/timeline-02";
import { experience, type Experience as ExperienceItem } from "@/data/resume";
import { parsePeriod } from "@/lib/timeline";

export function Experience() {
  const entries: TimelineEntry[] = experience.map((exp) => {
    const { start, end } = parsePeriod(exp.period);
    return {
      id: exp.id,
      startYear: start.year,
      endYear: end.year,
      order: start.year * 100 + start.month,
      full: <ExperienceCard exp={exp} />,
      compact: <ContinuingRow exp={exp} since={start.year} />,
    };
  });

  return (
    <Section id="experience" className="pb-8 md:pb-10">
      <SectionHeading
        label="Experience"
        title="Professional & Research Experience"
        description="Ordered by the year each role began. Roles that run into later years carry forward at the top of those years."
      />
      <Timeline
        entries={entries}
        noun={{ one: "new role", many: "new roles" }}
        label="Experience timeline"
      />
    </Section>
  );
}

function ContinuingRow({ exp, since }: { exp: ExperienceItem; since: number }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-dashed border-[var(--border-hover)] bg-[var(--surface)] px-4 py-3">
      <OrgLogo org={exp.org} size={32} />
      <div className="min-w-0 flex-1 font-sans">
        <span className="label-mono text-[var(--accent)]">
          Continuing · since {since}
        </span>
        <div className="text-sm text-[var(--text)] truncate">{exp.role}</div>
        <div className="text-xs text-[var(--muted)] truncate">{exp.org}</div>
      </div>
      <span className="label-mono text-[var(--muted)] hidden xl:block shrink-0">{exp.period}</span>
    </div>
  );
}

function ExperienceCard({ exp }: { exp: ExperienceItem }) {
  const website = "website" in exp ? exp.website : undefined;
  const logo = <OrgLogo org={exp.org} size={48} className="mt-0.5" />;

  return (
    <article className="bg-[var(--surface-2)] border border-[var(--border)] rounded-xl p-6 hover:border-[var(--accent)] transition-colors">
      <div className="flex items-start gap-4">
        {website ? (
          <a
            href={website}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Visit ${exp.org} — ${exp.role}`}
            className="shrink-0 rounded-[4px] transition-opacity hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
          >
            {logo}
          </a>
        ) : (
          logo
        )}

        <div className="flex-1 min-w-0">
          <div className="flex flex-col xl:flex-row xl:items-start xl:justify-between gap-2 mb-4">
            <div>
              <span className="label-mono text-[var(--muted)]">{exp.type}</span>
              <h3 className="text-lg font-medium tracking-[-0.01em] text-[var(--text)] leading-snug mt-0.5">
                {exp.role}
              </h3>
              <p className="text-[var(--accent)] text-sm mt-1">{exp.org}</p>
              {exp.pi && <p className="text-xs text-[var(--muted)] mt-1">PI: {exp.pi}</p>}
              {exp.collaborators && (
                <p className="text-xs text-[var(--muted)] mt-0.5">{exp.collaborators}</p>
              )}
            </div>
            <div className="text-left xl:text-right shrink-0 flex flex-wrap xl:block items-center gap-x-3">
              <p className="label-mono text-[var(--text-secondary)]">{exp.period}</p>
              <p className="label-mono text-[var(--muted)] xl:mt-1">{exp.duration}</p>
              <p className="flex items-center xl:justify-end gap-1 text-xs text-[var(--muted)] xl:mt-1">
                <MapPin size={11} aria-hidden />
                {exp.location}
              </p>
            </div>
          </div>

          <ul className="flex flex-col gap-2">
            {exp.bullets.map((bullet, i) => (
              <li key={i} className="text-sm text-[var(--muted)] leading-relaxed pl-4 relative">
                <span
                  className="absolute left-0 top-2 w-1.5 h-1.5 rounded-full bg-[var(--accent)]/60"
                  aria-hidden
                />
                {bullet}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}
