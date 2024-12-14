import { useTranslations } from "next-intl";
import { Logo } from "@/components/Logo";
import { Title, Subtitle, Paragraph } from "@/components/Typography";
import { Buttons } from "./Buttons";

export function Hero() {
  // locales
  const t = useTranslations("Home");
  const title = t("title");
  const subtitle = t("subtitle");
  const intro = t("intro");

  return (
    <section className="flex flex-col items-center">
      <Logo />
      <Title text={title} />
      <Subtitle text={subtitle} />

      <Buttons />
      <Paragraph text={intro} />
    </section>
  );
}
