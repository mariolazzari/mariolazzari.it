import { GlareHover } from "@/components/ui/glare-hover";
import { Brain, Briefcase, FolderGit2, Globe } from "lucide-react";

export function Counters() {
  const years = (new Date().getFullYear() - 1997).toString();

  const items = [
    { icon: <Briefcase size={32} />, title: years, description: "Experience" },
    { icon: <FolderGit2 size={32} />, title: "100+", description: "Projects" },
    { icon: <Globe size={32} />, title: "Multiple", description: "Domains" },
    { icon: <Brain size={32} />, title: "Continous", description: "Learner" },
  ];

  return (
    <div className="flex justify-center gap-8 flex-wrap">
      {items.map(item => (
        <GlareHover key={item.title} duration={666}>
          <div className="w-32 flex flex-col items-center bg-secondary rounded-md py-2 cursor-default">
            {item.icon}
            <h4 className="font-semibold text-primary text-xl mt-4">
              {item.title}
            </h4>
            <h5>{item.description}</h5>
          </div>
        </GlareHover>
      ))}
    </div>
  );
}
