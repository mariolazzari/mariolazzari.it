"use client";

import { Baby, Eye } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { MdMuseum } from "react-icons/md";
import { Project } from "./Project";

export function Projects() {
  const { theme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const isDark = mounted
    ? (theme === "system" ? systemTheme : theme) === "dark"
    : true;

  const projects = [
    {
      icon: <MdMuseum size={50} />,
      title: "Museum Hub",
      description:
        "Discover artworks from the world's leading museums through a single unified platform.",
      text1:
        "Museum Hub is a web platform that aggregates artwork data from major museums around the world.",
      text2:
        "Through integrations with public museum APIs, users can explore collections, search for artists and artworks, and access cultural heritage from a single interface.",
      href1: "/projects/museum-hub",
      href2: "https://github.com/mariolazzari/rijks",
      images: ["go", "postgres", "redis", "react"],
    },
    {
      icon: <Eye size={50} />,
      title: "Sky Hub",
      description:
        "Explore space missions, celestial objects, and astronomy data from leading space agencies in one place.",
      text1:
        "Sky Hub is a full-stack application that collects and consolidates information from multiple space-related APIs into a single, user-friendly experience. ",
      text2:
        "The platform enables users to discover space missions, astronomical imagery, satellite data, launch schedules, and scientific insights from some of the world's leading space organizations.",
      href1: "/projects/sky-hub",
      href2: "https://github.com/mariolazzari/rijks",
      images: ["go", "postgres", "redis", "react"],
    },
    {
      icon: <Baby size={50} />,
      title: "CR2 Sinapsi",
      description:
        "Accessible and structured hospital intake system for pediatric patients with disabilities.",
      text1:
        "Pediatric Admission Hub is a web-based system designed to support hospital staff in managing the admission process of pediatric patients with disabilities. ",
      text2:
        "The system is designed to reduce friction in high-load environments while ensuring that sensitive patient data is organized and easily accessible to authorized personnel.",
      href1: "/projects/sinapsi",
      href2: "https://github.com/mariolazzari/cr2-sinapsi",
      images: ["go", "postgres", "redis", "react"],
    },
  ];

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="my-16">
      <h2 className="text-4xl text-primary font-semibold text-center mb-16">
        I mie progetti
      </h2>
      <div className="flex justify-center gap-8 flex-wrap my-8">
        {projects.map(prj => (
          <Project
            key={prj.title}
            title={prj.title}
            icon={prj.icon}
            description={prj.description}
            text1={prj.text1}
            text2={prj.text2}
            href1={prj.href1}
            href2={prj.href2}
            images={prj.images}
          />
        ))}
      </div>
    </div>
  );
}
