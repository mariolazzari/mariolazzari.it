"use client";

import It from "@/public/images/it.png";
import En from "@/public/images/en.png";
import { Link, usePathname } from "@/i18n/routing";

import Image from "next/image";

export function Flags() {
  const flags = [
    { img: It, locale: "it" },
    { img: En, locale: "en" },
  ];

  const path = usePathname();

  return (
    <div className="flex gap-2 items-center">
      {flags.map(flag => (
        <Link key={flag.locale} href={path} locale={flag.locale}>
          <Image
            src={flag.img}
            alt={flag.locale}
            width={24}
            height={24}
            priority
          />
        </Link>
      ))}
    </div>
  );
}
