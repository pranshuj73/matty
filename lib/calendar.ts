import { calendar_v3, google } from "googleapis";
import Fuse from 'fuse.js';
import { createOpenAI } from "@ai-sdk/openai"
import { getURL } from "@/lib/utils"

const openai = createOpenAI({ apiKey: process.env.OPENAI_API_KEY })

export type FormattedEvent = calendar_v3.Schema$Event & {
  start: {
    dateTime: string;
    time: string;
    date: string;
    timezone: string | null | undefined;
  };
  end: {
    dateTime: string;
    time: string;
    date: string;
    timezone: string | null | undefined;
  };
};

export function formatEvents(data: calendar_v3.Schema$Event[]) {
  const formattedEvents = data.map(event => {
    if (!event.start?.dateTime) {
      event.start!.dateTime = new Date(
        new Date(event.start!.date! + "T00:00:00").toLocaleString("en-US", { timeZone: event.start!.timeZone! })
      ).toISOString();
    }

    if (!event.end?.dateTime) {
      event.end!.dateTime = new Date(
        new Date(event.end!.date! + "T23:59:59").toLocaleString("en-US", { timeZone: event.end!.timeZone! })
      ).toISOString();
    }
    
    const startDateObj = new Date(event.start!.dateTime!);
    const endDateObj = new Date(event.end!.dateTime!);

    // format startDateObj and endDateObj time in the format hh:mm in 24-hour time
    const formattedStartTime = startDateObj.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: event.start!.timeZone || 'UTC' });
    const formattedEndTime = endDateObj.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: event.end!.timeZone || 'UTC' });

    // format the start and end date in the format day dd month like Wed, 01 Jan
    const formattedStartDate = startDateObj.toLocaleDateString('en-US', { weekday: 'short', day: '2-digit', month: 'short', timeZone: event.start!.timeZone || 'UTC' });
    const formattedEndDate = endDateObj.toLocaleDateString('en-US', { weekday: 'short', day: '2-digit', month: 'short', timeZone: event.end!.timeZone || 'UTC' });

    return {
      ...event,
      "summary": event.summary ? event.summary : "Untitled Event",
      "start": {
        "dateTime": event.start!.dateTime,
        "time": formattedStartTime,
        "date": formattedStartDate,
        "timezone": event.start!.timeZone
      },
      "end": {
        "dateTime": event.end!.dateTime,
        "time": formattedEndTime,
        "date": formattedEndDate,
        "timezone": event.end!.timeZone
      },
    }
  })

  return formattedEvents;
}

export async function fetchEvents(token: string, maxTime?: string | undefined, minTime?: string | undefined) {
  try {
    const response = await fetch(`${getURL()}/api/calendar/fetchEvents`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', },
      body: JSON.stringify({ token, minTime, maxTime }),
    });
    if (!response.ok) { throw new Error('Network response was not ok'); }

    const data = await response.json();

    return data.slice(0, 20);
  } catch (error) {
    console.error('Error fetching calendar events:', error);
    return 'Error fetching calendar events';
  }
}


export async function findEventByName(eventName: string, question: string | undefined, token: string) {
  const eventsObj = await fetchEvents(token);
  const events = await eventsObj.json();

  if (!events) { return 'Error fetching events'; }

  const fuse = new Fuse(events, {
    keys: ['summary', 'description', 'location'],
    threshold: 0.4, // Adjust this value to control the fuzziness

  });

  const fuzzyResults = fuse.search(eventName);

  if (fuzzyResults.length > 0) {
    const matchedEvents = JSON.stringify(fuzzyResults);

    try {
      const body = { question, eventName, matchedEvents };
      
      // post request to /api/chat/generate
      const response = await fetch(`${getURL()}/api/chat/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) { throw new Error('Network response was not ok'); }

      const data = await response.json();

      return data.response;
    } catch (error) {
      console.error('Error generating text:', error);
      return "An error occurred while processing your request. Please try again.";
    }
  }

  return "Could not find details about the event you asked for. Please try again.";
}

export async function scheduleEvent( token: string, summary: string, eventStartDateTime: string, eventEndDateTime: string, timezone: string, description?: string, location?: string, attendees?: string) {
  try {
    const response = await fetch(`${getURL()}/api/calendar/scheduleEvent`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', },
      body: JSON.stringify({ token, summary, eventStartDateTime, eventEndDateTime, timezone, description, location, attendees }),
    });
    if (!response.ok) { throw new Error('Network response was not ok'); }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error('Error scheduling event:', error);
    return 'Error scheduling event';
  }
}