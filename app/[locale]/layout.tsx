import { Header } from "@/components/Header";
import "../globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Layout } from "@/types/Layout";
import { ThemeProvider } from "next-themes";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";

export const metadata: Metadata = {
  title: {
    template: "%s | Mario Lazzari",
    default: "Mario Lazzari",
  },
  description:
    "Mario Lazzari senior full stack developer JavaScript TypeScript NodeJS ReactJS Go",
};

const inter = Inter({ subsets: ["latin"] });

async function RootLayout({ children, params }: Layout) {
  // Ensure that the incoming `locale` is valid
  const { locale } = await params;
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }
  // Providing all messages to the client
  const messages = await getMessages();

  return (
    <html lang={locale} className={inter.className}>
      <body>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <NextIntlClientProvider messages={messages}>
            <Header />
            <main className="h-[calc(100dvh-100px)] overflow-y-auto p-4">
              {children}
            </main>
            <Footer />
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

export default RootLayout;
