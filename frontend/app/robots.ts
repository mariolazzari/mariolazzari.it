import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://www.mariolazzari.it/sitemap.xml",
    host: "https://www.mariolazzari.it",
  };
}
