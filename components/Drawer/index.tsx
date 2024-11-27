import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export function Drawer() {
  return (
    <Sheet>
      <SheetTrigger>
        <Menu />
      </SheetTrigger>

      <SheetContent className="bg-primary w-64">
        <SheetHeader>
          <SheetTitle>Mario Lazzari</SheetTitle>
          <SheetDescription>Senior full stack developer</SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
