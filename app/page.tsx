import Hero from "@/components/landing/Hero";
import Navbar from "@/components/landing/Navbar";

import Image from "next/image";

export default function Home() {
  return (
    <main className="py-12 px-8">
      <Navbar />
      <Hero />

    </main>
  );
}
