import {
  Baby,
  Code,
  Home,
  Laptop,
  Mail,
  Paintbrush,
  PartyPopper,
  School,
  Star,
} from "lucide-react";
import { ReactNode } from "react";
import {
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
} from "react-icons/fa6";

export type MenuItem = {
  href: string;
  label: string;
  icon: ReactNode;
  newTab?: boolean;
};

export const site: MenuItem[] = [
  { href: "/", label: "home", icon: <Home /> },
  { href: "/skills", label: "skills", icon: <Laptop /> },
  { href: "/certifications", label: "certifications", icon: <School /> },
  { href: "/hobbies", label: "hobbies", icon: <PartyPopper /> },
];

export const projects: MenuItem[] = [
  { href: "/projects/museum-hub", label: "museumHub", icon: <Paintbrush /> },
  { href: "/projects/sky-hub", label: "skyHub", icon: <Star /> },
  { href: "/projects/cr2-sinapsi", label: "cr2", icon: <Baby /> },
  { href: "/projects/github-data", label: "myCode", icon: <Code /> },
];

export const socials: MenuItem[] = [
  {
    icon: <Mail />,
    label: "mail",
    href: "mailto:mario.lazzari@gmail.com",
    newTab: true,
  },
  {
    icon: <FaLinkedin />,
    label: "linkedin",
    href: "https://www.linkedin.com/in/mario-lazzari",
    newTab: true,
  },
  {
    icon: <FaGithub />,
    label: "github",
    href: "https://github.com/mariolazzari",
    newTab: true,
  },
  {
    icon: <FaInstagram />,
    label: "instagram",
    href: "https://www.instagram.com/mario.v.lazzari",
    newTab: true,
  },
  {
    icon: <FaFacebook />,
    label: "facebook",
    href: "https://www.facebook.com/mario.v.lazzari",
    newTab: true,
  },
  {
    icon: <FaTwitter />,
    label: "x",
    href: "https://x.com/MarioLazzari2",
    newTab: true,
  },
];

export * from "./AppSidebar";
