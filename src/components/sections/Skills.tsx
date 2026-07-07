import { SectionHeading } from '@/components/ui/SectionHeading'
import { Section } from '@/components/ui/Section'
import { buildSkillCategories } from '@/lib/skills'
import { SkillsAccordion } from './SkillsAccordion'

export function Skills() {
  const categories = buildSkillCategories()

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
