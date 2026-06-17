import { Hobby } from "@/views/Hobbies";
import {
  Book,
  Brain,
  Film,
  History,
  Music,
  Paintbrush,
  SportShoe,
  Star,
} from "lucide-react";
import { Metadata } from "next";
import { useTranslations } from "next-intl";

export const metadata: Metadata = {
  title: "Hobby",
};

function HobbiesPage() {
  const t = useTranslations("Hobbies");

  const icons = [
    <Brain />,
    <Star />,
    <Paintbrush />,
    <Music />,
    <Book />,
    <SportShoe />,
    <Film />,
    <History />,
  ];

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center px-4">
      <h2 className="text-4xl text-primary font-semibold text-center mb-8">
        {t("title")}
      </h2>
      <div className="flex justify-center items-center gap-8 flex-wrap">
        {icons.map((icon, id) => (
          <Hobby
            key={`hobby-${id}`}
            title={t(`title${id + 1}`)}
            description={t(`desc${id + 1}`)}
            icon={icon}
          />
        ))}
      </div>
    </div>
  );
}

export default HobbiesPage;
