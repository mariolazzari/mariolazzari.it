import { ComponentProps } from "react";
import { Button } from "../ui/button";
import { Search, X } from "lucide-react";

type Props = ComponentProps<"button">;

export function SearchButton(props: Props) {
  return (
    <Button {...props}>
      <Search /> Search
    </Button>
  );
}
