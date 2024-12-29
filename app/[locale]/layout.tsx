import "../globals.css";
import { Header } from "@/components/Header";
import { Inter } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Layout } from "@/types/Layout";
import { ThemeProvider } from "next-themes";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

const inter = Inter({ subsets: ["latin"] });

async function RootLayout({ children, params }: Layout) {
  // locales
  const { locale } = await params;
  const messages = await getMessages();

  return (
    <html lang={locale} className={inter.className} suppressHydrationWarning>
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
