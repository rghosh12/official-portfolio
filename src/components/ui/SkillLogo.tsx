import type { SkillCategory } from "@/lib/skills";

type Skill = SkillCategory["items"][number];

function monogram(name: string) {
  const parts = name.replace(/[^A-Za-z0-9 ]/g, "").split(" ").filter(Boolean);
  return (parts.length >= 2 ? parts[0][0] + parts[1][0] : parts[0]?.slice(0, 2) ?? "").toUpperCase();
}

/** A skill's logo: bundled image, Simple Icons glyph in brand colour, or a monogram. */
export function SkillLogo({ skill, className = "w-full h-full" }: { skill: Skill; className?: string }) {
  if (skill.image) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={skill.image} alt="" className={`${className} object-contain`} loading="lazy" />;
  }
  if (skill.icon) {
    return (
      <svg
        role="img"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        fill="currentColor"
        style={{ color: `#${skill.icon.hex}` }}
        aria-hidden="true"
      >
        <path d={skill.icon.path} />
      </svg>
    );
  }
  return (
    <span
      className={`${className} rounded-md text-[var(--accent)] text-[0.6rem] font-medium flex items-center justify-center`}
      style={{ backgroundColor: "color-mix(in srgb, var(--accent) 15%, transparent)" }}
    >
      {monogram(skill.name)}
    </span>
  );
}
