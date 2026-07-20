"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Bug, Home, RefreshCcw } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

type Props = {
  error: Error & { digest?: string };
  unstable_retry: () => void;
};

function Error({ error, unstable_retry }: Props) {
  const router = useRouter();

  // Log the error to an error reporting service
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="w-full h-screen flex justify-center items-center px-4">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <CardTitle>Errore</CardTitle>
          <CardDescription>Qualcosa è andato storto</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center text-destructive">
          <Bug size={100} />
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button variant="outline" className="w-full" onClick={unstable_retry}>
            <RefreshCcw /> Riprova
          </Button>

          <Button
            type="submit"
            className="w-full"
            onClick={() => router.replace("/")}
          >
            <Home /> Home
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default Error;
