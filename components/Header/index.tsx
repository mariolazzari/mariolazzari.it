import { Drawer } from "@/components/Drawer";
import { ThemeToggle } from "@/components/Theme/ThemeToggle";
import { Separator } from "../ui/separator";
import { Links } from "../Links";
import { Flags } from "../Flags";

export function Header() {
  return (
    <>
      <header className="h-[50px] flex justify-between items-center p-4">
        <Flags />

        <nav>
          <Links />
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Drawer />
        </div>
      </header>

      <Separator className="h-0.5" />
    </>
  );
}
