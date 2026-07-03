"use client";

import { SubmitEventHandler, useState } from "react";
import { ResetButton, SearchButton } from "@/components/Buttons";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { PerPage } from "./PerPage";

type Props = {
  query: string;
};

export function SearchBox({ query = "" }: Props) {
  const [selectedQuery, setSelectedQuery] = useState(query);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState("10");

  const router = useRouter();

  const onSubmit: SubmitEventHandler<HTMLFormElement> = e => {
    e.preventDefault();

    let limit = +perPage;
    if (isNaN(limit)) {
      limit = 10;
    }
    let offset = (page - 1) * limit;

    router.push(
      `/projects/museum-hub?query=${selectedQuery}&limit=${limit}&offset=${offset}`,
    );
  };

  return (
    <div className="px-4">
      <form className="flex flex-col items-center gap-4" onSubmit={onSubmit}>
        <Input
          className="max-w-md"
          placeholder="Search your favourite painter..."
          value={selectedQuery}
          onChange={e => setSelectedQuery(e.target.value)}
        />

        <div className="flex gap-4">
          <ResetButton
            type="button"
            disabled={selectedQuery === ""}
            onClick={() => setSelectedQuery("")}
          />
          <SearchButton disabled={selectedQuery === ""} />
        </div>

        <PerPage rowsPerPage={perPage} onRowsPerPageChange={setPerPage} />
      </form>
    </div>
  );
}
