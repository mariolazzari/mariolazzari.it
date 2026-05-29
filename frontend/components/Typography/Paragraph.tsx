import { cn } from "@/lib/utils";
import { TypographyProps } from "./TypographyProps";

export function Paragraph({ text, className }: TypographyProps) {
  return <p className={cn("text-justify max-w-xl", className)}>{text}</p>;
}
