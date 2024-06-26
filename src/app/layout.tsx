/** @format */
import '@mantine/core/styles.css';
import '@mantine/charts/styles.css';
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import { cn } from "../lib/utils";
import SideNavbar from "@/components/SideNavbar";
import { Toaster } from 'react-hot-toast';
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kapiota",
  description: "Kapiota"
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={cn(
          "flex min-h-screen flex-col bg-gray-50 dark:bg-black lg:flex-row",
          inter.className,
          {
            "debug-screens": process.env.NODE_ENV === "development"
          }
        )}
      >
        <Toaster /> 
        {/* sidebar */}
        <SideNavbar />
        {/* main page */}
        <div className="w-full grow overflow-y-auto rounded-xl bg-white ring-1 ring-gray-200 dark:border-none dark:bg-gray-900 dark:ring-gray-800 lg:m-2">{children}</div>
      </body>
    </html>
  );
}
