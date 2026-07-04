"use client";

import { SubmitEventHandler, useState } from "react";
import { ResetButton, SearchButton } from "@/components/Buttons";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

export function SearchBox() {
  const [selectedQuery, setSelectedQuery] = useState("");
  const router = useRouter();

  const onSubmit: SubmitEventHandler<HTMLFormElement> = e => {
    e.preventDefault();
    router.push(`/projects/museum-hub?query=${selectedQuery}`);
  };

  return (
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
    </form>
  );
}
