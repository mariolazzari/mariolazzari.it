"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  useSidebar,
} from "@/components/ui/sidebar";
import { Logo } from "../Logo";
import { Footer } from "./Footer";
import { MenuItem, projects, site, socials } from ".";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import { ChevronDown } from "lucide-react";

export function AppSidebar() {
  const { toggleSidebar, open } = useSidebar();
  const pathname = usePathname();
  const t = useTranslations("Sidebar");

  const renderItem = (
    { href, newTab, label, icon }: MenuItem,
    selected: string,
  ) => {
    const isActive = selected === href;

    return (
      <SidebarMenuButton
        key={href}
        asChild
        isActive={isActive}
        className="bg-transparent! hover:bg-primary! data-[active=true]:bg-transparent! font-semibold!"
      >
        <Link href={href} target={newTab ? "_blank" : "_parent"}>
          {icon}
          <span className={cn(isActive && "text-primary")}>{t(label)}</span>
        </Link>
      </SidebarMenuButton>
    );
  };

  const renderGroup = async (label: string, items: MenuItem[]) => (
    <Collapsible
      defaultOpen
      className="group/collapsible"
      onClick={e => e.stopPropagation()}
    >
      <SidebarGroup>
        <SidebarGroupLabel asChild>
          <CollapsibleTrigger className="font-semibold">
            {t(label)}
            <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
          </CollapsibleTrigger>
        </SidebarGroupLabel>
        <CollapsibleContent>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map(item => renderItem(item, pathname))}
            </SidebarMenu>
          </SidebarGroupContent>
        </CollapsibleContent>
      </SidebarGroup>
    </Collapsible>
  );

  return (
    <Sidebar variant="sidebar" collapsible="icon" onClick={toggleSidebar}>
      <SidebarHeader>
        <Logo className="mx-auto" isSmall />

        {open && (
          <div className="text-center capitalize">
            <p className="font-bold text-primary">mario lazzari</p>
            <p className="text-sm">senior full stack developer</p>
          </div>
        )}
      </SidebarHeader>

      <SidebarContent>
        {renderGroup("mySite", site)}
        {renderGroup("projects", projects)}
        {renderGroup("contacts", socials)}
      </SidebarContent>

      <Footer />
    </Sidebar>
  );
}
