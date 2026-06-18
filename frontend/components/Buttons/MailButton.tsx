import { Mail } from "lucide-react";
import { Button } from "../ui/button";
import { btnClass } from ".";
import { getTranslations } from "next-intl/server";

export async function MailButton() {
  const t = await getTranslations("Home");

  return (
    <Button asChild className={btnClass}>
      <a href="mailto:mario.lazzari@gmail.com">
        <Mail />
        {t("mailButton")}
      </a>
    </Button>
  );
}
