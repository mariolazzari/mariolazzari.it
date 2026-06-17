import { Marquee } from "@/components/ui/marquee";
import { PrevSkill } from "./PrevSkill";

const langs = ["cs", "java", "c", "cpp"];
const dbs = ["oracle", "mysql", "mssql", "sqlite"];
const tools = ["redux", "mui", "mongoose", "prisma"];
const ides = ["eclipse", "netbeans", "visualstudio", "sqldev"];

export function PrevSkills() {
  return (
    <div className="relative flex h-96 w-full flex-row items-center justify-center gap-4 overflow-hidden perspective-near pb-8">
      <div
        className="flex flex-row items-center gap-4"
        style={{
          transform:
            "translateX(-100px) translateY(0px) translateZ(-100px) rotateX(20deg) rotateY(-10deg) rotateZ(20deg)",
        }}
      >
        <Marquee className="[--duration:20s]" vertical>
          {ides.map(ide => (
            <PrevSkill key={ide} src={ide} />
          ))}
        </Marquee>

        <Marquee className="[--duration:20s]" vertical reverse>
          {tools.map(tool => (
            <PrevSkill key={tool} src={tool} />
          ))}
        </Marquee>

        <Marquee className="[--duration:20s]" vertical>
          {dbs.map(db => (
            <PrevSkill key={db} src={db} />
          ))}
        </Marquee>

        <Marquee className="[--duration:20s]" vertical reverse>
          {langs.map(lang => (
            <PrevSkill key={lang} src={lang} />
          ))}
        </Marquee>
      </div>

      <div className="from-background pointer-events-none absolute inset-x-0 top-0 h-1/4 bg-linear-to-b"></div>
      <div className="from-background pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-linear-to-t"></div>
      <div className="from-background pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-linear-to-r"></div>
      <div className="from-background pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-linear-to-l"></div>
    </div>
  );
}
