import { MailButton, ResumeButton } from "@/components/Buttons";
import { LogoOrbits } from "@/components/Logo";
import { useTranslations } from "next-intl";

export function Hero() {
  const t = useTranslations("Home");
  const title = t("title");
  const subtitle = t("subtitle");
  const intro = t("intro");

  return (
    <div className="mb-8">
      <LogoOrbits />

      <div className="text-center capitalize mt-4">
        <h1 className="font-bold text-primary text-4xl">{title}</h1>
        <h2 className="font-semibold text-3xl">{subtitle}</h2>
      </div>

      <div className="flex justify-center gap-4 my-8">
        <MailButton /> <ResumeButton />
      </div>

      <div className="mx-auto max-w-xl text-justify text-lg my-4 space-y-2">
        <h3>
          Progetto e sviluppo applicazioni web scalabili con{" "}
          <span className="text-primary font-bold">Go</span>,{" "}
          <span className="text-primary font-bold">PostgreSQL</span>,{" "}
          <span className="text-primary font-bold">Next.js</span> e{" "}
          <span className="text-primary font-bold">Docker</span>, con attenzione
          a performance, architettura e manutenibilità del codice.
        </h3>
        <h4 className="text-pretty">
          Lavoro su sistemi complessi, dashboard e piattaforme dati, curando
          l’intero ciclo:{" "}
          <span className="text-primary font-bold">frontend</span>,{" "}
          <span className="text-primary font-bold">backend</span> e{" "}
          <span className="text-primary font-bold">infrastruttura</span>{" "}
          applicativa.
        </h4>
      </div>
    </div>
  );
}
