import { skillFilter } from "@/data/skills";
import { SkillBadges } from "./SkillBadges";
import { LinkButton } from "../LinkButton";
import { SlInfo } from "react-icons/sl";
import { Subtitle } from "../Typography";
import { useTranslations } from "next-intl";
import SkillType from "@/types/SkillType";

export function SkillsBadges() {
  const t = useTranslations("SkillTypes");
  const skills: SkillType[] = ["lang", "lib", "tool", "ide", "db", "os"];

  return (
    <section className="my-8">
      <Subtitle text={"Competenze"} />
      <div className="my-8 flex justify-center items-center gap-16 flex-wrap">
        {skills.map(skill => (
          <SkillBadges
            key={skill}
            title={t(skill)}
            skills={skillFilter(skill)}
          />
        ))}
      </div>
      <LinkButton
        className="my-8"
        href="/skills"
        label="Dettagli"
        icon={<SlInfo />}
      />
    </section>
  );
}
