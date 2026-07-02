import type { Metadata } from "next";
import "./globals.css";
import { ConditionalStarfield } from "@/components/ui/conditional-starfield";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { BackToTop } from "@/components/ui/BackToTop";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { SkipToContent } from "@/components/ui/SkipToContent";
import { generateMetadata, generatePersonSchema, generateWebSiteSchema } from "@/lib/seo";

export const metadata: Metadata = generateMetadata({
  title: "Rupak Ghosh",
  description:
    "Cell & Molecular Biology researcher and developer. Research experience across UT Austin, IISc, Seattle University, and Equilibrium Earth.",
  keywords: ["Biology Research", "UT Austin", "Bioinformatics", "Data Science"],
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const personSchema = generatePersonSchema();
  const websiteSchema = generateWebSiteSchema();

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Comfortaa:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body>
        <SkipToContent />
        <ThemeProvider>
          <ConditionalStarfield />
          <ScrollProgress />
          {children}
          <BackToTop />
        </ThemeProvider>
      </body>
    </html>
  );
}
