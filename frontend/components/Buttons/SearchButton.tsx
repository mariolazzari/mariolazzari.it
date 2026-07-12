import { ComponentProps } from "react";
import { Button } from "../ui/button";
import { Loader2, Search } from "lucide-react";
import { btnClass } from ".";

type Props = ComponentProps<"button"> & {
  isLoading?: boolean;
};

export function SearchButton({
  isLoading = false,
  children,
  disabled,
  ...props
}: Props) {
  return (
    <Button className={btnClass} disabled={disabled || isLoading} {...props}>
      {isLoading ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <Search className="mr-2 h-4 w-4" />
      )}

      {children ?? "Search"}
    </Button>
  );
}
