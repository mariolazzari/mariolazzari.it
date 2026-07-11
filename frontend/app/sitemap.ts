import { startOfMonth } from "date-fns";
import type { MetadataRoute } from "next";

const url = "https://www.mariolazzari.it";

const locales = ["it", "en"] as const;

const routes = [
  {
    path: "",
    priority: 1,
    changeFrequency: "yearly",
  },
  {
    path: "/skills",
    priority: 0.8,
    changeFrequency: "monthly",
  },
  {
    path: "/certifications",
    priority: 0.7,
    changeFrequency: "weekly",
  },
  {
    path: "/hobbies",
    priority: 0.5,
    changeFrequency: "yearly",
  },
  {
    path: "/museum-hub",
    priority: 0.9,
    changeFrequency: "daily",
  },
] satisfies {
  path: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
}[];

const lastModified = startOfMonth(new Date());

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.flatMap(route =>
    locales.map(locale => {
      const localizedUrl = `${url}/${locale}${route.path}`;

      return {
        url: localizedUrl,
        lastModified,
        changeFrequency: route.changeFrequency,
        priority: route.priority,
        alternates: {
          languages: {
            "x-default": `${url}/it${route.path}`,
            it: `${url}/it${route.path}`,
            en: `${url}/en${route.path}`,
          },
        },
      };
    }),
  );
}
