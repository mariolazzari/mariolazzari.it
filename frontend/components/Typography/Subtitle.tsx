import { cn } from "@/lib/utils";
import { TypographyProps } from "./TypographyProps";

export function Subtitle({ text, className }: TypographyProps) {
  return (
    <h2 className={cn("text-4xl text-center font-semibold", className)}>
      {text}
    </h2>
  );
}
