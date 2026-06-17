import { Title } from "@/components/Typography";
import { Skills, SkillsCloud } from "@/views/Skills";
import { PrevSkills } from "@/views/Skills/PrevSkills";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Skills",
};

function SkillsPage() {
  return (
    <div className="w-full flex flex-col gap-8 px-4 py-8">
      <SkillsCloud />

      <Title>Il mio stack tecnologico</Title>
      <Skills />

      <Title>Tecnologie che ho utilizzato</Title>
      <PrevSkills />
    </div>
  );
}

export default SkillsPage;
