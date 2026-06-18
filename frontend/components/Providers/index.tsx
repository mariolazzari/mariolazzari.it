"use client";

import { PropsWithChildren } from "react";
import { NextIntlClientProvider } from "next-intl";
import { SidebarProvider } from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip"; // Importalo qui
import { ThemeProvider } from "./ThemeProvider";

type Props = PropsWithChildren<{
  locale: string;
  messages: Record<string, string>;
}>;

export function Providers({ children, locale, messages }: Props) {
  return (
    <NextIntlClientProvider
      locale={locale}
      messages={messages}
      timeZone="Europe/Rome"
    >
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem
        disableTransitionOnChange
      >
        <TooltipProvider delayDuration={0}>
          <SidebarProvider>{children}</SidebarProvider>
        </TooltipProvider>
      </ThemeProvider>
    </NextIntlClientProvider>
  );
}
