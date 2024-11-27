import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
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
        <Button className="w-24">
          <Mail /> Scrivimi
        </Button>

        <Button className="w-24" variant="destructive">
          <Download /> CV
        </Button>
      </div>

      <p className="max-w-xl text-center mb-4">
        Benvenuti nel mio sito, nel quale potrete trovare alcune informazioni su
        di me, i miei interessi e gli strumenti che utilizzo quotidianamente
        come sviluppatore software.
      </p>
    </div>
  );
}

export default HomePage;
