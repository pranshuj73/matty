import { CircleDashedIcon } from "lucide-react";

export default function Navbar() {
  return (
    <header className="fixed top-5 left-1/2 -translate-x-1/2 z-50 max-w-screen-lg w-[90%] backdrop-blur-md bg-neutral-700/5 border-white/10 border-2 rounded-lg">
      <nav className="flex items-center justify-between px-4 py-2 mx-auto">
        <a href="/" className="flex items-center justify-center gap-2"><CircleDashedIcon className="size-4" /> Matty</a>
        <ul className="flex items-center space-x-2 text-xs md:text-sm">
          <li className="bg-neutral-600 p-1 px-2 rounded-[8px]">
            <a href="https://discord.gg/4g6gvp6Q9v" target="_blank" rel="noreferrer noopener">Discord</a>
          </li>
          <li className="bg-white text-black p-1 px-2 rounded-[8px]">
            <a href="https://tally.so/r/3xZ0Ak" target="_blank" rel="noreferrer noopener">Early Access</a>
          </li>
        </ul>
      </nav>
    </header>
  );
}