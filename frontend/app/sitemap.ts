import type { MetadataRoute } from "next";

function sitemap(): MetadataRoute.Sitemap {
  const url = "https://mariolazzari.it";
  const lastModified = new Date();
  const routes = ["", "/skills", "/certifications", "/projects", "/hobbies"];

  return routes.map(route => ({
    url: `${url}${route}`,
    lastModified,
    alternates: {
      languages: {
        it: `${url}/it${route}`,
        en: `${url}/en${route}`,
      },
    },
  }));
}

export default sitemap;
