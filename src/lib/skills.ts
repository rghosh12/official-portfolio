import { skills } from "@/data/skills";
import type { SkillCategory, ResolvedIcon } from "@/components/sections/SkillsAccordion";
import * as SimpleIcons from "simple-icons/icons";

export const categoryLabels: Record<keyof typeof skills, string> = {
  languages: "Languages",
  frontend: "Frontend",
  aiDevelopment: "AI Development",
  backend: "Backend",
  database: "Database",
  awsServices: "AWS Services",
};

export function resolveSkillIcon(slug: string): ResolvedIcon {
  if (!slug) return null;
  const key = `si${slug.charAt(0).toUpperCase() + slug.slice(1)}` as keyof typeof SimpleIcons;
  const data = SimpleIcons[key] as { title: string; hex: string; path: string } | undefined;
  if (!data) return null;
  return { title: data.title, hex: data.hex, path: data.path };
}

export function buildSkillCategories(): SkillCategory[] {
  return (Object.keys(categoryLabels) as (keyof typeof skills)[]).map((key) => ({
    key,
    label: categoryLabels[key],
    items: skills[key].map((s) => ({
      name: s.name,
      icon: resolveSkillIcon(s.icon),
      ...("image" in s && s.image ? { image: s.image } : {}),
    })),
  }));
}
