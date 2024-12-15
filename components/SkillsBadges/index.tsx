import { skillFilter } from "@/data/skills";
import { SkillBadges } from "./SkillBadges";
import { LinkButton } from "../LinkButton";
import { SlInfo } from "react-icons/sl";
import { Subtitle } from "../Typography";
import { useTranslations } from "next-intl";
import SkillType from "@/types/SkillType";

export function SkillsBadges() {
  const t = useTranslations("SkillTypes");
  const tHome = useTranslations("Home");
  const skills: SkillType[] = ["lang", "lib", "tool", "ide", "db", "os"];

  return (
    <section className="my-8 flex flex-col items-center">
      <Subtitle text={tHome("skillsTitle")} />
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
