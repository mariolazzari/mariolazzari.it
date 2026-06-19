import Link from "next/link";
import { Code, GraduationCap, HomeIcon, Laptop } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Dock, DockIcon } from "@/components/ui/dock";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import { HTMLAttributes } from "react";
import { LocaleButton } from "@/components/Buttons";
import { getTranslations } from "next-intl/server";

export type IconProps = HTMLAttributes<SVGElement>;

const links = [
  { href: "/", icon: HomeIcon, label: "home" },
  { href: "/skills", icon: Laptop, label: "skills" },
  { href: "/certifications", icon: GraduationCap, label: "certifications" },
  { href: "/projects/github-data", icon: Code, label: "projects" },
];

export async function DockBar() {
  const t = await getTranslations("Sidebar");

  return (
    <div className="flex flex-col items-center justify-center fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
      <Dock direction="middle">
        {links.map(link => (
          <DockIcon key={link.label}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href={link.href}
                  aria-label={link.label}
                  className={cn(
                    buttonVariants({ variant: "ghost", size: "icon" }),
                    "size-12 rounded-full",
                  )}
                >
                  <link.icon className="size-6" />
                </Link>
              </TooltipTrigger>
              <TooltipContent>{t(link.label)}</TooltipContent>
            </Tooltip>
          </DockIcon>
        ))}

        <AnimatedThemeToggler variant="hexagon" fromCenter />
        <LocaleButton />
      </Dock>
    </div>
  );
}
