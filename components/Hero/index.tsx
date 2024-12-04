import { Logo } from "../Logo";
import { Buttons } from "./Buttons";
import { useTranslations } from "next-intl";

function Hero() {
  // locales
  const t = useTranslations("Home");

  return (
    <section className="flex flex-col items-center">
      <Logo />

      <h1 className="text-6xl font-bold text-primary text-center">
        {t("title")}
      </h1>
      <h2 className="text-4xl text-center font-semibold">{t("subtitle")}</h2>

      <Buttons />

      <p className="max-w-xl text-center mb-4">{t("intro")}</p>
    </section>
  );
}

export default Hero;
