import { Drawer } from "@/components/Drawer";
import { ThemeToggle } from "@/components/Theme/ThemeToggle";
import { Separator } from "../ui/separator";
import { Links } from "../Links";

export function Header() {
  return (
    <>
      <header className="h-[50px] flex justify-between items-center p-4">
        <ThemeToggle />

        <nav>
          <Links />
        </nav>

        <Drawer />
      </header>

      <Separator className="h-0.5" />
    </>
  );
}
