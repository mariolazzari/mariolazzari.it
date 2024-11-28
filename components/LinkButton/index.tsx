import Link from "next/link";
import { Button } from "../ui/button";
import { LinkButtonProps } from "./LinkButtonProps";

export function LinkButton({ label, href, icon, newTab }: LinkButtonProps) {
  return (
    <Link href={href} target={newTab ? "_blank" : undefined}>
      <Button className="w-24">{icon} Scrivimi</Button>
    </Link>
  );
}
