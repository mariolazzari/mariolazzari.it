"use client";

import { SubmitEventHandler, useState, useTransition } from "react";
import { ResetButton, SearchButton } from "@/components/Buttons";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

const URL = "/projects/museum-hub";

export function SearchBox() {
  const [query, setQuery] = useState("");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const onSubmit: SubmitEventHandler<HTMLFormElement> = e => {
    e.preventDefault();

    startTransition(() => {
      router.replace(`${URL}?query=${query}`);
    });
  };

  const onReset = () => {
    setQuery("");
    router.push(URL);
  };

  const btnDisabled = query === "" || isPending;

  return (
    <form className="flex flex-col items-center gap-4" onSubmit={onSubmit}>
      <Input
        className="max-w-md"
        placeholder="Search your favourite painter..."
        value={query}
        onChange={e => setQuery(e.target.value)}
        disabled={isPending}
      />

      <div className="flex gap-4">
        <ResetButton type="button" disabled={btnDisabled} onClick={onReset} />
        <SearchButton disabled={btnDisabled} isLoading={isPending} />
      </div>
    </form>
  );
}
