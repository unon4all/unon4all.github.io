import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const BASE_URL = "https://unon4all.github.io";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
