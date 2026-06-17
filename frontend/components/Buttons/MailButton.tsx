import { Mail } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import { btnClass } from ".";

export function MailButton() {
  return (
    <Link href="mailto:mario.lazzari@gmail.com" target="_blank">
      <Button className={btnClass}>
        <Mail />
        Scrimi
      </Button>
    </Link>
  );
}
