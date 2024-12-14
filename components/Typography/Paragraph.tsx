import { TypographyProps } from "./TypographyProps";

export function Paragraph({ text }: TypographyProps) {
  return <p className="text-justify">{text}</p>;
}
