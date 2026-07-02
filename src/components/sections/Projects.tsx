import { GitBranch, ExternalLink as ExtIcon, Star } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Tag } from "@/components/ui/Tag";
import { ExternalLink } from "@/components/ui/ExternalLink";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import {
  researchProjects,
  personalProjects,
  miniProjects,
  hackathonProjects,
} from "@/data/resume";

export function Projects() {
  return (
    <section id="projects" className="px-6 sm:px-12 lg:px-24 py-32">
      <div className="max-w-[800px]">
        <AnimatedSection>
          <SectionHeading
            label="Work"
            title="Projects"
            description="Research, personal, and hackathon builds."
          />
        </AnimatedSection>

        {/* Research Projects */}
        <ProjectGroup title="Research Projects">
          {researchProjects.map((p, index) => (
            <AnimatedSection key={p.id} delay={index * 50} animation="fade-up">
              <ProjectCard>
                <ProjectCardHeader title={p.title} context={p.context} />
                <BulletList bullets={p.bullets} />
                <TagRow tags={p.tags} />
                {p.link && <ExternalLink href={p.link}>View Project</ExternalLink>}
              </ProjectCard>
            </AnimatedSection>
          ))}
        </ProjectGroup>

        {/* Personal Projects */}
        <ProjectGroup title="Personal Projects">
          {personalProjects.map((p, index) => (
            <AnimatedSection key={p.id} delay={index * 50} animation="fade-up">
              <ProjectCard>
                <ProjectCardHeader title={p.title} context={p.context} />
                <BulletList bullets={p.bullets} />
                <TagRow tags={p.tags} />
                {p.link && <ExternalLink href={p.link}>{p.linkLabel ?? "View Project"}</ExternalLink>}
              </ProjectCard>
            </AnimatedSection>
          ))}
        </ProjectGroup>

        {/* Hackathon Projects */}
        <ProjectGroup title="Hackathon Projects">
          {hackathonProjects.map((p, index) => (
            <AnimatedSection key={p.id} delay={index * 50} animation="scale-in">
              <ProjectCard highlight>
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="flex items-center gap-2">
                    <Star size={16} className="text-amber-400 fill-amber-400" />
                    <span className="text-sm font-bold text-amber-400">
                      {p.award}
                    </span>
                    <span className="text-xs text-gray-400">— {p.event}</span>
                  </div>
                </div>
                <ProjectCardHeader title={p.title} />
                <p className="text-sm text-gray-400 leading-relaxed mb-3">{p.description}</p>
                {p.tagline && (
                  <p className="text-sm italic text-gray-300 mb-3 border-l-2 border-amber-500 pl-3">
                    &ldquo;{p.tagline}&rdquo;
                  </p>
                )}
                <TagRow tags={p.tags} />
                {p.link && (
                  <ExternalLink href={p.link}>
                    {p.linkLabel === "GitHub" ? (
                      <><GitBranch size={13} /> {p.linkLabel}</>
                    ) : (
                      <><ExtIcon size={13} /> {p.linkLabel}</>
                    )}
                  </ExternalLink>
                )}
              </ProjectCard>
            </AnimatedSection>
          ))}
        </ProjectGroup>

        {/* Mini Projects */}
        <ProjectGroup title="Mini Projects">
          {miniProjects.map((p, index) => (
            <AnimatedSection key={p.id} delay={index * 50} animation="fade-up">
              <ProjectCard>
                <ProjectCardHeader title={p.title} context={p.context} />
                <p className="text-sm text-gray-400 leading-relaxed mb-3">{p.description}</p>
                {p.link && <ExternalLink href={p.link}>{p.linkLabel}</ExternalLink>}
              </ProjectCard>
            </AnimatedSection>
          ))}
        </ProjectGroup>
      </div>
    </section>
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
    <div className="mb-16">
      <h3 className="text-xs font-semibold tracking-wider uppercase text-[var(--muted)] mb-8">
        {title}
      </h3>
      <div className="flex flex-col gap-8">{children}</div>
    </div>
  );
}

function ProjectCard({
  children,
  highlight,
}: {
  children: React.ReactNode;
  highlight?: boolean;
}) {
  return (
    <div className={`py-6 ${highlight ? "border-l-2 border-amber-500 pl-4" : ""}`}>
      {children}
    </div>
  );
}

function ProjectCardHeader({
  title,
  context,
}: {
  title: string;
  context?: string;
}) {
  return (
    <div className="mb-3">
      <h4 className="font-semibold text-white text-base leading-snug">{title}</h4>
      {context && <p className="text-xs text-gray-400 mt-0.5">{context}</p>}
    </div>
  );
}

function BulletList({ bullets }: { bullets: readonly string[] }) {
  return (
    <ul className="flex flex-col gap-2 mb-4">
      {bullets.slice(0, 2).map((b, i) => (
        <li key={i} className="text-sm text-gray-400 leading-relaxed">
          {b}
        </li>
      ))}
    </ul>
  );
}

function TagRow({ tags }: { tags: readonly string[] }) {
  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {tags.slice(0, 4).map((t) => (
        <Tag key={t}>{t}</Tag>
      ))}
    </div>
  );
}
