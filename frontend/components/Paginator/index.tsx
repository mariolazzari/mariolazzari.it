import { Field } from "@/components/ui/field";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Props = {
  value: string;
  options?: string[];
  onValueChange: (option: string) => void;
  onPrevClick: () => void;
  onNextClick: () => void;
  disablePrev: boolean;
  disableNext: boolean;
  total: number;
};

export function Paginator({
  value = "10",
  options = ["10", "20", "30", "40", "50"],
  onValueChange,
  onNextClick,
  onPrevClick,
  disableNext,
  disablePrev,
  total,
}: Props) {
  // Safe handlers to block clicks when disabled
  const handlePrev = (e: React.MouseEvent) => {
    if (disablePrev) {
      e.preventDefault();
      return;
    }
    onPrevClick();
  };

  const handleNext = (e: React.MouseEvent) => {
    if (disableNext) {
      e.preventDefault();
      return;
    }
    onNextClick();
  };

  return (
    <div className="flex items-center justify-between gap-4 w-full">
      <Field orientation="horizontal" className="flex items-center gap-2">
        <Select value={value} onValueChange={onValueChange}>
          <SelectTrigger className="w-20" id="select-rows-per-page">
            <SelectValue />
          </SelectTrigger>
          <SelectContent align="start">
            <SelectGroup>
              {options.map(op => (
                <SelectItem key={`pager-${op}`} value={op}>
                  {op}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <span className="text-sm text-muted-foreground">
          / <span className="text-primary font-semibold">{total}</span>
        </span>
      </Field>

      <Pagination className="mx-0 w-auto">
        <PaginationContent className="gap-1">
          <PaginationItem>
            <PaginationLink
              size="icon"
              onClick={handlePrev}
              aria-label="Go to previous page"
              aria-disabled={disablePrev}
              className={
                disablePrev
                  ? "pointer-events-none opacity-40 text-muted-foreground"
                  : "cursor-pointer"
              }
            >
              <ChevronLeft size={16} />
            </PaginationLink>
          </PaginationItem>

          <PaginationItem>
            <PaginationLink
              size="icon"
              onClick={handleNext}
              aria-label="Go to next page"
              aria-disabled={disableNext}
              className={
                disableNext
                  ? "pointer-events-none opacity-40 text-muted-foreground"
                  : "cursor-pointer"
              }
            >
              <ChevronRight size={16} />
            </PaginationLink>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
