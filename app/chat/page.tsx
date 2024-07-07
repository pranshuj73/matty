import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"

import { Button } from "@/components/ui/button"

import { PlusIcon } from "lucide-react"

import BaseChat from "@/components/base-chat"
import ProfileMenu from "@/components/profileMenu"
import Chat from "@/components/chat"
import { calendar_v3 } from "@googleapis/calendar"


export default async function Page()  {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const { data: { session }} = await supabase.auth.getSession();

  const PROVIDER_TOKEN = session?.provider_token;
  
  if (!user || !session || !PROVIDER_TOKEN) {
    return redirect("/login");
  }

  let events: calendar_v3.Schema$Event[] = []

  try {
    const response = await fetch(`http://localhost:3000/api/calendar/getEvents?token=${PROVIDER_TOKEN}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    events = await response.json();
  } catch (error) {
    console.error('Error fetching calendar events:', error);
  }


  return (
    <main className="h-screen">
      <nav className="absolute right-5 top-5 flex gap-2">
        <Button variant={"outline"}>
          <PlusIcon className="mr-2" size={18} />
          New Chat
        </Button>

        <ProfileMenu />
      </nav>

      <Chat data={events} providerToken={PROVIDER_TOKEN}>
        <BaseChat events={events} />
      </Chat>
    </main>
  )
} 