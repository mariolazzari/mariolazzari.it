import { ComponentProps } from "react";

type Props = ComponentProps<"h2">;

export function Title(props: Props) {
  return (
    <h2 className="text-primary text-center text-4xl font-semibold" {...props}>
      {props.children}
    </h2>
  );
}
