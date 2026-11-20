import { buildSkillCategories } from "@/lib/skills";
import { SkillsOrbit } from "@/components/sections/SkillsOrbit";

export function HeroSidebar() {
  // Resolved on the server so simple-icons never ships to the client.
  const categories = buildSkillCategories();

  return (
    <div className="w-full max-w-[480px] mx-auto lg:mx-0 lg:ml-auto">
      <p className="label-mono text-[var(--muted)] text-center">
        Skills & Technologies <span className="text-[var(--muted-dark)]">· select a node</span>
      </p>
      <SkillsOrbit categories={categories} />
    </div>
  );
}
