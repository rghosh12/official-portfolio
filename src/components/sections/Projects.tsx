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
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import {
  researchProjects,
  personalProjects,
  miniProjects,
  hackathonProjects,
  type ProjectTool,
} from "@/data/resume";
import { resolveSkillIcon } from "@/lib/skills";

export function Projects() {
  return (
    <Section id="projects">
      <SectionHeading label="Work" title="Projects" />

      {/* Research */}
      <ProjectGroup title="Research Projects">
        {researchProjects.map((p, index) => (
          <AnimatedSection key={p.id} delay={index * 50} animation="fade-up">
            <ProjectCard icon={FlaskConical} category="Research">
              <ProjectBody
                title={p.title}
                context={p.context}
                impact={p.impact}
                bullet={p.bullets[0]}
                links={p.link ? [{ href: p.link, label: "View Project", kind: "link" }] : []}
              />
            </ProjectCard>
          </AnimatedSection>
        ))}
      </ProjectGroup>

      {/* Personal */}
      <ProjectGroup title="Personal Projects">
        {personalProjects.map((p, index) => (
          <AnimatedSection key={p.id} delay={index * 50} animation="fade-up">
            <ProjectCard icon={Code2} category="Personal">
              <ProjectBody
                title={p.title}
                context={p.context}
                impact={p.impact}
                bullet={p.bullets[0]}
                links={
                  p.link
                    ? [{ href: p.link, label: p.linkLabel ?? "View Project", kind: "link" }]
                    : []
                }
              />
            </ProjectCard>
          </AnimatedSection>
        ))}
      </ProjectGroup>

      {/* Hackathon */}
      <ProjectGroup title="Hackathon Projects">
        {hackathonProjects.map((p, index) => (
          <AnimatedSection key={p.id} delay={index * 50} animation="scale-in">
            <ProjectCard icon={Trophy} category="Hackathon" award={p.award}>
              <ProjectBody
                title={p.title}
                context={p.event}
                description={p.description}
                tagline={p.tagline}
                tools={"tools" in p ? p.tools : undefined}
                links={
                  p.link
                    ? [
                        {
                          href: p.link,
                          label: p.linkLabel ?? "View Project",
                          kind: p.linkLabel === "GitHub" ? "github" : "link",
                        },
                      ]
                    : []
                }
              />
            </ProjectCard>
          </AnimatedSection>
        ))}
      </ProjectGroup>

      {/* Mini */}
      <ProjectGroup title="Mini Projects">
        {miniProjects.map((p, index) => (
          <AnimatedSection key={p.id} delay={index * 50} animation="fade-up">
            <ProjectCard icon={Sparkles} category="Mini">
              <ProjectBody
                title={p.title}
                context={p.context}
                description={p.description}
                links={p.link ? [{ href: p.link, label: p.linkLabel, kind: "link" }] : []}
              />
            </ProjectCard>
          </AnimatedSection>
        ))}
      </ProjectGroup>
    </Section>
  );
}

// ─── Sub-components ─────────────────────────────────────────────────────────

function ProjectGroup({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-16 last:mb-0">
      <h3 className="label-mono text-[var(--muted)] mb-6">
        {title}
      </h3>
      <div className="grid md:grid-cols-2 gap-6">{children}</div>
    </div>
  );
}

function ProjectCard({
  icon: Icon,
  category,
  award,
  children,
}: {
  icon: LucideIcon;
  category: string;
  award?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="group h-full flex flex-col bg-[var(--surface-2)] border border-[var(--border)] rounded-xl overflow-hidden hover:border-[var(--accent)] transition-colors">
      <div
        className="relative h-20 flex items-center justify-between px-5"
        style={{
          background:
            "linear-gradient(135deg, rgba(134,239,172,0.14) 0%, rgba(23,37,84,0.25) 100%)",
        }}
      >
        <span className="w-10 h-10 rounded-lg bg-[var(--surface)] border border-[var(--border)] flex items-center justify-center">
          <Icon size={18} className="text-[var(--accent)]" />
        </span>
        {award ? (
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--warning-light)]">
            <Trophy size={13} className="fill-[var(--warning-light)]" />
            {award.replace(/^🏆\s*/, "")}
          </span>
        ) : (
          <span className="label-mono text-[var(--muted)]">
            {category}
          </span>
        )}
      </div>

      <div className="flex flex-col flex-1 p-5">{children}</div>
    </div>
  );
}

type ProjectLink = { href: string; label: string; kind: "link" | "github" };

function ProjectToolIcon({ tool }: { tool: ProjectTool }) {
  if (tool.image) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={tool.image} alt="" className="w-full h-full object-contain" />
    );
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
    <span className="text-xs font-bold text-[var(--accent)]">
      {tool.name.slice(0, 2).toUpperCase()}
    </span>
  );
}

function ProjectTools({ tools }: { tools: readonly ProjectTool[] }) {
  return (
    <div className="mt-4">
      <p className="label-mono text-[var(--muted)] mb-3">
        Tools
      </p>
      <div className="grid grid-cols-2 gap-2">
        {tools.map((tool) => (
          <a
            key={tool.name}
            href={tool.website}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Visit ${tool.name}`}
            className="group/tool flex flex-col items-center gap-2 p-3 rounded-lg bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--accent)] transition-colors"
          >
            <div className="w-9 h-9 flex items-center justify-center">
              <ProjectToolIcon tool={tool} />
            </div>
            <span className="text-xs font-medium text-[var(--text-secondary)] text-center group-hover/tool:text-[var(--accent)] transition-colors">
              {tool.name}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}

function ProjectBody({
  title,
  context,
  impact,
  bullet,
  description,
  tagline,
  tools,
  links = [],
}: {
  title: string;
  context?: string;
  impact?: string;
  bullet?: string;
  description?: string;
  tagline?: string | null;
  tools?: readonly ProjectTool[];
  links?: ProjectLink[];
}) {
  return (
    <>
      <h4 className="font-semibold text-[var(--text)] text-base leading-snug">{title}</h4>
      {context && <p className="text-xs text-[var(--muted)] mt-1">{context}</p>}

      {impact && (
        <p className="text-sm text-[var(--accent-light)] mt-3 leading-relaxed">{impact}</p>
      )}

      {bullet && (
        <p className="text-sm text-[var(--muted)] mt-2 leading-relaxed">{bullet}</p>
      )}

      {description && (
        <p className="text-sm text-[var(--muted)] mt-3 leading-relaxed line-clamp-4">
          {description}
        </p>
      )}

      {tagline && (
        <p className="text-sm italic text-[var(--text-secondary)] mt-3 border-l-2 border-[var(--accent)] pl-3">
          &ldquo;{tagline}&rdquo;
        </p>
      )}

      {tools && tools.length > 0 && <ProjectTools tools={tools} />}

      {links.length > 0 && (
        <div className="mt-auto pt-4 flex flex-wrap gap-4">
          {links.map((l) => (
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
    </>
  );
}
