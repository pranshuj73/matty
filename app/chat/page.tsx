import ChatNav from "@/components/chat-nav"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { SendHorizonalIcon, icons } from "lucide-react"


export default function Chat()  {
  return (
    <main className="h-screen">
      <ChatNav />
      <section className="p-8 max-w-screen-md mx-auto h-full flex flex-col">
        <ScrollArea className="self-stretch place-self-stretch flex-1">
          <p className="opacity-50">✦ matty</p>
          <p>here are your upcoming events:</p>
          <ul>
            <li className="my-2"><span className="text-blue-300">•</span> college <p className="opacity-50 text-xs">8:00 - 15:00 • in 6h</p></li>
            <li className="my-2"><span className="text-yellow-300">•</span> meeting with client <p className="opacity-50 text-xs">17:00 - 17:30 • in 1d</p></li>
            <li className="my-2"><span className="text-green-300">•</span> lunch with benny <p className="opacity-50 text-xs">12:00 - 13:00 • in 2d</p></li>
          </ul>
          <p className="mt-6">anything you'd like to schedule for today?</p>
        </ScrollArea>
        <div className="flex gap-2">
          <Input className="focus-visible:bg-white/5 transition-colors duration-150 ease-in-out" />
          <Button variant={"outline"} size={"icon"}>
            <SendHorizonalIcon size={18} />
          </Button>
        </div>
      </section>
    </main>
  )
} 