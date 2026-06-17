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
      className="px-2 py-3 cursor-pointer"
      variant={selected ? "default" : "outline"}
      onClick={onClick}
    >
      {img}
      {label}
    </Badge>
  );
}
