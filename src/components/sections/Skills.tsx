import { SectionHeading } from '@/components/ui/SectionHeading'
import { Section } from '@/components/ui/Section'
import { skills } from '@/data/skills'
import {
  SkillsAccordion,
  type SkillCategory,
  type ResolvedIcon,
} from './SkillsAccordion'
import * as SimpleIcons from 'simple-icons/icons'

// NOTE: this is a server component. The large `simple-icons` import is resolved
// here at build time and only the tiny per-icon {title,hex,path} data is passed
// to the client accordion — so the client bundle stays small.

const categoryLabels: Record<keyof typeof skills, string> = {
  languages: 'Languages',
  frontend: 'Frontend',
  aiDevelopment: 'AI Development',
  backend: 'Backend',
  database: 'Database',
  awsServices: 'AWS Services',
}

function resolveIcon(slug: string): ResolvedIcon {
  if (!slug) return null
  const key = `si${slug.charAt(0).toUpperCase() + slug.slice(1)}` as keyof typeof SimpleIcons
  const data = SimpleIcons[key] as { title: string; hex: string; path: string } | undefined
  if (!data) return null
  return { title: data.title, hex: data.hex, path: data.path }
}

export function Skills() {
  const categories: SkillCategory[] = (
    Object.keys(categoryLabels) as (keyof typeof skills)[]
  ).map((key) => ({
    key,
    label: categoryLabels[key],
    items: skills[key].map((s) => ({ name: s.name, icon: resolveIcon(s.icon) })),
  }))

  return (
    <Section id="skills">
      <SectionHeading
        label="Expertise"
        title="Skills & Technologies"
        description="Technical proficiencies across research, development, and data science."
      />
      <SkillsAccordion categories={categories} />
    </Section>
  )
}
