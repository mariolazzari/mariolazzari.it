import Link from "next/link";
import { Download, Mail } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";

export function Buttons() {
  const t = useTranslations("Home");
  const locale = useLocale();

  // buttons to render
  const buttons = [
    {
      href: "mailto:mario.lazzari@gmail.com",
      label: "mailButton",
      icon: <Mail />,
    },
    {
      href: `/pdf/cv_mario_lazzari_${locale}.pdf`,
      label: "cvButton",
      icon: <Download />,
    },
  ];

  return (
    <div className="flex gap-2 my-4">
      {buttons.map(({ href, label, icon }) => (
        <Link key={href} href={href} target="_blank">
          <Button className="w-28">
            {icon}
            {t(label)}
          </Button>
        </Link>
      ))}
    </div>
  );
}
