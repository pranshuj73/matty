import { createClient } from "@/utils/supabase/server"
import { listEvents } from "@/utils/calendar/event"
import { redirect } from "next/navigation"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

import { SendHorizonalIcon } from "lucide-react"

import ChatNav from "@/components/chat-nav"
import DefaultChat from "./defaultChat"


export default async function Chat()  {
  const supabase = createClient();

  const { data: { user } } = await supabase.auth.getUser();
  const { data: { session }} = await supabase.auth.getSession();
  
  if (!user || !session?.provider_token) {
    return redirect("/login");
  }

  let events: any = []
  try {
    events = await listEvents(session.provider_token!);
  } catch (error) {
    console.error('Error fetching calendar events:', error);
  }


  return (
    <main className="h-screen">
      <ChatNav user={user} />
      <section className="p-8 max-w-screen-md mx-auto h-full flex flex-col">
        <ScrollArea className="self-stretch place-self-stretch flex-1 text-wrap">
          <DefaultChat events={events} />
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