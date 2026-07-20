import { Field, FieldLabel } from "@/components/ui/field";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
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
    <div className="flex items-center justify-between gap-4">
      <Field orientation="horizontal" className="w-10">
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
        / <span className="text-primary font-semibold">{total}</span>
      </Field>

      <Pagination className="mx-0 w-auto">
        <PaginationContent className="gap-1">
          {!disablePrev && (
            <PaginationItem>
              <PaginationLink
                size="icon"
                onClick={onPrevClick}
                className="cursor-pointer"
                aria-label="Go to previous page" // Importante per l'accessibilità!
              >
                <ChevronLeft className="h-4 w-4" />
              </PaginationLink>
            </PaginationItem>
          )}

          {!disableNext && (
            <PaginationItem>
              <PaginationLink
                size="icon"
                onClick={onNextClick}
                className="cursor-pointer"
                aria-label="Go to next page"
              >
                <ChevronRight className="h-4 w-4" />
              </PaginationLink>
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    </div>
  );
}
