import Link from "next/link";
import { Button } from "../ui/button";
import { ArrowRightIcon } from "lucide-react";
import Ripple from "@/components/magicternity/ripple";
import { PRIMARY_BTN_URL } from "@/lib/values";

export default function CallToAction() {
  return (
    <section className="max-w-screen-lg relative flex h-[500px] w-full flex-col items-center overflow-hidden justify-center">
      <h3 className="text-4xl md:text-5xl font-semibold text-center mt-20 z-10">Reclaim Your Lost Time.</h3>
      <Button className="px-8 mt-8 z-10" asChild>
        <Link href={PRIMARY_BTN_URL} rel="noreferrer noopener">
          Join The Public Beta <ArrowRightIcon className="ml-2 size-4 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
        </Link>
      </Button>
      <Ripple />
    </section>
  );
}