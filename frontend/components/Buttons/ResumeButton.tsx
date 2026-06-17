import { Download } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import { btnClass } from ".";

export function ResumeButton() {
  return (
    <Link href="#" target="_blank">
      <Button className={btnClass} variant="outline">
        <Download />
        CV
      </Button>
    </Link>
  );
}
