import { buildSkillCategories } from "@/lib/skills";
import { SkillsAccordion } from "@/components/sections/SkillsAccordion";

export function HeroSidebar() {
  const categories = buildSkillCategories();

  return (
    <div>
      <div className="bg-[var(--surface-2)] border border-[var(--border)] rounded-2xl p-7">
        <p className="text-xs font-semibold tracking-[0.15em] uppercase text-[var(--muted)] mb-5">
          Skills & Technologies
        </p>
        <SkillsAccordion categories={categories} compact />
      </div>
    </div>
  );
}
