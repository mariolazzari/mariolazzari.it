"use client";

import { SidebarFooter, useSidebar } from "../ui/sidebar";

export const Footer = () => {
  const { open } = useSidebar();

  if (!open) {
    return null;
  }

  const year = new Date().getFullYear();

  return (
    <SidebarFooter>
      <div className="flex items-center justify-center gap-2 text-xs">
        &copy;Mario Lazzari {year}
      </div>
    </SidebarFooter>
  );
};
