import type { MetadataRoute } from "next";

// TODO: Replace with the real deployed domain.
const SITE_URL = "https://saiteja-uppala.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}