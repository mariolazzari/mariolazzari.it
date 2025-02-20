"use client";

import { CookieIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCallback, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { CookiesProps } from "./CookiesProps";

export function Cookies({
  variant = "default",
  onAccept,
  onDecline,
}: CookiesProps) {
  const [isOpen, setIsOpen] = useState(false);

  const getStyles = useCallback(() => {
    if (variant === "default") {
      return cn(
        "fixed z-[200] bottom-0 left-0 right-0 sm:left-4 sm:bottom-4 w-full sm:max-w-md duration-700",
        isOpen
          ? "transition-[opacity,transform] translate-y-0 opacity-100"
          : "hidden"
      );
    }

    return cn(
      "fixed z-[200] bottom-0 left-0 right-0 sm:left-4 sm:bottom-4 w-full sm:max-w-md duration-700",
      isOpen
        ? "transition-[opacity,transform] translate-y-0 opacity-100"
        : "hidden"
    );
  }, [variant, isOpen]);

  const onAcceptClick = () => {
    setIsOpen(false);
    document.cookie =
      "cookieConsent=true; expires=Fri, 31 Dec 9999 23:59:59 GMT";
    onAccept?.();
  };

  const onDeclineClick = () => {
    setIsOpen(false);
    onDecline?.();
  };

  useEffect(() => {
    try {
      if (document.cookie.includes("cookieConsent=true")) {
        setIsOpen(false);
      } else {
        setIsOpen(true);
      }
    } catch (ex) {
      console.log("Cookies consent error", ex);
    }
  }, []);

  return (
    <div className={getStyles()}>
      <div className="dark:bg-card bg-background rounded-md m-3 border border-border shadow-lg">
        <div className="grid gap-2">
          <div className="border-b border-border h-14 flex items-center justify-between p-4">
            <h2 className="text-md font-medium">I use cookies</h2>
            <CookieIcon className="h-[1.2rem] w-[1.2rem]" />
          </div>
          <div className="p-2">
            <p className="text-xs font-normal text-start">
              I use cookies to ensure you get the best experience on our
              website. For more information on how we use cookies, please see
              our cookie policy.
              <span className="text-xs">
                By clicking
                <span className="font-medium opacity-80">Accept</span>, you
                agree to our use of cookies.
              </span>
              <br />
              <a href="#" className="text-xs underline">
                Learn more.
              </a>
            </p>
          </div>
          <div className="flex gap-2 p-4 py-5 border-t border-border dark:bg-background/20">
            <Button onClick={onAcceptClick} className="w-full">
              Accept
            </Button>
            <Button
              onClick={onDeclineClick}
              className="w-full"
              variant="secondary"
            >
              Decline
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
