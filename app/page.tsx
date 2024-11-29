import { GithubCalendar } from "@/components/GithubCalendar";
import { LinkButton } from "@/components/LinkButton";
import { Logo } from "@/components/Logo";
import { SkillsBadges } from "@/components/SkillsBadges";
import { Mail, Download } from "lucide-react";

function HomePage() {
  return (
    <div className="flex flex-col items-center">
      <Logo />
      <h1 className="text-6xl font-bold text-primary text-center">
        Mario Lazzari
      </h1>
      <h2 className="text-4xl text-center font-semibold">
        Senior full stack developer
      </h2>

      <div className="flex gap-2 my-4">
        <LinkButton
          href="mailto:mario.lazzari@gmail.com"
          label="Scrivimi"
          icon={<Mail />}
          newTab
        />

        <LinkButton href="/pdf/cv.pdf" label="CV" icon={<Download />} newTab />
      </div>

      <p className="max-w-xl text-center mb-4">
        Benvenuti nel mio sito, nel quale potrete trovare alcune informazioni su
        di me, i miei interessi e gli strumenti che utilizzo quotidianamente
        come sviluppatore software.
      </p>

      <SkillsBadges />
      <GithubCalendar />
    </div>
  );
}

export default HomePage;
