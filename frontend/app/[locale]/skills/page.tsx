import { Metadata } from "next";
import { Code, Library, Wrench, PanelRight, Database, Cpu } from "lucide-react";
import { SkillsGroup, SkillsGroupProps } from "@/components/SkillsGroups";

export const metadata: Metadata = {
  title: "Skills",
  alternates: {
    canonical: "/skills",
  },
};

function SkillsPage() {
  const groups: SkillsGroupProps[] = [
    {
      icon: <Code size={64} />,
      skillType: "lang",
    },
    {
      icon: <Library size={64} />,
      skillType: "lib",
    },
    {
      icon: <Wrench size={64} />,
      skillType: "tool",
    },
    {
      icon: <PanelRight size={64} />,
      skillType: "ide",
    },
    {
      icon: <Database size={64} />,
      skillType: "db",
    },
    {
      icon: <Cpu size={64} />,
      skillType: "os",
    },
  ];

  return (
    <section className="flex flex-col gap-8">
      {groups.map(grp => (
        <SkillsGroup key={grp.skillType} {...grp} />
      ))}
    </section>
  );
}

export default SkillsPage;
