// import { calendar } from "@googleapis/calendar";
import { fetcher } from "@/lib/utils";
import { calendar_v3, google } from "googleapis";
import { use } from "react";



export async function listEvents(provider_token: string) {
  console.log(provider_token)
  const oauth = new google.auth.OAuth2({
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    redirectUri: process.env.GOOGLE_REDIRECT_URI,
  });
  
  // set access token
  oauth.setCredentials({
    access_token: provider_token,
  });
  
  // create calendar client
  const cal = google.calendar({ version: 'v3', auth: oauth });
  
  // get events
  const res = await cal.events.list({
    calendarId: 'primary',
    timeMin: new Date().toISOString(),
    showDeleted: false,
    singleEvents: true,
    maxResults: 10,
    orderBy: 'startTime',
  });

  const events = res.data.items;

  if (!events || events.length === 0) {
    return [];
  }

  return events;
}

