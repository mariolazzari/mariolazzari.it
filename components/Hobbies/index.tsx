import {
  Palette,
  FlaskConical,
  Brain,
  Music,
  Book,
  Calendar,
  Trophy,
  Video,
  Church,
} from "lucide-react";
import { HobbyProps } from "./HobbyProps";
import { Hobby } from "./Hobby";
import { useTranslations } from "next-intl";
import { Subtitle } from "../Typography";
import { PartyPopper } from "lucide-react";

export function Hobbies() {
  const t = useTranslations("Hobbies");

  const cards: HobbyProps[] = [
    {
      title: t("artTitle"),
      icon: <Palette size={32} />,
      description: t("artText"),
      href: "/hobbies/art",
    },
    {
      title: t("sciTitle"),
      icon: <FlaskConical size={32} />,
      description: t("sciText"),
      href: "/hobbies/sci",
    },
    {
      title: t("phyTitle"),
      icon: <Brain size={32} />,
      description: t("phyText"),
      href: "/hobbies/phylo",
    },
    {
      title: t("musTitle"),
      icon: <Music size={32} />,
      description: t("musText"),
      href: "/hobbies/music",
    },
    {
      title: t("bokTitle"),
      icon: <Book size={32} />,
      description: t("bokText"),
      href: "/hobbies/books",
    },
    {
      title: t("hysTitle"),
      icon: <Calendar size={32} />,
      description: t("hysText"),
      href: "/hobbies/history",
    },
    {
      title: t("sprTitle"),
      icon: <Trophy size={32} />,
      description: t("sprText"),
      href: "/hobbies/sport",
    },
    {
      title: t("cinTitle"),
      icon: <Video size={32} />,
      description: t("cinText"),
      href: "/hobbies/cinema",
    },
    {
      title: t("relTitle"),
      icon: <Church size={32} />,
      description: t("relText"),
      href: "/hobbies/religion",
    },
  ];

  return (
    <section className="flex flex-col items-center gap-8 my-8">
      <div className="flex flex-col items-center">
        <PartyPopper size={64} />
        <Subtitle text={t("title")} />
      </div>

      <div className="flex justify-center items-center flex-wrap gap-16">
        {cards.map(card => (
          <Hobby key={card.title} {...card} />
        ))}
      </div>
    </section>
  );
}
