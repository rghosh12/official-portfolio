/** Maps experience/education org strings to logo assets under /public/logos */
export type OrgLogoKey =
  | "ut-austin"
  | "seattle-university"
  | "navkis"
  | "iisc"
  | "equilibrium-earth";

export type OrgLogoMeta = {
  src: string;
  alt: string;
  monogram: string;
  /** How the image fills the square box */
  fit?: "contain" | "cover";
  /** Inner padding class when using contain */
  padding?: string;
};

export const orgLogoMeta: Record<OrgLogoKey, OrgLogoMeta> = {
  "ut-austin": {
    src: "/logos/ut-austin.png",
    alt: "The University of Texas at Austin",
    monogram: "UT",
    fit: "cover",
    padding: "p-0",
  },
  "seattle-university": {
    src: "/logos/seattle-university.png",
    alt: "Seattle University",
    monogram: "SU",
    fit: "cover",
    padding: "p-0",
  },
  navkis: {
    src: "/logos/navkis.png",
    alt: "Navkis Educational Centre",
    monogram: "NK",
    fit: "contain",
    padding: "p-1",
  },
  iisc: {
    src: "/logos/iisc.png",
    alt: "Indian Institute of Science",
    monogram: "IS",
    fit: "contain",
    padding: "p-1.5",
  },
  "equilibrium-earth": {
    src: "/logos/equilibrium-earth.png",
    alt: "Equilibrium Earth",
    monogram: "EE",
    fit: "contain",
    padding: "p-2",
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
  if (normalized.includes("navkis")) {
    return "navkis";
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
