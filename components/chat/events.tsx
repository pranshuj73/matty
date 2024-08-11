import { calendar_v3 } from "@googleapis/calendar"
import { PropsWithChildren } from "react"

import { timeUntilEvent } from "@/lib/utils"
import { formatEvents, FormattedEvent } from "@/lib/calendar"

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import Link from "next/link"
import { CalendarClockIcon, ClockIcon, MapPinIcon, TextIcon, UsersIcon } from "lucide-react"


const genEmptyCalMessage = () => {
  const noUpcomingEventsMessageList = [
    "You don't have any upcoming events. Would you like to schedule one?",
    "You've got a blank slate. What will you create today?",
    "No events on the horizon. What's next?",
    "Your calendar is empty. What's on your mind?",
    "No events coming up. Perfect opportunity to plan something fun!",
    "No events to worry about. What's on your to-do list?",
    "You're all caught up! Time to do something you love.",
    "No events ahead. How about a little adventure or maybe some downtime?",
    "Looks like your calendar's got some free time - perfect for a new project!",
    "No events on the horizon. Any plans in your mind?",
    "Empty calendar alert! Should we plan something?",
    "All clear! Time to gather your thoughts or take a break?",
    "All clear! Time to get creative or take a break?",
    "No events lined up! What's on your mind?",
  ]

  return noUpcomingEventsMessageList[Math.floor(Math.random() * noUpcomingEventsMessageList.length)]
}


export default function Events({ events }: { events: calendar_v3.Schema$Event[] }) {
  const formattedEvents = events && events.length !== 0 ? formatEvents(events.slice(0, 5)) : [];

  const noUpcomingEventsMessage = genEmptyCalMessage();

  try {
    return (
      <div className="mb-5">
        {(formattedEvents.length !== 0) ? <p>Here are your upcoming events:</p> : <p>{noUpcomingEventsMessage}</p>}
        {(formattedEvents.length !== 0) && (<ul>{formattedEvents.map(event => <EventItem key={event.id} event={event} />)}</ul>)}
        {(formattedEvents.length !== 0) && (<p className="mt-4">What would you like to do today?</p>)}
        
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

export function EventItem(props: PropsWithChildren<{ event: FormattedEvent }>) {
  return (
    <Tooltip key={props.event.id}>
      <TooltipTrigger className="flex flex-col my-2">
        <p><span className="text-sky-300">•</span> {props.event.summary}</p>
        <p className="opacity-50 text-xs">
          {props.event.start.date} {props.event.start.time} {props.event.start.timeZone} • {timeUntilEvent(props.event.start.dateTime, props.event.end.dateTime)}
        </p>
      </TooltipTrigger>
      <TooltipContent className="flex flex-col min-w-72 max-w-md gap-1" align="start" side="bottom">
        <p className="flex items-start"><span className="mr-1.5 size-3 min-w-3">✦</span>{props.event.summary}</p>
        <p className="flex items-start"><ClockIcon className="size-3 min-w-3 mr-1.5 mt-1"/>{props.event.start.date} • {props.event.start.time} - {props.event.end.time}</p>
        {
          props.event.description?.slice(0, -18) &&
          <p className="flex items-start"><TextIcon className="size-3 min-w-3 mr-1.5 mt-1"/>{props.event.description.slice(0, -19)}</p>
        }
        {
          props.event.location &&
          <p className="flex items-start"><MapPinIcon className="size-3 min-w-3 mr-1.5 mt-1" />{props.event.location}</p>
        }
        {
          props.event.attendees &&
          <p className="flex items-start">
            <UsersIcon className="size-3 min-w-3 mr-1.5 mt-1" />
            {props.event.attendees.map(attendee => attendee.email).join(", ")}
          </p>
        }
        {
          props.event.htmlLink &&
          <Link className="pt-2" href={props.event.htmlLink} target="_blank" rel="noreferrer noopener">View Event →</Link>
        }
      </TooltipContent>
    </Tooltip>
  )
}
