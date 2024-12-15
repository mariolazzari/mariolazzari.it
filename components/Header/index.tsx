import { ThemeToggle } from "@/components/Theme/ThemeToggle";
import { Drawer } from "./Drawer";
import { Links } from "./Links";
import { Flags } from "./Flags";

export function Header() {
  return (
    <header className="h-[50px] flex justify-between items-center px-4 py-2">
      <Flags />

      <nav className="hidden md:block">
        <Links />
      </nav>

      <div className="flex items-center gap-2">
        <ThemeToggle />
        <Drawer />
      </div>
    </header>
  );
}
