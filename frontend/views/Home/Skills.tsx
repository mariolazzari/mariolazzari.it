"use client";

import { Marquee } from "@/components/ui/marquee";
import { Button } from "@/components/ui/button";
import { Skill } from "./Skill";
import Link from "next/link";

export function Skills() {
  const frontend = [
    {
      title: "React",
      description:
        "Development of fast, modular and maintainable component-based user interfaces.",
      url: "https://react.dev",
      img: "react",
    },
    {
      title: "Next.js",
      description:
        "Building modern full-stack web applications with optimized rendering and advanced SEO capabilities.",
      url: "https://nextjs.org",
      img: "nextjs",
    },
    {
      title: "TypeScript",
      description:
        "Creating robust and scalable applications through static typing and enhanced developer productivity.",
      url: "https://www.typescriptlang.org",
      img: "ts",
    },
    {
      title: "Tailwind CSS",
      description:
        "Designing responsive and modern interfaces using a utility-first CSS framework.",
      url: "https://tailwindcss.com",
      img: "tailwind",
    },
    {
      title: "shadcn/ui",
      description:
        "Building professional design systems with accessible and reusable UI components.",
      url: "https://ui.shadcn.com",
      img: "shadcn",
    },
    {
      title: "Redux Toolkit",
      description:
        "Managing complex application state efficiently in enterprise-grade React applications.",
      url: "https://redux-toolkit.js.org",
      img: "redux",
    },
    {
      title: "HTMX",
      description:
        "Creating lightweight and highly interactive web applications with an HTML-first approach.",
      url: "https://htmx.org",
      img: "htmx",
    },
    {
      title: "Zod",
      description:
        "Ensuring type-safe data validation across frontend and backend environments.",
      url: "https://zod.dev",
      img: "zod",
    },
  ];

  const backend = [
    {
      title: "Go",
      description:
        "Developing high-performance APIs, microservices and backend systems with a focus on simplicity and concurrency.",
      url: "https://go.dev",
      img: "go",
    },
    {
      title: "Node.js",
      description:
        "Building scalable server-side applications and REST APIs using JavaScript and TypeScript.",
      url: "https://nodejs.org",
      img: "nodejs",
    },
    {
      title: "PostgreSQL",
      description:
        "Designing reliable relational databases with advanced querying, indexing and transactional capabilities.",
      url: "https://www.postgresql.org",
      img: "postgres",
    },
    {
      title: "Redis",
      description:
        "Implementing high-speed caching, messaging and session management solutions.",
      url: "https://redis.io",
      img: "redis",
    },
    {
      title: "Rust",
      description:
        "Building memory-safe, high-performance backend systems and services with strong concurrency guarantees.",
      url: "https://www.rust-lang.org",
      img: "rust",
    },
    {
      title: "Docker",
      description:
        "Containerizing applications to ensure consistent deployments across development and production environments.",
      url: "https://www.docker.com",
      img: "docker",
    },
    {
      title: "MongoDB",
      description:
        "Developing flexible document-based data models for scalable and high-performance applications.",
      url: "https://www.mongodb.com",
      img: "mongo",
    },
    {
      title: "Linux",
      description:
        "Managing servers, automation workflows and production environments using Linux systems.",
      url: "https://www.kernel.org",
      img: "linux",
    },
  ];

  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden max-w-6xl mx-auto">
      <h2 className="text-4xl text-primary font-semibold text-center mb-8">
        Le mie competenze
      </h2>

      <Marquee className="[--duration:20s] mx-auto" pauseOnHover>
        {frontend.map(skill => (
          <Skill
            key={skill.title}
            title={skill.title}
            description={skill.description}
            img={skill.img}
            href={skill.url}
          />
        ))}
      </Marquee>

      <Marquee className="[--duration:20s] mx-auto" pauseOnHover reverse>
        {backend.map(skill => (
          <Skill
            key={skill.title}
            title={skill.title}
            description={skill.description}
            img={skill.img}
            href={skill.url}
          />
        ))}
      </Marquee>

      <div className="from-background pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-linear-to-r"></div>
      <div className="from-background pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-linear-to-l"></div>

      <Button className="mb-16 mt-8">
        <Link href="/skills">Mostra tutte</Link>
      </Button>
    </div>
  );
}
