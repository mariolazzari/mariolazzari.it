import { Home, Laptop, GraduationCap, Code, PartyPopper } from "lucide-react";
import { LinksProps } from "./LinksProps";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

export function Links({ isDrawer = false }: LinksProps) {
  const t = useTranslations("Menu");

  const links = [
    {
      icon: <Home size={24} />,
      label: "home",
      href: "/",
    },
    {
      icon: <Laptop size={24} />,
      label: "skills",
      href: "/skills",
    },
    {
      icon: <GraduationCap size={24} />,
      label: "certifications",
      href: "/certifications",
    },
    {
      icon: <Code size={24} />,
      label: "projects",
      href: "/projects",
    },
    {
      icon: <PartyPopper size={24} />,
      label: "hobbies",
      href: "/hobbies",
    },
  ];

  return (
    <ul
      className={
        isDrawer
          ? "flex flex-col gap-4 mt-8"
          : "flex justify-center items-center gap-4"
      }
    >
      {links.map(link => (
        <li key={link.href}>
          <Link className="flex hover:text-primary gap-1" href={link.href}>
            {link.icon} {t(link.label)}
          </Link>
        </li>
      ))}
    </ul>
  );
}
