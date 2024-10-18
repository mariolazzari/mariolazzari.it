"use client";

import { PropsWithChildren, useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "../ui/sidebar";
import {
  IconHome,
  IconArrowLeft,
  IconSettings,
  IconUserBolt,
} from "@tabler/icons-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const links = [
  {
    label: "Home",
    href: "/",
    icon: (
      <IconHome className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    ),
  },
  {
    label: "Competenze",
    href: "/skills",
    icon: (
      <IconUserBolt className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    ),
  },
  {
    label: "Settings",
    href: "#",
    icon: (
      <IconSettings className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    ),
  },
  {
    label: "Logout",
    href: "#",
    icon: (
      <IconArrowLeft className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    ),
  },
];

export function SideBar({ children }: PropsWithChildren) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className={cn(
        "rounded-md flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full flex-1 max-w-7xl mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden",
        "h-screen]"
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            <SidebarLink
              link={{
                label: "Mario Lazzari",
                href: "/",
                icon: (
                  <Image
                    src="/logo.webp"
                    className="h-7 w-7 flex-shrink-0 rounded-full"
                    width={50}
                    height={50}
                    alt="Mario Lazzari"
                  />
                ),
              }}
            />

            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
          <div>
            <SidebarLink
              link={{
                label: "Mario Lazzari",
                href: "/",
                icon: (
                  <Image
                    src="/logo.webp"
                    className="h-7 w-7 flex-shrink-0 rounded-full"
                    width={50}
                    height={50}
                    alt="Mario Lazzari"
                  />
                ),
              }}
            />
          </div>
        </SidebarBody>
      </Sidebar>

      {children}
    </div>
  );
}
