import Link from "next/link";
import { GraduationCap, HomeIcon, Laptop, Star } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Dock, DockIcon } from "@/components/ui/dock";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import { LocaleButton } from "@/components/Buttons";
import { getTranslations } from "next-intl/server";

export async function DockBar() {
  const t = await getTranslations("Sidebar");

  const links = [
    { href: "/", icon: HomeIcon, label: "home" },
    { href: "/skills", icon: Laptop, label: "skills" },
    { href: "/certifications", icon: GraduationCap, label: "certifications" },
    { href: "/hobbies", icon: Star, label: "hobbies" },
  ];

  return (
    <div className="flex flex-col items-center justify-center fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
      <Dock direction="middle" iconSize={48}>
        {links.map(link => (
          <DockIcon key={link.label}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link href={link.href} aria-label={link.label}>
                  <link.icon className="size-6" />
                </Link>
              </TooltipTrigger>
              <TooltipContent>{t(link.label)}</TooltipContent>
            </Tooltip>
          </DockIcon>
        ))}

        <DockIcon>
          <AnimatedThemeToggler className="mt-2" variant="hexagon" fromCenter />
        </DockIcon>

        <DockIcon>
          <LocaleButton />
        </DockIcon>
      </Dock>
    </div>
  );
}
