import { Home, Laptop, GraduationCap, Code, PartyPopper } from "lucide-react";
import { LinksProps } from "./LinksProps";
import Link from "next/link";

export function Links({ isDrawer = false }: LinksProps) {
  const links = [
    {
      icon: <Home size={24} />,
      label: "Home",
      href: "/",
    },
    {
      icon: <Laptop size={24} />,
      label: "Competenze",
      href: "/skills",
    },
    {
      icon: <GraduationCap size={24} />,
      label: "Certificazioni",
      href: "/certifications",
    },
    {
      icon: <Code size={24} />,
      label: "Progetti",
      href: "/projects",
    },
    {
      icon: <PartyPopper size={24} />,
      label: "Interessi",
      href: "/hobbies",
    },
  ];

  return (
    <ul
      className={
        isDrawer
          ? "flex flex-col gap-4 mt-8"
          : "hidden md:flex justify-center items-center gap-2"
      }
    >
      {links.map(link => (
        <Link key={link.href} href={link.href}>
          <li className="flex items-center gap-2 mr-1">
            {link.icon} {link.label}
          </li>
        </Link>
      ))}
    </ul>
  );
}
