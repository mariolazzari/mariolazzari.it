import Link from "next/link";
import { Download } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";
import { Button } from "../ui/button";
import { btnClass } from ".";

export async function ResumeButton() {
  const locale = await getLocale();
  const t = await getTranslations("Home");

  const href =
    locale === "it"
      ? "/pdf/cv_mario_lazzari_it.pdf"
      : "/pdf/cv_mario_lazzari_en.pdf";

  return (
    <Button asChild className={btnClass} variant="outline">
      <Link href={href} target="_blank">
        <Download />
        {t("cvButton")}
      </Link>
    </Button>
  );
}
