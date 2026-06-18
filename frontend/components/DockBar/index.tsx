import Link from "next/link";
import { HomeIcon, Mail } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Dock, DockIcon } from "@/components/ui/dock";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import { HTMLAttributes } from "react";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa6";
import { LocaleButton } from "@/components/Buttons";

export type IconProps = HTMLAttributes<SVGElement>;

const DATA = {
  navbar: [{ href: "/", icon: HomeIcon, label: "Home" }],
  social: {
    email: {
      name: "Mail",
      url: "mailto:mario.lazzari@gmail.com",
      icon: Mail,
    },
    GitHub: {
      name: "GitHub",
      url: "https://github.com/mariolazzari",
      icon: FaGithub,
    },
    LinkedIn: {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/mario-lazzari",
      icon: FaLinkedin,
    },
    Instagram: {
      name: "Instagram",
      url: "https://www.instagram.com/stories/mario.v.lazzari/",
      icon: FaInstagram,
    },
  },
};

export function DockBar() {
  return (
    <div className="flex flex-col items-center justify-center fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
      <Dock direction="middle">
        {DATA.navbar.map(item => (
          <DockIcon key={item.label}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href={item.href}
                  aria-label={item.label}
                  className={cn(
                    buttonVariants({ variant: "ghost", size: "icon" }),
                    "size-12 rounded-full",
                  )}
                >
                  <item.icon className="size-6" />
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>{item.label}</p>
              </TooltipContent>
            </Tooltip>
          </DockIcon>
        ))}
        <Separator orientation="vertical" className="h-full" />
        {Object.entries(DATA.social).map(([name, social]) => (
          <DockIcon key={name}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  className={cn(
                    buttonVariants({ variant: "ghost", size: "icon" }),
                    "size-12 rounded-full",
                  )}
                  href={social.url}
                  aria-label={social.name}
                  target="_blank"
                >
                  <social.icon className="size-4" />
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>{name}</p>
              </TooltipContent>
            </Tooltip>
          </DockIcon>
        ))}

        <AnimatedThemeToggler variant="hexagon" fromCenter />
        <LocaleButton />
      </Dock>
    </div>
  );
}
