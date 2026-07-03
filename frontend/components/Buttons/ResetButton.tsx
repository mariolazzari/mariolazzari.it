import { ComponentProps } from "react";
import { Button } from "../ui/button";
import { X } from "lucide-react";
import { btnClass } from ".";

type Props = ComponentProps<"button">;

export function ResetButton(props: Props) {
  return (
    <Button className={btnClass} variant="outline" {...props}>
      <X /> Reset
    </Button>
  );
}
