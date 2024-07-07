import { timeUntilEvent } from "@/lib/utils"
import { formatEvents } from "@/utils/calendar"
import { calendar_v3 } from "@googleapis/calendar"
import { PropsWithChildren } from "react"

export default function Events({ events }: { events: calendar_v3.Schema$Event[] }) {
  try {
    return (
      <ul>
        {(!events || events.length === 0) ? 
          <p>Seems like you got no upcoming events...</p>
          :
          formatEvents(events).map((event: any) => 
            <Event key={event.id} event={event} />
        )
      }
      </ul>
    )
  } catch (error) {
    console.error(error)
    return <p>Error fetching events...</p>
  }
}

export function Event(props: PropsWithChildren<{ event: any }>) {
  return (
    <li key={props.event.id} className="my-2">
      <p><span className="text-sky-300">•</span> {props.event.summary}</p>
      <p className="opacity-50 text-xs">
        {props.event.start.date} {props.event.start.time} • {timeUntilEvent(props.event.start.dateTime)}
      </p>
    </li>
  )
}