import {
  FlaskConical,
  Code2,
  Trophy,
  Sparkles,
  GitBranch,
  ExternalLink as ExtIcon,
  ArrowUpRight,
  type LucideIcon,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Section } from "@/components/ui/Section";
import Timeline, { type TimelineEntry } from "@/components/ui/timeline-02";
import {
  researchProjects,
  personalProjects,
  miniProjects,
  hackathonProjects,
  type ProjectTool,
} from "@/data/resume";
import { resolveSkillIcon } from "@/lib/skills";
import { yearIn } from "@/lib/timeline";

type ProjectLink = { href: string; label: string; kind: "link" | "github" };

type ProjectView = {
  id: string;
  year: number;
  category: string;
  icon: LucideIcon;
  title: string;
  context?: string;
  award?: string;
  impact?: string;
  bullets?: readonly string[];
  description?: string;
  tagline?: string | null;
  tools?: readonly ProjectTool[];
  links: ProjectLink[];
};

function requireYear(id: string, ...sources: (string | number | undefined | null)[]): number {
  for (const s of sources) {
    if (typeof s === "number") return s;
    if (typeof s === "string") {
      const y = yearIn(s);
      if (y) return y;
    }
  }
  throw new Error(`Project "${id}" has no year; add a year to its data.`);
}

function buildProjects(): ProjectView[] {
  return [
    ...researchProjects.map((p) => ({
      id: p.id,
      year: requireYear(p.id, p.context),
      category: "Research",
      icon: FlaskConical,
      title: p.title,
      context: p.context,
      impact: p.impact,
      bullets: p.bullets,
      links: p.link ? [{ href: p.link, label: "View Project", kind: "link" as const }] : [],
    })),
    ...personalProjects.map((p) => ({
      id: p.id,
      year: requireYear(p.id, p.context),
      category: "Personal",
      icon: Code2,
      title: p.title,
      context: p.context,
      impact: p.impact,
      bullets: p.bullets,
      links: p.link
        ? [{ href: p.link, label: p.linkLabel ?? "View Project", kind: "link" as const }]
        : [],
    })),
    ...hackathonProjects.map((p) => ({
      id: p.id,
      year: requireYear(p.id, p.event),
      category: "Hackathon",
      icon: Trophy,
      title: p.title,
      context: p.event,
      award: p.award.replace(/^🏆\s*/, ""),
      description: p.description,
      tagline: p.tagline,
      tools: p.tools,
      links: p.link
        ? [
            {
              href: p.link,
              label: p.linkLabel ?? "View Project",
              kind: p.linkLabel === "GitHub" ? ("github" as const) : ("link" as const),
            },
          ]
        : [],
    })),
    ...miniProjects.map((p) => ({
      id: p.id,
      year: requireYear(p.id, "year" in p ? p.year : undefined, p.context),
      category: "Mini",
      icon: Sparkles,
      title: p.title,
      context: p.context,
      description: p.description,
      links: p.link ? [{ href: p.link, label: p.linkLabel, kind: "link" as const }] : [],
    })),
  ];
}

export function Projects() {
  const entries: TimelineEntry[] = buildProjects().map((p, i) => ({
    id: p.id,
    startYear: p.year,
    endYear: p.year,
    order: p.year * 100 + i, // keeps Research → Personal → Hackathon → Mini within a year
    full: <ProjectEntry project={p} />,
  }));

  return (
    <Section id="projects" className="pb-8 md:pb-10">
      <SectionHeading
        label="Work"
        title="Projects"
        description="Research, personal, hackathon and mini projects, grouped by year."
      />
      <Timeline
        entries={entries}
        noun={{ one: "project", many: "projects" }}
        label="Projects timeline"
      />
    </Section>
  );
}

// ─── Entry card ─────────────────────────────────────────────────────────────

function ProjectEntry({ project: p }: { project: ProjectView }) {
  const Icon = p.icon;
  return (
    <article className="bg-[var(--surface-2)] border border-[var(--border)] rounded-xl p-6 hover:border-[var(--accent)] transition-colors">
      <div className="flex items-center justify-between gap-3 mb-4">
        <span className="inline-flex items-center gap-2">
          <span className="w-8 h-8 rounded-lg bg-[var(--surface)] border border-[var(--border)] flex items-center justify-center">
            <Icon size={15} className="text-[var(--accent)]" aria-hidden />
          </span>
          <span className="label-mono text-[var(--muted)]">{p.category}</span>
        </span>
        {p.award && (
          <span className="inline-flex items-center gap-1.5 label-mono text-[var(--warning-light)]">
            <Trophy size={12} className="fill-[var(--warning-light)]" aria-hidden />
            {p.award}
          </span>
        )}
      </div>

      <h3 className="text-lg font-medium tracking-[-0.01em] text-[var(--text)] leading-snug">
        {p.title}
      </h3>
      {p.context && <p className="label-mono text-[var(--muted)] mt-1.5">{p.context}</p>}

      {p.impact && (
        <p className="text-sm text-[var(--accent-light)] mt-4 leading-relaxed">{p.impact}</p>
      )}

      {p.bullets && p.bullets.length > 0 && (
        <ul className="flex flex-col gap-2 mt-3">
          {p.bullets.map((b, i) => (
            <li key={i} className="text-sm text-[var(--muted)] leading-relaxed pl-4 relative">
              <span
                className="absolute left-0 top-2 w-1.5 h-1.5 rounded-full bg-[var(--accent)]/60"
                aria-hidden
              />
              {b}
            </li>
          ))}
        </ul>
      )}

      {p.description && (
        <p className="text-sm text-[var(--muted)] mt-3 leading-relaxed">{p.description}</p>
      )}

      {p.tagline && (
        <p className="text-sm italic text-[var(--text-secondary)] mt-3 border-l-2 border-[var(--accent)] pl-3">
          &ldquo;{p.tagline}&rdquo;
        </p>
      )}

      {p.tools && p.tools.length > 0 && <ProjectTools tools={p.tools} />}

      {p.links.length > 0 && (
        <div className="pt-4 flex flex-wrap gap-4">
          {p.links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--accent)] hover:text-[var(--accent-light)] transition-colors"
            >
              {l.kind === "github" ? <GitBranch size={13} /> : <ExtIcon size={13} />}
              {l.label}
              <ArrowUpRight size={13} className="opacity-70" />
            </a>
          ))}
        </div>
      )}
    </article>
  );
}

function ProjectToolIcon({ tool }: { tool: ProjectTool }) {
  if (tool.image) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={tool.image} alt="" className="w-full h-full object-contain" />;
  }
  const icon = tool.icon ? resolveSkillIcon(tool.icon) : null;
  if (icon) {
    return (
      <svg
        role="img"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
        fill="currentColor"
        style={{ color: `#${icon.hex}` }}
      >
        <title>{icon.title}</title>
        <path d={icon.path} />
      </svg>
    );
  }
  return (
    <span className="text-xs font-medium text-[var(--accent)]">
      {tool.name.slice(0, 2).toUpperCase()}
    </span>
  );
}

function ProjectTools({ tools }: { tools: readonly ProjectTool[] }) {
  return (
    <div className="mt-4">
      <p className="label-mono text-[var(--muted)] mb-3">Tools</p>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {tools.map((tool) => (
          <a
            key={tool.name}
            href={tool.website}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Visit ${tool.name}`}
            style={{ textDecoration: "none" }}
            className="group/tool flex flex-col items-center gap-2 p-3 rounded-lg bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--accent)] transition-colors"
          >
            <div className="w-8 h-8 flex items-center justify-center">
              <ProjectToolIcon tool={tool} />
            </div>
            <span className="text-xs text-[var(--text-secondary)] text-center group-hover/tool:text-[var(--accent)] transition-colors">
              {tool.name}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}
