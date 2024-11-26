import { Header } from "@/components/Header";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    template: "%s | Mario Lazzari",
    default: "Mario Lazzari",
  },
  description: "Mario Lazzari senior full stack developer",
};

const inter = Inter({ subsets: ["latin"] });

function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <Header />
        <main className="h-[calc(100dvh-100px)] overflow-y-auto p-4">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

export default RootLayout;
