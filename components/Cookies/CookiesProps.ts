export type CookiesLocale = "en" | "it" | "br";

export type CookiesProps = Partial<{
  variant: "default" | "secondary";
  locale: CookiesLocale;
  onAccept: () => void;
  onDecline: () => void;
}>;
