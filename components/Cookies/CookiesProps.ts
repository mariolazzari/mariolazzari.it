export type CookiesProps = Partial<{
  variant: "default" | "secondary";
  onAccept: () => void;
  onDecline: () => void;
}>;
