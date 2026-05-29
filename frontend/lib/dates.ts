import { DateStr } from "@/types/DateStr";
import { formatDistanceToNow } from "date-fns";
import { it, enGB } from "date-fns/locale";

export function toNow(date: DateStr, locale = "it"): string {
  return formatDistanceToNow(date, {
    locale: locale === "it" ? it : enGB,
    addSuffix: true,
  });
}
