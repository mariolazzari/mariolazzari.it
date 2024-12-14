import { TypographyProps } from "./TypographyProps";

export function Subtitle({ text }: TypographyProps) {
  return <h2 className="text-4xl text-center font-semibold">{text}</h2>;
}
