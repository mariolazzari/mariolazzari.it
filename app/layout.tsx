import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Layout } from "@/types/Layout";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mario Lazzari - JavaScript Full Stack Developer",
  description:
    "Mario Lazzari JavaScript Full Stack Developer made with NextJS, ReactJS, Tailwind Css",
};

function RootLayout({ children }: Layout) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}

export default RootLayout;
