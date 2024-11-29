import { skillFilter } from "@/data/skills";
import { SkillBadges } from "./SkillBadges";
import { Separator } from "../ui/separator";
import { LinkButton } from "../LinkButton";
import { SlInfo } from "react-icons/sl";

export function SkillsBadges() {
  const skills = [
    {
      title: "Linguaggi di programmazione",
      skills: skillFilter("lang"),
    },
    {
      title: "Librerie",
      skills: skillFilter("lib"),
    },
    {
      title: "Strumenti",
      skills: skillFilter("tool"),
    },
    {
      title: "IDE",
      skills: skillFilter("ide"),
    },
    {
      title: "Database",
      skills: skillFilter("db"),
    },
    {
      title: "Sistemi operativi",
      skills: skillFilter("os"),
    },
  ];

  return (
    <>
      <Separator className="my-8" />
      <h3 className="text-3xl font-semibold mb-8">Competenze</h3>
      <div className="my-4 flex justify-center items-center gap-16 flex-wrap">
        {skills.map(skill => (
          <SkillBadges key={skill.title} {...skill} />
        ))}
      </div>
      <LinkButton href="/skills" label="Dettagli" icon={<SlInfo />} />
    </>
  );
}
