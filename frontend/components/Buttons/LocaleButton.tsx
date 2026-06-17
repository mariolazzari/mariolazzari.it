"use client";

import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

type Props = {
  locale: string;
};

export const LocaleButton = ({ locale }: Props) => {
  const pathname = usePathname();
  const router = useRouter();

  const onClick = () => {
    const href =
      locale === "it"
        ? pathname.replace("/it", "/en")
        : pathname.replace("/en", "/it");

    console.log("first,href", href);

    router.push(href);
  };

  return (
    <Button className="text-xl" variant="ghost" size="icon" onClick={onClick}>
      {locale}
    </Button>
  );
};
