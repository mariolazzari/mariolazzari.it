import { Code, Eye, Flag, Orbit, Pencil } from "lucide-react";
import { MdMuseum } from "react-icons/md";
import { Project } from "./Project";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export async function Projects() {
  const t = await getTranslations("Home");

  const projects = [
    {
      icon: <MdMuseum size={50} />,
      title: "Museum Hub",
      href1: "/projects/museum-hub",
      href2: "https://github.com/mariolazzari/mariolazzari.it",
      images: ["go", "postgres", "redis", "react", "docker"],
    },
    {
      icon: <Orbit size={50} />,
      title: "Sky Hub",
      href1: "/projects/sky-hub",
      href2: "https://github.com/mariolazzari/mariolazzari.it",
      images: ["go", "postgres", "redis", "react", "docker"],
    },
    {
      icon: <Pencil size={50} />,
      title: "Maria Filippini Lazzari",
      href1: "https://mariafilippini.it",
      href2: "https://github.com/mariolazzari/mariafilippini.it",
      images: ["go", "postgres", "redis", "react", "docker"],
    },
    {
      icon: <Eye size={50} />,
      title: "Antonio Arioli",
      href1: "https://antonioarioli.it",
      href2: "https://github.com/mariolazzari/antonioarioli.it",
      images: ["go", "postgres", "redis", "react", "docker"],
    },
    {
      icon: <Flag size={50} />,
      title: "GF MontiForm",
      href1: "https://gfmontiform.it",
      href2: "https://github.com/mariolazzari/gfmontiform.it",
      images: ["go", "postgres", "redis", "react", "docker"],
    },
  ];

  return (
    <div className="my-16 text-center">
      <h2 className="text-4xl text-primary font-semibold text-center mb-16">
        {t("projectTitle")}
      </h2>
      <div className="flex justify-center gap-8 flex-wrap my-8">
        {projects.map((prj, idx) => (
          <Project
            key={prj.title}
            title={prj.title}
            icon={prj.icon}
            description={t(`project${idx + 1}Desc`)}
            text1={t(`project${idx + 1}P1`)}
            text2={t(`project${idx + 1}P2`)}
            href1={prj.href1}
            href2={prj.href2}
            images={prj.images}
          />
        ))}
      </div>

      <Link href="/projects/github-data">
        <Button className="mt-4">
          <Code /> {t("projectButton")}
        </Button>
      </Link>
    </div>
  );
}
