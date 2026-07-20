"use client";

import { useState, useTransition, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ResetButton, SearchButton } from "@/components/Buttons";
import { Input } from "@/components/ui/input";
import { Paginator } from "@/components/Paginator";

const BASE_URL = "/projects/museum-hub";

type SearchBoxProps = {
  initialQuery?: string;
  currentPage: number;
  totalPages: number;
  totalItems: number;
};

export function SearchBox({
  initialQuery = "",
  currentPage,
  totalPages,
  totalItems,
}: SearchBoxProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  // Keep state in sync with URL or initial props
  const [query, setQuery] = useState(initialQuery);
  const [limit, setLimit] = useState(() => searchParams.get("limit") || "10");

  // Sync state if initialQuery changes dynamically
  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  const updateNavigation = (
    newQuery: string,
    newPage: number,
    newLimit: string,
  ) => {
    const currentLimit = parseInt(newLimit, 10);
    const calculatedOffset = (newPage - 1) * currentLimit;

    const params = new URLSearchParams();
    if (newQuery.trim()) params.set("query", newQuery.trim());
    params.set("limit", newLimit);
    params.set("offset", calculatedOffset.toString());

    startTransition(() => {
      router.replace(`${BASE_URL}?${params.toString()}`);
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Reset to page 1 on a new search term
    updateNavigation(query, 1, limit);
  };

  const handleReset = () => {
    setQuery("");
    startTransition(() => {
      router.push(BASE_URL);
    });
  };

  const handleLimitChange = (newLimit: string) => {
    setLimit(newLimit);
    // Reset to page 1 when changing items per page to avoid out-of-bounds offsets
    updateNavigation(query, 1, newLimit);
  };

  const handlePageChange = (direction: "prev" | "next") => {
    const targetPage = direction === "next" ? currentPage + 1 : currentPage - 1;
    if (targetPage > 0 && targetPage <= totalPages) {
      updateNavigation(query, targetPage, limit);
    }
  };

  const isButtonDisabled = !query.trim() || isPending;

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto flex w-full max-w-md flex-col items-center gap-6 p-4"
    >
      <div className="w-full space-y-2">
        <Input
          type="search"
          placeholder="Search your favourite painter..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          disabled={isPending}
          className="w-full text-base sm:text-sm"
        />
      </div>

      <div className="flex items-center gap-3">
        <ResetButton
          type="button"
          disabled={isButtonDisabled}
          onClick={handleReset}
        />
        <SearchButton
          type="submit"
          disabled={isPending}
          isLoading={isPending}
        />
      </div>

      {totalPages > 0 && (
        <div className="w-full pt-2 border-t border-border">
          <Paginator
            value={limit}
            onValueChange={handleLimitChange}
            onNextClick={() => handlePageChange("next")}
            onPrevClick={() => handlePageChange("prev")}
            disableNext={currentPage >= totalPages || isPending}
            disablePrev={currentPage <= 1 || isPending}
            total={totalItems}
          />
        </div>
      )}
    </form>
  );
}
