"use client";

import { usePathname, useRouter } from "@/i18n/routing";
import { Button } from "../ui/button";
import { useLocale } from "next-intl";

export const LocaleButton = () => {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const onClick = () => {
    const nextLocale = locale === "it" ? "en" : "it";
    router.replace(pathname, { locale: nextLocale });
  };

  return (
    <Button
      className="text-2xl rounded-full"
      variant="ghost"
      size="icon-lg"
      onClick={onClick}
      aria-label={`Switch language (current: ${locale})`}
    >
      {locale}
    </Button>
  );
};
