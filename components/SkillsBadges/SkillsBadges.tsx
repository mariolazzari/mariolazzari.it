import { skillFilter } from "@/data/skills";
import { SkillBadges } from "./SkillBadges";

export function SkillsBadges() {
  const langs = {
    title: "Linguaggi di programmazione",
    skills: skillFilter("lang"),
  };

  return (
    <div className="my-4 flex flex-col items-center gap-4">
      <SkillBadges {...langs} />
    </div>
  );
}
