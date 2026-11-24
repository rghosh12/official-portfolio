import { ArrowUpRight } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SkillLogo } from "@/components/ui/SkillLogo";
import OrbitingCirclesGlobe, { type Orbit } from "@/components/ui/orbiting-circles-02";
import { buildSkillCategories } from "@/lib/skills";

/**
 * Every skill, at the bottom of the home page: a readable, categorised
 * index first, then the orbiting-circles globe as the closing visual
 * (the orbit is decorative; the index above is the accessible list).
 */
export function Skills() {
  const categories = buildSkillCategories();
  const byKey = Object.fromEntries(categories.map((c) => [c.key, c]));

  const iconsFor = (...keys: string[]) =>
    keys.flatMap((k) =>
      (byKey[k]?.items ?? []).map((skill) => ({
        label: skill.name,
        node: <SkillLogo skill={skill} />,
      }))
    );

  // Inner → outer: AI + cloud, then frontend + backend, then languages + data
  const orbits: Orbit[] = [
    { size: "w-[27.5rem] h-[27.5rem] md:w-[45rem] md:h-[45rem]", duration: 38, icons: iconsFor("aiDevelopment", "awsServices") },
    { size: "w-[37.5rem] h-[37.5rem] md:w-[55rem] md:h-[55rem]", duration: 52, icons: iconsFor("frontend", "backend") },
    { size: "w-[45rem] h-[45rem] md:w-[66.25rem] md:h-[66.25rem]", duration: 66, icons: iconsFor("languages", "database") },
  ];

  return (
    <Section id="skills" className="pb-0 md:pb-0 border-t border-[var(--border)]">
      <SectionHeading title="Skills & Technologies" />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <section
            key={category.key}
            aria-labelledby={`skills-${category.key}`}
            className="rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--surface)] p-5"
          >
            <div className="flex items-baseline justify-between gap-3 mb-4">
              <h3 id={`skills-${category.key}`} className="text-base font-medium text-[var(--text)]">
                {category.label}
              </h3>
              <span className="label-mono text-[var(--muted)]">
                {String(category.items.length).padStart(2, "0")}
              </span>
            </div>
            <ul className="flex flex-wrap gap-2">
              {category.items.map((skill) => (
                <li key={skill.name}>
                  <a
                    href={skill.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${skill.name} (official site)`}
                    className="group inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface-2)] py-1.5 pl-1.5 pr-3 text-[0.8125rem] text-[var(--text-secondary)] hover:border-[var(--accent)] hover:text-[var(--text)] transition-colors"
                    style={{ textDecoration: "none" }}
                  >
                    <span className="w-6 h-6 rounded-full bg-[#F4F6EC] p-1 flex items-center justify-center shrink-0">
                      <SkillLogo skill={skill} />
                    </span>
                    {skill.name}
                    <ArrowUpRight
                      size={12}
                      className="opacity-0 -ml-1 group-hover:opacity-70 transition-opacity"
                      aria-hidden="true"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <OrbitingCirclesGlobe
        className="mt-16"
        orbits={orbits}
        center={
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src="/logos/orbit-core.png"
            alt=""
            width={96}
            height={96}
            className="w-16 h-16 md:w-24 md:h-24 rounded-full"
            style={{
              boxShadow:
                "0 0 0 2px var(--border-hover), 0 0 32px color-mix(in srgb, var(--accent) 35%, transparent)",
            }}
          />
        }
      />
    </Section>
  );
}
