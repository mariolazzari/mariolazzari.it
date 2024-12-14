import { TypographyProps } from "./TypographyProps";

export function Title({ text }: TypographyProps) {
  return (
    <h1 className="text-6xl text-center text-primary font-bold">{text}</h1>
  );
}
