import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"

import { calendar_v3 } from "@googleapis/calendar"

import Chat from "@/components/chat/chat"
import Events from "@/components/chat/events"

import { getURL } from "@/lib/utils"


export default async function Page()  {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const { data: { session }} = await supabase.auth.getSession();

  const PROVIDER_TOKEN = session?.provider_token;
  
  if (!user || !session || !PROVIDER_TOKEN) { return redirect("/login"); }

  const credits = await supabase.from('users').select('credits').eq('id', user.id).single();

  let events: calendar_v3.Schema$Event[] = []

  try {
    const response = await fetch(`${getURL()}/api/calendar/getEvents?token=${PROVIDER_TOKEN}`);
    if (!response.ok) { throw new Error('Network response was not ok'); }
    events = await response.json();
  } catch (error) {
    console.error('Error fetching calendar events:', error);
  }

  return (
    <main className="min-h-dynamic">
      <Chat providerToken={PROVIDER_TOKEN} user={user} credits={credits.data?.credits || 0}>
        <p className="opacity-50">✦ Matty</p>
        <Events events={events} />
      </Chat>
    </main>
  )
} 
