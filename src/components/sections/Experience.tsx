import { MapPin } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Section } from "@/components/ui/Section";
import { OrgLogo } from "@/components/ui/OrgLogo";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { experience, type Experience as ExperienceItem } from "@/data/resume";

export function Experience() {
  return (
    <Section id="experience">
      <SectionHeading
        label="Experience"
        title="Professional & Research Experience"
      />

      <div className="flex flex-col gap-6">
        {experience.map((exp, index) => (
          <AnimatedSection key={exp.id} delay={index * 40} animation="fade-up">
            <ExperienceCard exp={exp} />
          </AnimatedSection>
        ))}
      </div>
    </Section>
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
            className="rounded-[4px] transition-opacity hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
          >
            {logo}
          </a>
        ) : (
          logo
        )}

        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
            <div>
              <h3 className="font-semibold text-[var(--text)] text-base leading-snug">
                {exp.role}
              </h3>
              <p className="text-[var(--accent)] text-sm mt-1">{exp.org}</p>
              {exp.pi && (
                <p className="text-xs text-[var(--muted)] mt-1">PI: {exp.pi}</p>
              )}
              {exp.collaborators && (
                <p className="text-xs text-[var(--muted)] mt-0.5">{exp.collaborators}</p>
              )}
            </div>
            <div className="text-left sm:text-right shrink-0">
              <p className="text-xs text-[var(--muted)]">{exp.period}</p>
              <p className="flex items-center sm:justify-end gap-1 text-xs text-[var(--muted)] mt-1">
                <MapPin size={11} aria-hidden />
                {exp.location}
              </p>
            </div>
          </div>

          <ul className="flex flex-col gap-2">
            {exp.bullets.map((bullet, i) => (
              <li
                key={i}
                className="text-sm text-[var(--muted)] leading-relaxed pl-4 relative"
              >
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
