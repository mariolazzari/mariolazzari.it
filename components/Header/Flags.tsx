"use client";
import { Link, usePathname } from "@/i18n/routing";

export function Flags() {
  const path = usePathname();
  const flags = ["it", "en"];

  return (
    <div className="flex gap-2 items-center flex-1">
      {flags.map(flag => (
        <Link
          className=" hover:font-bold hover:uppercase"
          key={flag}
          href={path}
          locale={flag}
        >
          {flag}
        </Link>
      ))}
    </div>
  );
}
