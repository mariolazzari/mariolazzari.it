import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Mail, Download } from "lucide-react";

function HomePage() {
  return (
    <div className="flex flex-col items-center">
      <Logo />
      <h1 className="text-6xl font-semibold text-primary text-center">
        Mario Lazzari
      </h1>
      <h2 className="text-4xl text-center">Senior full stack developer</h2>

      <div className="flex gap-2 my-4">
        <Button className="w-24">
          <Mail /> Scrivimi
        </Button>

        <Button className="w-24" variant="destructive">
          <Download /> CV
        </Button>
      </div>
    </div>
  );
}

export default HomePage;
