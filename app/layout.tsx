import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Layout } from "@/types/Layout";
import { ThemeProvider } from "next-themes";
import { SideBar } from "@/components/SideBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mario Lazzari - JavaScript Full Stack Developer",
  description:
    "Mario Lazzari JavaScript Full Stack Developer made with NextJS, ReactJS, Tailwind Css",
};

function RootLayout({ children }: Layout) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SideBar>{children}</SideBar>
        </ThemeProvider>
      </body>
    </html>
  );
}

export default RootLayout;
