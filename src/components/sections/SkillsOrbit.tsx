"use client";

import { Cloud, CodeXml, Database, LayoutTemplate, Server, Sparkles } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import RadialOrbitalTimeline, { type TimelineItem } from "@/components/ui/radial-orbital-timeline";
import type { SkillCategory } from "@/lib/skills";

const categoryIcons: Record<string, LucideIcon> = {
  languages: CodeXml,
  frontend: LayoutTemplate,
  aiDevelopment: Sparkles,
  backend: Server,
  database: Database,
  awsServices: Cloud,
};

// How the categories relate to each other (drives the "Connected" chips).
const relations: Record<string, string[]> = {
  languages: ["frontend", "backend", "aiDevelopment"],
  frontend: ["languages", "backend"],
  aiDevelopment: ["languages", "awsServices"],
  backend: ["languages", "database", "awsServices"],
  database: ["backend", "awsServices"],
  awsServices: ["backend", "database", "aiDevelopment"],
};

function monogram(name: string) {
  const parts = name.replace(/[^A-Za-z0-9 ]/g, "").split(" ").filter(Boolean);
  return (parts.length >= 2 ? parts[0][0] + parts[1][0] : parts[0]?.slice(0, 2) ?? "").toUpperCase();
}

function SkillIcon({ skill }: { skill: SkillCategory["items"][number] }) {
  if (skill.image) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={skill.image} alt="" className="w-full h-full object-contain" />;
  }
  if (skill.icon) {
    return (
      <svg
        role="img"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
        fill="currentColor"
        style={{ color: `#${skill.icon.hex}` }}
      >
        <title>{skill.icon.title}</title>
        <path d={skill.icon.path} />
      </svg>
    );
  }
  return (
    <span className="w-full h-full rounded-md bg-[var(--accent)]/15 text-[var(--accent)] text-xs font-medium flex items-center justify-center">
      {monogram(skill.name)}
    </span>
  );
}

export function SkillsOrbit({ categories }: { categories: SkillCategory[] }) {
  const idFor = (key: string) => categories.findIndex((c) => c.key === key) + 1;

  const timelineData: TimelineItem[] = categories.map((category, i) => ({
    id: i + 1,
    title: category.label,
    meta: `${category.items.length} ${category.items.length === 1 ? "tool" : "tools"}`,
    category: "Skills",
    icon: categoryIcons[category.key] ?? CodeXml,
    relatedIds: (relations[category.key] ?? []).map(idFor).filter((id) => id > 0),
    links: category.items.map((skill) => ({
      name: skill.name,
      href: skill.website,
      icon: <SkillIcon skill={skill} />,
    })),
  }));

  return (
    <RadialOrbitalTimeline
      timelineData={timelineData}
      label="Skills and technologies"
      centerImage={{ src: "/logos/orbit-core.png", alt: "Logo" }}
    />
  );
}
