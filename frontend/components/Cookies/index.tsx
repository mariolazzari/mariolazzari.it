"use client";

import { CookieIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCallback, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { CookiesProps } from "./CookiesProps";

export function Cookies({
  variant = "default",
  locale = "en",
  onAccept,
  onDecline,
}: CookiesProps) {
  const [isOpen, setIsOpen] = useState(false);

  const locales = {
    en: {
      title: "We use cookies",
      accept: "Accept",
      decline: "Decline",
      learnMore: "Learn more",
      message:
        "We use cookies to ensure you get the best experience on our website. For more information on how we use cookies, please see our cookie policy.",
      clicking: "By clicking",
      agree: "you agree to our use of cookies.",
    },
    it: {
      title: "Utilizziamo i cookie",
      accept: "Accetta",
      decline: "Rifiuta",
      learnMore: "Scopri di più",
      message:
        "Utilizziamo i cookie per garantire che tu possa avere la migliore esperienza sul nostro sito. Per maggiori informazioni su come utilizziamo i cookie, consulta la nostra politica sui cookie.",
      clicking: "Cliccando",
      agree: "accetti l'uso dei cookie.",
    },
    br: {
      title: "Nós usamos cookies",
      accept: "Aceitar",
      decline: "Recusar",
      learnMore: "Saiba mais",
      message:
        "Usamos cookies para garantir que você tenha a melhor experiência em nosso site. Para obter mais informações sobre como usamos cookies, consulte nossa política de cookies.",
      clicking: "Ao clicar",
      agree: "você concorda com o uso de cookies.",
    },
  };

  const { title, message, clicking, accept, decline, agree } = locales[locale];

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

  // check if cookieConsent is set
  useEffect(() => {
    try {
      const cookieConsent = document.cookie.includes("cookieConsent=true");
      setIsOpen(!cookieConsent);
    } catch (ex) {
      console.error("Cookies consent error", ex);
    }
  }, []);

  return (
    <div className={getStyles()}>
      <div className="dark:bg-card bg-background rounded-md m-3 border border-border shadow-lg">
        <div className="grid gap-2">
          <div className="border-b border-border h-14 flex items-center justify-between p-4">
            <h2 className="text-md font-medium">{title}</h2>
            <CookieIcon className="h-[1.2rem] w-[1.2rem]" />
          </div>
          <div className="p-2">
            <p className="text-xs font-normal text-start">
              {message}
              <span className="text-xs">
                {clicking}
                <span className="font-medium opacity-80">{accept}</span>
                {agree}
              </span>
              {/* <br />
              <a href="#" className="text-xs underline">
                {learnMore}
              </a> */}
            </p>
          </div>
          <div className="flex gap-2 p-4 py-5 border-t border-border dark:bg-background/20">
            <Button onClick={onAcceptClick} className="w-full">
              {accept}
            </Button>
            <Button
              onClick={onDeclineClick}
              className="w-full"
              variant="secondary"
            >
              {decline}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
