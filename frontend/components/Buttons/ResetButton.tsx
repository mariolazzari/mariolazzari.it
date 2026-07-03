import { ComponentProps } from "react";
import { Button } from "../ui/button";
import { X } from "lucide-react";

type Props = ComponentProps<"button">;

export function ResetButton(props: Props) {
  return (
    <Button variant="outline" {...props}>
      <X /> Reset
    </Button>
  );
}
