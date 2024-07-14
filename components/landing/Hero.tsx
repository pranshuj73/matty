"use client";
import { ArrowRightIcon } from "lucide-react";
import AnimatedShinyText from "@/components/magicui/animated-shiny-text";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import Particles from "@/components/magicui/particles";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BorderBeam } from "@/components/magicui/border-beam";
import Image from "next/image";


export default function Hero() {
  const words = `Matty is a new way to manage your calendar.`;
  
  return (
    <main className="relative flex flex-col items-center justify-center min-h-screen text-center">
      <div className="relative max-w-screen-lg flex flex-col items-center justify-center">
        <Link href="https://discord.gg/4g6gvp6Q9v" className="group scale-75 md:scale-100 -mt-24 mb-2 rounded-full border border-black/5 bg-neutral-100 text-base text-white transition-all ease-in hover:cursor-pointer hover:bg-neutral-200 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800" target="_blank" rel="noreferrer noopener">
          <AnimatedShinyText className="inline-flex text-sm items-center justify-center px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
            <span>✨ Join The Discord Server</span>
            <ArrowRightIcon className="ml-2 size-4 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
          </AnimatedShinyText>
        </Link>
        <TextGenerateEffect className="text-4xl md:text-5xl lg:text-7xl font-semibold" words={words} />
        <p className="mt-6 text-sm sm:text-md md:text-lg lg:text-xl opacity-60 max-w-screen-md">
          Matty is your assistant for all things related to your calendar. It can help you manage your schedule, set reminders, and even help you conquer your goals.
        </p>

        <Button className="px-8 mt-10" asChild>
          <Link className="group" href="https://tally.so/r/3xZ0Ak" target="_blank" rel="noreferrer noopener">Get Early Access <ArrowRightIcon className="ml-2 size-4 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" /></Link>
        </Button>

        <div className="shadow-[0px_0px_300px_0px_#63b3edaa] top-full left-0 bg-black absolute mt-24 -z-10 flex max-w-screen-lg w-full h-auto aspect-video flex-col items-center justify-center overflow-hidden rounded-lg border bg-background">
          <Image src="/demo-screenshot.png" layout="fill" objectFit="contain" alt="Hero Illustration" />
          <BorderBeam size={250} duration={12} delay={9} />
        </div>
          
      </div>


      <Particles
        className="absolute inset-0 -z-50"
        quantity={100}
        ease={80}
        color={"#fff"}
        refresh
      />
    </main>
  );
}
