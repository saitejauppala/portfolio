import type { MetadataRoute } from "next";

// TODO: Replace with the real deployed domain.
const SITE_URL = "https://saiteja-uppala.vercel.app";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}