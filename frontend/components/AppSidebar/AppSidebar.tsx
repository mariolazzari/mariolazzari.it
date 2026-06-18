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
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Logo } from "../Logo";
import { Footer } from "./Footer";
import { MenuItem, projects, site, socials } from ".";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import { ChevronDown } from "lucide-react";
import { usePathname } from "@/i18n/routing";

export function AppSidebar() {
  const { toggleSidebar, open } = useSidebar();
  const pathname = usePathname();
  const t = useTranslations("Sidebar");

  const renderItem = ({ href, newTab, label, icon }: MenuItem) => {
    const isActive = pathname === href;

    return (
      <SidebarMenuItem key={href}>
        <SidebarMenuButton
          asChild
          isActive={isActive}
          className="bg-transparent! hover:bg-primary! data-[active=true]:bg-transparent! font-semibold!"
        >
          <Link
            href={href}
            target={newTab ? "_blank" : undefined}
            rel={newTab ? "noopener noreferrer" : undefined}
            aria-label={t(label)}
          >
            {icon}
            <span className={cn(isActive && "text-primary")}>{t(label)}</span>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    );
  };

  const renderGroup = (label: string, items: MenuItem[]) => (
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
            <SidebarMenu>{items.map(renderItem)}</SidebarMenu>
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
