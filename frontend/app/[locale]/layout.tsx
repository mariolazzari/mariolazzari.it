import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { cn } from "@/lib/utils";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Providers } from "@/components/Providers";
import { Layout } from "@/types/Layout";
import { DockBar } from "@/components/DockBar";
import { getMessages } from "next-intl/server";
import { Cookies } from "@/components/Cookies";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: {
    template: "%s - Mario Lazzari Senior Full Stack Developer",
    default: "Mario Lazzari - Senior Full Stack Developer",
  },
  description:
    "Senior Full Stack Developer with 29 years of experience building scalable web applications using Go, TypeScript, Next.js, React, PostgreSQL and Node.js.",
  keywords: [
    "Senior Full Stack Developer",
    "Go Developer",
    "Next.js",
    "TypeScript",
    "React",
    "Node.js",
    "PostgreSQL",
    "Redis",
  ],
  metadataBase: new URL("https://www.mariolazzari.it"),
  openGraph: {
    title: "Mario Lazzari | Senior Full Stack Developer",
    description:
      "Portfolio of Mario Lazzari, Senior Full Stack Developer specialized in Go, TypeScript, Next.js and scalable backend architectures.",
    url: "https://www.mariolazzari.it",
    siteName: "Mario Lazzari",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/images/logo.png",
        width: 1200,
        height: 630,
        alt: "Mario Lazzari",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mario Lazzari | Senior Full Stack Developer",
    description: "Portfolio of Mario Lazzari, Senior Full Stack Developer.",
    images: ["/images/og.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
  },
  authors: [
    {
      name: "Mario Lazzari",
      url: "https://www.mariolazzari.it",
    },
  ],
  creator: "Mario Lazzari",
  publisher: "Mario Lazzari",
  verification: {
    google: "MjHnIJ8UuM4K92Q0ShOmpohEh7qiEcpuj3V",
  },
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
          <Toaster />
          <Cookies />
        </Providers>
      </body>
    </html>
  );
}

export default RootLayout;
