import type { MetadataRoute } from "next";
import { mockDares } from "@/lib/mock-data";

const BASE_URL = "https://dareme.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const dareUrls: MetadataRoute.Sitemap = mockDares.map((dare) => ({
    url: `${BASE_URL}/feed/${dare.id}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/feed`,
      lastModified: new Date(),
      changeFrequency: "hourly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/create`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/register`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/login`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    ...dareUrls,
  ];
}
