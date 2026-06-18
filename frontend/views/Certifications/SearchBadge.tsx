import { Badge } from "@/components/ui/badge";
import { ReactNode } from "react";

type Props = {
  img: ReactNode;
  label: string;
  selected: boolean;
  onClick: () => void;
};

export function SearchBadge({ img, label, selected, onClick }: Props) {
  return (
    <Badge
      aria-hidden
      className="px-4 py-3 cursor-pointer"
      variant={selected ? "default" : "outline"}
      onClick={onClick}
    >
      {img}
      {label}
    </Badge>
  );
}
