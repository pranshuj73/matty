import Hero from "@/components/landing/Hero";
import Navbar from "@/components/landing/Navbar";
import { BGEffect } from "@/components/ui/bg-anim";

import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-col items-center py-12 px-8">
      <Navbar />
      <Hero />

    </main>
  );
}
