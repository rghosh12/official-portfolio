/** Maps experience org strings to logo assets under /public/logos */
export type OrgLogoKey =
  | "ut-austin"
  | "seattle-university"
  | "iisc"
  | "equilibrium-earth";

export const orgLogoMeta: Record<
  OrgLogoKey,
  { src: string; alt: string; monogram: string }
> = {
  "ut-austin": {
    src: "/logos/ut-austin.png",
    alt: "The University of Texas at Austin",
    monogram: "UT",
  },
  "seattle-university": {
    src: "/logos/seattle-university.svg",
    alt: "Seattle University",
    monogram: "SU",
  },
  iisc: {
    src: "/logos/iisc.png",
    alt: "Indian Institute of Science",
    monogram: "IS",
  },
  "equilibrium-earth": {
    src: "/logos/equilibrium-earth.svg",
    alt: "Equilibrium Earth",
    monogram: "EE",
  },
};

export function resolveOrgLogoKey(org: string): OrgLogoKey | null {
  const normalized = org.toLowerCase();
  if (
    normalized.includes("university of texas") ||
    normalized.includes("ut austin") ||
    normalized.includes("cockrell")
  ) {
    return "ut-austin";
  }
  if (normalized.includes("seattle university")) {
    return "seattle-university";
  }
  if (
    normalized.includes("indian institute of science") ||
    normalized.includes("iisc")
  ) {
    return "iisc";
  }
  if (normalized.includes("equilibrium earth")) {
    return "equilibrium-earth";
  }
  return null;
}
