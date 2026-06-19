import { Title } from "@/components/Typography";
import { Skills, SkillsCloud } from "@/views/Skills";
import { PrevSkills } from "@/views/Skills/PrevSkills";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export const metadata: Metadata = {
  title: "Skills",
};

async function SkillsPage() {
  const t = await getTranslations("Skills");

  return (
    <div className="w-full flex flex-col gap-8 px-4 py-8">
      <SkillsCloud />

      <Title>{t("techStack")}</Title>
      <Skills />

      <Title>{t("oldStack")}</Title>
      <PrevSkills />
    </div>
  );
}

export default SkillsPage;
