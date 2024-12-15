import Link from "next/link";
import {
  FaLinkedin,
  FaGithub,
  FaInstagram,
  FaFacebook,
  FaTwitter,
  FaCopyright,
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
    <footer className="h-[50px] flex flex-col items-center py-2">
      <div className="flex gap-2">
        {links.map(link => (
          <Link key={link.href} href={link.href} target="_blank">
            {link.icon}
          </Link>
        ))}
      </div>
      <span className="flex items-center gap-2 text-sm">
        <FaCopyright size={16} /> Mario Lazzari {year}
      </span>
    </footer>
  );
}
