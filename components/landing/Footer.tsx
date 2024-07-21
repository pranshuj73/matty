import Link from "next/link";
import AnimatedShinyText from "../magicui/animated-shiny-text";

export default function Footer() {
  return (
    <footer className="text-sm text-neutral-600/70 dark:text-neutral-400/70 flex flex-col gap-4 items-center justify-between w-full mt-24 md:flex-row">
      <AnimatedShinyText>
        Matty © {new Date().getFullYear()} ✦ By {" "}
        <Link className="border-b-2 border-dashed pb-[2px]" href={"https://pranshujha.com"} target="_blank" rel="noreferrer noopener">Pranshu Jha</Link>
      </AnimatedShinyText>

      <div className="flex gap-4">
        <Link className="border-b-2 border-dashed pb-[2px]" href="/privacy" target="_blank" rel="noreferrer noopener">Privacy Policy</Link>
        <Link className="border-b-2 border-dashed pb-[2px]" href="/terms" target="_blank" rel="noreferrer noopener">Terms of Service</Link>
      </div>
    </footer>
  )
}