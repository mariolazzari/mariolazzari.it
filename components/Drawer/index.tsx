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
import { Links } from "../Links";

export function Drawer() {
  return (
    <Sheet>
      <SheetTrigger>
        <Menu />
      </SheetTrigger>

      <SheetContent className="w-64">
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
