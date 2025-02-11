import Link from "next/link";
import {
  FaLinkedin,
  FaGithub,
  FaInstagram,
  FaFacebook,
  FaTwitter,
} from "react-icons/fa";

export function Footer() {
  const links = [
    {
      icon: <FaLinkedin />,
      href: "https://www.linkedin.com/in/mario-lazzari",
    },
    {
      icon: <FaGithub />,
      href: "https://github.com/mariolazzari",
    },
    {
      icon: <FaInstagram />,
      href: "https://www.instagram.com/mario.v.lazzari",
    },
    {
      icon: <FaFacebook />,
      href: "https://www.facebook.com/mario.v.lazzari",
    },
    {
      icon: <FaTwitter />,
      href: "https://x.com/MarioLazzari2",
    },
  ];
  const year = new Date().getFullYear();

  return (
    <footer className="h-[50px] flex flex-col items-center justify-evenly">
      <div className="flex gap-4 text-xl">
        {links.map(({ href, icon }) => (
          <Link key={href} href={href} target="_blank" aria-label={href}>
            {icon}
          </Link>
        ))}
      </div>

      <div className="flex items-center gap-2 text-xs">
        &copy;Mario Lazzari {year}
      </div>
    </footer>
  );
}
