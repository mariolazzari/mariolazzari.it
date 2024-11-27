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

  return (
    <footer className="h-[50px] flex flex-col items-center bg-primary py-2">
      <div className="flex gap-1">
        {links.map(link => (
          <Link key={link.href} href={link.href} target="_blank">
            {link.icon}
          </Link>
        ))}
      </div>
      <p className="flex items-center gap-1 text-sm">
        <FaCopyright size={16} /> Mario Lazzari {new Date().getFullYear()}
      </p>
    </footer>
  );
}
