import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { cn } from "@/lib/utils";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Providers } from "@/components/Providers";
import { Layout } from "@/type/Layout";
import { DockBar } from "@/components/DockBar";
import { getMessages } from "next-intl/server";
import { Cookies } from "@/components/Cookies";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: {
    template: "%s - Mario Lazzari Senior Full Stack Developer",
    default: "Mario Lazzari - Senior Full Stack Developer",
  },
  description:
    "Mario Lazzari senior full stack developer Go Rust JavaScript TypeScript NodeJS ReactJS Go Rest Api",
  keywords: [
    "Mario",
    "Lazzari",
    "JavaScript",
    "TypeScript",
    "NodeJS",
    "RectJS",
    "Go",
    "Rest",
    "Api",
    "Rust",
  ],
};

async function RootLayout({ children, params }: Layout) {
  // locales
  const { locale } = await params;
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={cn("h-full", "antialiased", "font-sans", inter.variable)}
      suppressHydrationWarning
    >
      <body>
        <Providers locale={locale} messages={messages}>
          <AppSidebar />
          <main className="w-full min-h-screen">
            <SidebarTrigger className="md:hidden" />
            {children}
          </main>

          <DockBar />
          <Cookies />
        </Providers>
      </body>
    </html>
  );
}

export default RootLayout;
