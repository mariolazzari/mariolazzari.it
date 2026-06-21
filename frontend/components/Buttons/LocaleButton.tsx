"use client";

import { usePathname, useRouter } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { useLocale } from "next-intl";
import Image from "next/image";
import itImg from "@/public/images/it.webp";
import enImg from "@/public/images/en.png";

export const LocaleButton = () => {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const label = `Switch language (current: ${locale})`;
  const src = locale === "it" ? itImg : enImg;

  const onClick = () => {
    const nextLocale = locale === "it" ? "en" : "it";
    router.replace(pathname, { locale: nextLocale });
  };

  return (
    <Button
      className="rounded-full cursor-pointer"
      variant="ghost"
      size="icon-lg"
      aria-label={label}
      onClick={onClick}
    >
      <Image src={src} alt={label} width={24} height={24} priority />
    </Button>
  );
};
