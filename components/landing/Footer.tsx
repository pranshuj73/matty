import Link from "next/link";
import AnimatedShinyText from "../magicui/animated-shiny-text";

export default function Footer() {
  return (
    <footer className="mt-24">
      <AnimatedShinyText>
        Matty © {new Date().getFullYear()} ✦ By {" "}
        <Link className="border-b-2 border-dashed pb-[2px]" href={"https://pranshujha.com"} target="_blank" rel="noreferrer noopener">Pranshu Jha</Link>
      </AnimatedShinyText>
    </footer>
  )
}