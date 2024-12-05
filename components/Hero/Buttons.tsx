import { Download, Mail } from "lucide-react";
import { LinkButton } from "../LinkButton";
import { useTranslations, useLocale } from "next-intl";

export function Buttons() {
  const locale = useLocale();
  const t = useTranslations("Home");
  const buttons = [
    {
      href: "mailto:mario.lazzari@gmail.com",
      label: t("mailButton"),
      icon: <Mail />,
    },
    {
      href: `/pdf/cv_mario_lazzari_${locale}.pdf`,
      label: t("cvButton"),
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
          label={b.label}
          icon={b.icon}
          newTab
        />
      ))}
    </div>
  );
}
