import { skillFilter } from "@/data/skills";
import { SkillBadges } from "./SkillBadges";
import { LinkButton } from "../LinkButton";
import { SlInfo } from "react-icons/sl";
import { Subtitle } from "../Typography";
import { useTranslations } from "next-intl";
import SkillType from "@/types/SkillType";
import { Laptop } from "lucide-react";

export function SkillsBadges() {
  const t = useTranslations("SkillTypes");
  const tHome = useTranslations("Home");
  const skills: SkillType[] = ["lang", "lib", "tool", "ide", "db", "os"];

  return (
    <section className="flex flex-col items-center my-8 gap-4">
      <div className="flex flex-col items-center">
        <Laptop size={64} />
        <Subtitle text={tHome("skillsTitle")} />
      </div>

      <div className="my-8 flex justify-center gap-16 flex-wrap">
        {skills.map(skill => (
          <SkillBadges
            key={skill}
            title={t(skill)}
            skills={skillFilter(skill)}
          />
        ))}
      </div>

      <LinkButton
        className="my-4"
        href="/skills"
        label={tHome("skillsButton")}
        icon={<SlInfo />}
      />
    </section>
  );
}
