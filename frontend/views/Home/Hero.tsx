import { MailButton, ResumeButton } from "@/components/Buttons";
import { LogoOrbits } from "@/components/Logo";
import { getLocale } from "next-intl/server";

export async function Hero() {
  const locale = await getLocale();

  const intro =
    locale === "it" ? (
      <>
        <h3>
          Progetto e sviluppo applicazioni web scalabili con{" "}
          <span className="text-primary font-bold">Go</span>,{" "}
          <span className="text-primary font-bold">PostgreSQL</span>,{" "}
          <span className="text-primary font-bold">Next.js</span> e{" "}
          <span className="text-primary font-bold">Docker</span>, con attenzione
          a performance, architettura e manutenibilità del codice.
        </h3>
        <h4>
          Lavoro su sistemi complessi, dashboard e piattaforme dati, curando
          l’intero ciclo:{" "}
          <span className="text-primary font-bold">frontend</span>,{" "}
          <span className="text-primary font-bold">backend</span> e{" "}
          <span className="text-primary font-bold">infrastruttura</span>{" "}
          applicativa.
        </h4>
      </>
    ) : (
      <>
        <h3>
          I design and develop scalable web applications using{" "}
          <span className="text-primary font-bold">Go</span>,{" "}
          <span className="text-primary font-bold">PostgreSQL</span>,{" "}
          <span className="text-primary font-bold">Next.js</span>, and{" "}
          <span className="text-primary font-bold">Docker</span>, with a strong
          focus on performance, architecture, and code maintainability.
        </h3>

        <h4>
          I work on complex systems, dashboards, and data platforms, covering
          the entire lifecycle:{" "}
          <span className="text-primary font-bold">frontend</span>,{" "}
          <span className="text-primary font-bold">backend</span>, and{" "}
          <span className="text-primary font-bold">infrastructure</span>{" "}
          development.
        </h4>
      </>
    );

  return (
    <div className="mb-8">
      <LogoOrbits />

      <div className="text-center capitalize mt-4">
        <h1 className="font-bold text-primary text-4xl">Mario Lazzari</h1>
        <h2 className="font-semibold text-3xl">Senior Full Stack Developer</h2>
      </div>

      <div className="flex justify-center gap-4 my-8">
        <MailButton /> <ResumeButton />
      </div>

      <div className="mx-auto max-w-xl text-center text-lg my-4 space-y-2">
        {intro}
      </div>
    </div>
  );
}
