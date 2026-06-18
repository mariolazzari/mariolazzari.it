import { Baby, Code, Eye } from "lucide-react";
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
      href2: "https://github.com/mariolazzari/rijks",
      images: ["go", "postgres", "redis", "react"],
    },
    {
      icon: <Eye size={50} />,
      title: "Sky Hub",
      href1: "/projects/sky-hub",
      href2: "https://github.com/mariolazzari/rijks",
      images: ["go", "postgres", "redis", "react"],
    },
    {
      icon: <Baby size={50} />,
      title: "CR2 Sinapsi",
      href1: "/projects/sinapsi",
      href2: "https://github.com/mariolazzari/cr2-sinapsi",
      images: ["go", "postgres", "redis", "react"],
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
