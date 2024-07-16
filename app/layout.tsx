import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Hi from "@/components/hi";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL('https://heymatty.vercel.app/'),
  title: "Matty - Your Calendar Experience Redefined.",
  description: "Matty is your assistant for all things related to your calendar. It can help you manage your schedule, set reminders, and even conquer your goals.",
  openGraph: {
    type: "website",
    url: "https://heymatty.vercel.app",
    title: "Matty - Your Calendar Experience Redefined.",
    description: "Matty is your assistant for all things related to your calendar. It can help you manage your schedule, set reminders, and even conquer your goals.",
    images: "/og-image.png",
  },
  twitter: {
    card: "summary_large_image",
    // site: "@heymatty",
    creator: "@pranshuj73",
    title: "Matty - Your Calendar Experience Redefined.",
    description: "Matty is your assistant for all things related to your calendar. It can help you manage your schedule, set reminders, and even conquer your goals.",
    images: "/og-image.png",
  },
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
