import { timeUntilEvent } from "@/lib/utils";
import { formatEvents } from "@/utils/calendar";
import { calendar_v3 } from "@googleapis/calendar";
import Events from "@/components/chat/events";

export default function BaseChat(data: { events: calendar_v3.Schema$Event[] }) {
  let events = formatEvents(data.events.slice(0, 5)) || [];

  return (
    <div className="mb-5">
      <p className="opacity-50">✦ Matty</p>
      <p>Here are your upcoming events:</p>
          
      <Events events={events} />
      
      <p className="mt-4">Anything you'd like to schedule for today?</p>
    </div>
  )
}