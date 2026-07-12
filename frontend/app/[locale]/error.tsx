"use client";

import { Button } from "@/components/ui/button";
import { useEffect } from "react";

type Props = {
  error: Error & { digest?: string };
  unstable_retry: () => void;
};

function Error({ error, unstable_retry }: Props) {
  // Log the error to an error reporting service
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div>
      <h2>Something went wrong!</h2>
      <Button onClick={unstable_retry}>Try again</Button>
    </div>
  );
}

export default Error;
