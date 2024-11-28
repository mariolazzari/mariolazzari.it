import { Logo } from "@/components/Logo";
import { SkillsBadges } from "@/components/SkillsBadges";
import { Button } from "@/components/ui/button";
import { Mail, Download } from "lucide-react";
import Link from "next/link";

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
        <Link href="mailto:mario.lazzari@gmail.com" target="_blank">
          <Button className="w-24">
            <Mail /> Scrivimi
          </Button>
        </Link>

        <Link href="">
          <Button className="w-24">
            <Download /> CV
          </Button>
        </Link>
      </div>

      <p className="max-w-xl text-center mb-4">
        Benvenuti nel mio sito, nel quale potrete trovare alcune informazioni su
        di me, i miei interessi e gli strumenti che utilizzo quotidianamente
        come sviluppatore software.
      </p>

      <SkillsBadges />
    </div>
  );
}

export default HomePage;
