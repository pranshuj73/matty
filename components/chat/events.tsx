import { timeUntilEvent } from "@/lib/utils"
import { formatEvents } from "@/lib/calendar"
import { calendar_v3 } from "@googleapis/calendar"
import { PropsWithChildren } from "react"

export default function Events({ events }: { events: calendar_v3.Schema$Event[] }) {
  const formattedEvents = events && events.length !== 0 ? formatEvents(events.slice(0, 5)) : [];
  try {
    return (
      <div className="mb-5">
        {(formattedEvents.length !== 0) ? <p>Here are your upcoming events:</p> : <p>Seems like you got no upcoming events...</p>}
        {(formattedEvents.length !== 0) && (<ul>{formattedEvents.map(event => <EventItem key={event.id} event={event} />)}</ul>) }
        <p className="mt-4">Anything you'd like to schedule for today?</p>
      </div>
      
    )
  } catch (error) {
    console.error(error)
    return (
      <div className="mb-5">
        <p>Error fetching events...</p>
      </div>
    )
  }
}

export function EventItem(props: PropsWithChildren<{ event: any }>) {
  return (
    <li key={props.event.id} className="my-2">
      <p><span className="text-sky-300">•</span> {props.event.summary}</p>
      <p className="opacity-50 text-xs">
        {props.event.start.date} {props.event.start.time} • {timeUntilEvent(props.event.start.dateTime)}
      </p>
    </li>
  )
}
