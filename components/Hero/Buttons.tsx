import { Download, Mail } from "lucide-react";
import { LinkButton, LinkButtonProps } from "@/components/LinkButton";
import { useTranslations } from "next-intl";
import { getLocale } from "next-intl/server";

export async function Buttons() {
  const locale = getLocale();
  const t = useTranslations("Home");

  // buttons to render
  const buttons: LinkButtonProps[] = [
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
      {buttons.map(b => (
        <LinkButton
          className="w-28"
          key={b.href}
          href={b.href}
          label={t(b.label)}
          icon={b.icon}
          newTab
        />
      ))}
    </div>
  );
}
