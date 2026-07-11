import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Mario Lazzari | Senior Full Stack Developer",
    short_name: "Mario Lazzari",
    description:
      "Portfolio of Mario Lazzari, Senior Full Stack Developer specialized in Go, TypeScript, Next.js, React and backend architectures.",
    start_url: "/it",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#000000",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
