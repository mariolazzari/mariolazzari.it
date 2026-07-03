"use client";

import { SubmitEventHandler, useState } from "react";
import { ResetButton, SearchButton } from "@/components/Buttons";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { PaginationBox } from "./PaginationBox";

export function SearchBox() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState("10");

  const router = useRouter();

  const onSubmit: SubmitEventHandler<HTMLFormElement> = e => {
    e.preventDefault();

    let limit = +perPage;
    if (isNaN(limit)) {
      limit = 10;
    }
    let offset = (page + 1) * limit;

    router.push(
      `/projects/museum-hub?query=${query}&limit=${limit}&offset=${offset}`,
    );
  };

  return (
    <div className="px-4">
      <form className="flex flex-col items-center gap-4" onSubmit={onSubmit}>
        <Input
          className="max-w-md"
          placeholder="Search your favourite painter..."
          value={query}
          onChange={e => setQuery(e.target.value)}
        />

        <div className="flex gap-4">
          <ResetButton disabled={query === ""} onClick={() => setQuery("")} />
          <SearchButton disabled={query === ""} />
        </div>

        <PaginationBox
          rowsPerPage={perPage}
          onRowsPerPageChange={setPerPage}
          onNextClick={() => setPage(page => page + 1)}
          onPrevClick={() => setPage(page => page - 1)}
        />
      </form>
    </div>
  );
}
