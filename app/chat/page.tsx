import ChatNav from "@/components/chat-nav"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { SendHorizonalIcon } from "lucide-react"
import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"
import Events from "./events"
import { listEvents } from "@/utils/calendar/event"

export default async function Chat()  {
  const supabase = createClient();

  const { data: { user } } = await supabase.auth.getUser();
  const { data: { session }} = await supabase.auth.getSession();
  
  if (!user || !session?.provider_token) {
    return redirect("/login");
  }

  let events: any = []
  try {
    console.log('session.provider_token:', session.provider_token)
    events = await listEvents(session.provider_token!);
  } catch (error) {
    console.error('Error fetching calendar events:', error);
  }


  return (
    <main className="h-screen">
      <ChatNav user={user} />
      <section className="p-8 max-w-screen-md mx-auto h-full flex flex-col">
        <ScrollArea className="self-stretch place-self-stretch flex-1 text-wrap">
          <p className="opacity-50">✦ Matty</p>
          <p>Here are your upcoming events:</p>

          <Events events={events} />
          
          <p className="mt-6">Anything you'd like to schedule for today?</p>
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