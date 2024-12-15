import { Link } from "@/i18n/routing";
import { Button } from "../ui/button";
import { LinkButtonProps } from "./LinkButtonProps";
import { useLocale } from "next-intl";

export function LinkButton({
  label,
  href,
  icon,
  newTab,
  className,
}: LinkButtonProps) {
  const locale = useLocale();

  return (
    <Link href={href} target={newTab ? "_blank" : undefined} locale={locale}>
      <Button className={className ?? "min-w-24"}>
        {icon} {label}
      </Button>
    </Link>
  );
}
