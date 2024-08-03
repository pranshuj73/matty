import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"

import { calendar_v3 } from "@googleapis/calendar"

import Chat from "@/components/chat/chat"
import Events from "@/components/chat/events"

import { getURL } from "@/lib/utils"
import { TooltipProvider } from "@/components/ui/tooltip"
import { fetchEvents } from "@/lib/calendar"


export default async function Page()  {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const { data: { session }} = await supabase.auth.getSession();

  const PROVIDER_TOKEN = session?.provider_token;
  
  if (!user || !session || !PROVIDER_TOKEN) { return redirect("/login"); }

  const credits = await supabase.from('users').select('credits').eq('id', user.id).single();

  let events: calendar_v3.Schema$Event[] = []

  try {
    // events = await fetchEvents(PROVIDER_TOKEN);

    const response = await fetch(`${getURL()}/api/calendar/fetchEvents`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token: PROVIDER_TOKEN }),
    });

    if (!response.ok) { throw new Error('Network response was not ok'); }

    const data = await response.json();

    events = data.slice(0, 20);
  } catch (error) {
    console.error('Error fetching calendar events:', error);
  }

  return (
    <main className="h-dynamic">
      <TooltipProvider>
        <Chat providerToken={PROVIDER_TOKEN} user={user} credits={credits.data?.credits || 0}>
          <p className="opacity-50">✦ Matty</p>
          <Events events={events} />
        </Chat>
      </TooltipProvider>
    </main>
  )
} 
