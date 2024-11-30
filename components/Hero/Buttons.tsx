import { Download, Mail } from "lucide-react";
import { LinkButton } from "../LinkButton";

export function Buttons() {
  return (
    <div className="flex gap-2 my-4">
      <LinkButton
        href="mailto:mario.lazzari@gmail.com"
        label="Scrivimi"
        icon={<Mail />}
        newTab
      />

      <LinkButton
        href="/pdf/cv_mario_lazzari_it.pdf"
        label="CV"
        icon={<Download />}
        newTab
      />
    </div>
  );
}
