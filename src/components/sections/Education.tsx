import { BadgeCheck, Calendar, Heart, MapPin } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Section } from "@/components/ui/Section";
import { OrgLogo } from "@/components/ui/OrgLogo";
import { certifications, education, volunteering } from "@/data/resume";
import { EducationDropdowns } from "@/components/sections/EducationDropdowns";

export function Education() {
  return (
    <Section id="education">
      <SectionHeading label="Background" title="Education" />

      <div className="flex flex-col gap-5">
        {education.map((edu, i) => {
          const website = "website" in edu ? edu.website : undefined;
          const logo = <OrgLogo org={edu.institution} size={36} className="mt-0.5" />;

          return (
          <div
            key={i}
            className="group relative bg-[var(--surface-2)] border border-[var(--border)] rounded-xl p-6 hover:border-[var(--accent)] transition-colors"
          >
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div className="flex items-start gap-4">
                {website ? (
                  <a
                    href={website}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visit ${edu.institution}`}
                    className="rounded-[4px] transition-opacity hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
                  >
                    {logo}
                  </a>
                ) : (
                  logo
                )}
                <div>
                  <h3 className="font-semibold text-[var(--text)] text-base">{edu.institution}</h3>
                  <p className="text-[var(--text)] text-sm mt-0.5 font-medium">{edu.degree}</p>

                  {"minors" in edu && edu.minors.length > 0 && (
                    <p className="text-xs text-[var(--muted)] mt-1">
                      Minor: {edu.minors.join(", ")}
                    </p>
                  )}
                  {"honors" in edu && edu.honors.length > 0 && (
                    <p className="text-xs text-[var(--muted)] mt-0.5">{edu.honors.join(" · ")}</p>
                  )}
                  {"core" in edu && (
                    <p className="text-xs text-[var(--muted)] mt-0.5">Core: {edu.core}</p>
                  )}
                </div>
              </div>

              <div className="text-right shrink-0">
                <div className="flex items-center gap-1.5 text-xs text-[var(--muted)] justify-end mb-1">
                  <Calendar size={12} />
                  {edu.graduation}
                  {edu.current && (
                    <span className="ml-1 bg-[var(--success)]/15 text-[var(--success-light)] px-1.5 py-0.5 rounded text-[10px] font-semibold">
                      Current
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-1.5 text-xs text-[var(--muted)] justify-end mb-1">
                  <MapPin size={12} />
                  {edu.location}
                </div>
                <p className="text-xs font-semibold text-[var(--text)]">GPA: {edu.gpa}</p>
              </div>
            </div>

            <EducationDropdowns
              courses={edu.courses}
              extracurriculars={edu.extracurriculars}
            />
          </div>
          );
        })}

        <div className="group relative bg-[var(--surface-2)] border border-[var(--border)] rounded-xl p-6 hover:border-[var(--accent)] transition-colors">
          <div className="flex items-start gap-4">
            <div className="mt-0.5 w-9 h-9 rounded-lg bg-[var(--surface)] border border-[var(--border)] flex items-center justify-center shrink-0">
              <BadgeCheck size={17} className="text-[var(--accent)]" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-[var(--text)] text-base">
                Certifications & Licenses
              </h3>
              <div className="mt-4 flex flex-col gap-3">
                {certifications.map((c, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 bg-[var(--surface)] border border-[var(--border)] rounded-lg p-4"
                  >
                    <BadgeCheck size={16} className="text-[var(--accent)] mt-0.5 shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-[var(--text)]">{c.name}</p>
                      {c.issuer && (
                        <p className="text-xs text-[var(--muted)] mt-0.5">{c.issuer}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="group relative bg-[var(--surface-2)] border border-[var(--border)] rounded-xl p-6 hover:border-[var(--accent)] transition-colors">
          <div className="flex items-start gap-4">
            <div className="mt-0.5 w-9 h-9 rounded-lg bg-[var(--surface)] border border-[var(--border)] flex items-center justify-center shrink-0">
              <Heart size={17} className="text-rose-500" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-[var(--text)] text-base">Volunteering</h3>
              <div className="mt-4 flex flex-col gap-3">
                {volunteering.map((v, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 bg-[var(--surface)] border border-[var(--border)] rounded-lg p-4"
                  >
                    <Heart size={16} className="text-rose-500 mt-0.5 shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-[var(--text)]">{v.role}</p>
                      <p className="text-xs text-[var(--muted)] mt-0.5">{v.org}</p>
                      {v.dept && <p className="text-xs text-[var(--muted)]">{v.dept}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
