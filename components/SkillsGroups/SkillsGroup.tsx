import { skillFilter } from "@/data/skills";
import { Subtitle } from "../Typography";
import { SkillCard } from "./SkillCard";
import { SkillsGroupProps } from "./SkillsGroupProps";
import { useTranslations } from "next-intl";

export function SkillsGroup({ icon, skillType }: SkillsGroupProps) {
  const t = useTranslations("Skills");
  const skills = skillFilter(skillType);

  return (
    <div className="flex flex-col items-center gap-8 my-4">
      {icon}
      <Subtitle text={t(skillType)} />

      <div className="flex justify-center items-center flex-wrap gap-16 my-8">
        {skills.map(skill => (
          <SkillCard key={skill.id} skill={skill} />
        ))}
      </div>
    </div>
  );
}
