"use client";

import { SubmitEventHandler, useState } from "react";
import { ResetButton, SearchButton } from "@/components/Buttons";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

const URL = "/projects/museum-hub";

export function SearchBox() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const onSubmit: SubmitEventHandler<HTMLFormElement> = e => {
    e.preventDefault();
    router.push(`${URL}?query=${query}`);
  };

  const onReset = () => {
    setQuery("");
    router.push(URL);
  };

  return (
    <form className="flex flex-col items-center gap-4" onSubmit={onSubmit}>
      <Input
        className="max-w-md"
        placeholder="Search your favourite painter..."
        value={query}
        onChange={e => setQuery(e.target.value)}
      />

      <div className="flex gap-4">
        <ResetButton type="button" disabled={query === ""} onClick={onReset} />
        <SearchButton disabled={query === ""} />
      </div>
    </form>
  );
}
