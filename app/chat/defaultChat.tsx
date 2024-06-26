import { timeUntilEvent } from "@/lib/utils";
import { formatEvents } from "@/utils/calendar/event";
import { calendar_v3 } from "@googleapis/calendar";

export default function DefaultChat(data: { events: calendar_v3.Schema$Event[] }) {
  let events = formatEvents(data.events) || [];

  return (
    <div>
      <p className="opacity-50">✦ Matty</p>
      <p>Here are your upcoming events:</p>
          
      <ul>
        {(!events || events.length === 0) ? 
          <p>Seems like you have no upcoming events...</p>
          : 
          events.map((event: any) => 
            <li key={event.id} className="my-2"><span className="text-blue-300">•</span> {event.summary} <p className="opacity-50 text-xs">{event.start.date} {event.start.time} • in {timeUntilEvent(event.start.dateTime)}</p></li>
        )
      }
      </ul>
      
      <p className="mt-6">Anything you'd like to schedule for today?</p>
    </div>
  )
}