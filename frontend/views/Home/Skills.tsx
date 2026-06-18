import { Marquee } from "@/components/ui/marquee";
import { Button } from "@/components/ui/button";
import { Skill } from "./Skill";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { backend, frontend } from ".";
import { Code } from "lucide-react";

export async function Skills() {
  const t = await getTranslations("Home");

  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden max-w-6xl mx-auto">
      <h2 className="text-4xl text-primary font-semibold text-center mb-8">
        {t("skillTitle")}
      </h2>

      <Marquee className="[--duration:20s] mx-auto" pauseOnHover>
        {frontend.map((skill, id) => (
          <Skill
            key={skill.title}
            title={skill.title}
            description={t(`skillB${id + 1}`)}
            img={skill.img}
            href={skill.url}
          />
        ))}
      </Marquee>

      <Marquee className="[--duration:20s] mx-auto" pauseOnHover reverse>
        {backend.map((skill, id) => (
          <Skill
            key={skill.title}
            title={skill.title}
            description={t(`skillF${id + 1}`)}
            img={skill.img}
            href={skill.url}
          />
        ))}
      </Marquee>

      <div className="from-background pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-linear-to-r"></div>
      <div className="from-background pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-linear-to-l"></div>

      <Link href="/skills">
        <Button className="my-8">
          <Code /> {t("skillButton")}
        </Button>
      </Link>
    </div>
  );
}
