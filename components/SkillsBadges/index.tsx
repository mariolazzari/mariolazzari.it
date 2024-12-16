import { skillFilter } from "@/data/skills";
import { SkillBadges } from "./SkillBadges";
import { LinkButton } from "../LinkButton";
import { SlInfo } from "react-icons/sl";
import { Subtitle } from "../Typography";
import { useTranslations } from "next-intl";
import { SkillType } from "@/types/SkillType";
import {
  Laptop,
  Code,
  Library,
  Wrench,
  PanelRight,
  Database,
  Cpu,
} from "lucide-react";

export function SkillsBadges() {
  const t = useTranslations("SkillTypes");
  const tHome = useTranslations("Home");
  const skillTypes: SkillType[] = ["lang", "lib", "tool", "ide", "db", "os"];

  const renderIcon = (st: SkillType) => {
    switch (st) {
      case "lang":
        return <Code />;

      case "lib":
        return <Library />;

      case "tool":
        return <Wrench />;

      case "ide":
        return <PanelRight />;

      case "db":
        return <Database />;

      default:
        return <Cpu />;
    }
  };

  return (
    <section className="flex flex-col items-center my-8 gap-4">
      <div className="flex flex-col items-center">
        <Laptop size={64} />
        <Subtitle text={tHome("skillsTitle")} />
      </div>

      <div className="my-8 flex justify-center gap-16 flex-wrap">
        {skillTypes.map(st => (
          <SkillBadges
            key={st}
            icon={renderIcon(st)}
            title={t(st)}
            skills={skillFilter(st)}
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
