import { cookies } from "next/headers"

import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"

import { calendar_v3 } from "@googleapis/calendar"

import Chat from "@/components/chat/chat"
import Events from "@/components/chat/events"

import { TooltipProvider } from "@/components/ui/tooltip"
import { fetchEvents } from "@/lib/calendar"


export default async function Page()  {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const { data: { session }} = await supabase.auth.getSession();

  const PROVIDER_TOKEN = session?.provider_token;

  // get the timezone cookie
  const timezoneCookie = cookies().get('timezone');
  const timezone = timezoneCookie ? timezoneCookie.value : "UTC";
  
  
  if (!user || !session || !PROVIDER_TOKEN) { return redirect("/login"); }

  const credits = await supabase.from('users').select('credits').eq('id', user.id).single();

  let events: calendar_v3.Schema$Event[] = []

  try {
    const data = await fetchEvents(PROVIDER_TOKEN);
    events = data.slice(0, 5);
  } catch (error) {
    console.error('Error fetching calendar events:', error);
  }

  return (
    <main className="h-dynamic">
      <TooltipProvider>
        <Chat providerToken={PROVIDER_TOKEN} user={user} credits={credits.data?.credits || 0}>
          <p className="opacity-50">✦ Matty</p>
          <Events events={events} displayTZ={timezone} />
        </Chat>
      </TooltipProvider>
    </main>)
} 
