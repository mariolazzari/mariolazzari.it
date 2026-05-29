import { ReactNode } from "react";
import { SkillType } from "./SkillType";

export type Skill = {
  id: string;
  type: SkillType;
  name: string;
  url: string;
  icon: ReactNode;
};
