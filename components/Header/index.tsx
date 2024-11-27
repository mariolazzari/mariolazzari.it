import { Drawer } from "@/components/Drawer";
import { ThemeToggle } from "@/components/Theme/ThemeToggle";

export function Header() {
  return (
    <header className="h-[50px] bg-primary flex justify-between items-center p-4">
      <ThemeToggle />

      <nav>
        <ul className="flex justify-center items-center gap-2">
          <li>Home</li>
        </ul>
      </nav>

      <Drawer />
    </header>
  );
}
