import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Hi from "@/components/hi";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Matty",
  description: "Matty is your assistant for all things related to you calendar.",
};

export const viewport: Viewport = {
  themeColor: 'black',
  colorScheme: 'dark',

}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body className={cn(inter.className, "dark")}>
        <Hi />
        {children}
      </body>
    </html>
  );
}
