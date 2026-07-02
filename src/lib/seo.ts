import { Metadata } from "next";

interface SEOConfig {
  title: string;
  description: string;
  url?: string;
  image?: string;
  type?: "website" | "profile" | "article";
  keywords?: string[];
}

const SITE_URL = "https://rupakghosh.dev";
const SITE_NAME = "Rupak Ghosh";
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`;

export function generateMetadata({
  title,
  description,
  url = SITE_URL,
  image = DEFAULT_OG_IMAGE,
  type = "website",
  keywords = [],
}: SEOConfig): Metadata {
  const fullTitle = title === SITE_NAME ? title : `${title} | ${SITE_NAME}`;

  return {
    title: fullTitle,
    description,
    keywords: [
      "Rupak Ghosh",
      "Cell Biology",
      "Molecular Biology",
      "Bioinformatics",
      "Data Science",
      "Research",
      "Portfolio",
      "UT Austin",
      "Developer",
      "Software Engineer",
      ...keywords,
    ],
    authors: [{ name: SITE_NAME }],
    creator: SITE_NAME,
    publisher: SITE_NAME,
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: url,
    },
    openGraph: {
      type,
      locale: "en_US",
      url,
      title: fullTitle,
      description,
      siteName: SITE_NAME,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image],
      creator: "@rupakghosh",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    verification: {
      google: "your-google-verification-code",
    },
  };
}

export function generatePersonSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Rupak Ghosh",
    url: SITE_URL,
    image: `${SITE_URL}/images/profile.png`,
    sameAs: [
      "https://www.linkedin.com/in/rupak-ghosh-339847239/",
      "https://github.com/rghosh12",
    ],
    jobTitle: "Biological Sciences Student & Researcher",
    worksFor: {
      "@type": "Organization",
      name: "The University of Texas at Austin",
    },
    alumniOf: [
      {
        "@type": "Organization",
        name: "The University of Texas at Austin",
      },
    ],
    knowsAbout: [
      "Cell Biology",
      "Molecular Biology",
      "Bioinformatics",
      "Data Science",
      "Python",
      "Research",
      "Software Development",
    ],
    email: "rupak.ghosh@utexas.edu",
    telephone: "+1-512-731-0636",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Austin",
      addressRegion: "TX",
      addressCountry: "US",
    },
  };
}

export function generateWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    description:
      "Cell & Molecular Biology researcher and developer. Research experience across UT Austin, IISc, Seattle University, and Equilibrium Earth.",
    author: {
      "@type": "Person",
      name: SITE_NAME,
    },
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/?s={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
