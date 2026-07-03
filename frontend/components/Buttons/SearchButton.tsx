import { ComponentProps } from "react";
import { Button } from "../ui/button";
import { Search, X } from "lucide-react";
import { btnClass } from ".";

type Props = ComponentProps<"button">;

export function SearchButton(props: Props) {
  return (
    <Button className={btnClass} {...props}>
      <Search /> Search
    </Button>
  );
}
