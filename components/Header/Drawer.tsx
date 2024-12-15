import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Logo } from "../Logo";
import { Links } from "./Links";

export function Drawer() {
  return (
    <Sheet>
      <SheetTrigger>
        <Menu size={24} aria-label="menu" />
      </SheetTrigger>

      <SheetContent className="w-64 border-muted">
        <SheetHeader className="flex flex-col items-center">
          <Logo isSmall />
          <SheetTitle>Mario Lazzari</SheetTitle>
          <SheetDescription>Senior full stack developer</SheetDescription>
        </SheetHeader>

        <Links isDrawer />
      </SheetContent>
    </Sheet>
  );
}
