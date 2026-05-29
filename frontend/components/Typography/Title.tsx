import { cn } from "@/lib/utils";
import { TypographyProps } from "./TypographyProps";

export function Title({ text, className }: TypographyProps) {
  return (
    <h1
      className={cn("text-6xl text-center text-primary font-bold", className)}
    >
      {text}
    </h1>
  );
}
