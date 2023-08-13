import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import Header from "@/components/shared/Header";

import "../globals.css";
import Footer from "@/components/shared/BottomNavigation";
import LeftSidebar from "@/components/shared/LeftSidebar";
import Feed from "@/components/shared/Feed";
import RightSidebar from "@/components/shared/RightSidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Threads - Auth",
  description: "Authentication for Threads",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
      }}
    >
      <html lang="en">
        <body className={`${inter.className} bg-slate-950`}>{children}</body>
      </html>
    </ClerkProvider>
  );
}
