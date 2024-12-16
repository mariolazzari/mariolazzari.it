import { Skill } from "@/types/Skill";
import { ReactNode } from "react";

export type SkillBadgesProps = {
  icon: ReactNode;
  title: string;
  skills: Skill[];
};
