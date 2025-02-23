"use client";

import Image from "next/image";
import It from "@/public/images/it.png";
import En from "@/public/images/en.png";
import { Link, usePathname } from "@/i18n/routing";

export function Flags() {
  const path = usePathname();
  const flags = [
    { img: It, locale: "it" },
    { img: En, locale: "en" },
  ];

  return (
    <div className="flex gap-2 items-center flex-1">
      {flags.map(({ img, locale }) => (
        <Link key={locale} href={path} locale={locale}>
          <Image src={img} alt={locale} width={24} height={24} priority />
        </Link>
      ))}
    </div>
  );
}
