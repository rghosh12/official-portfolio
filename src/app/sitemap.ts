import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://rupakghosh.dev";
  const currentDate = new Date();

  const routes = [
    { path: "", priority: 1.0, changeFrequency: "monthly" as const },
    { path: "/education", priority: 0.8, changeFrequency: "yearly" as const },
    { path: "/experience", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/projects", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/fun", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/contact", priority: 0.8, changeFrequency: "yearly" as const },
  ];

  return routes.map(({ path, priority, changeFrequency }) => ({
    url: `${baseUrl}${path}`,
    lastModified: currentDate,
    changeFrequency,
    priority,
  }));
}
