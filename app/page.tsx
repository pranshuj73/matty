import Features from "@/components/landing/Features";
import Hero from "@/components/landing/Hero";
import Navbar from "@/components/landing/Navbar";
import { BGEffect } from "@/components/ui/bg-anim";

import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-col items-center py-12 px-8">
      <Navbar />
      <Hero />
      <div className="hidden md:block max-w-screen-lg w-full h-auto aspect-video" />
      <Features />

    </main>
  );
}
