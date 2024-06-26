import { calendar_v3, google } from "googleapis";


export async function listEvents(provider_token: string) {
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


export function formatEvents(data: calendar_v3.Schema$Event[]) {
  // create a new array of events with formatted timestamps

  const formattedEvents = data.map(event => {
    const startDateObj = new Date(event.start!.dateTime!);
    const endDateObj = new Date(event.end!.dateTime!);

    // format startDateObj and endDateObj time in the format hh:mm in 24-hour time
    const formattedStartTime = `${startDateObj.getHours()}:${startDateObj.getMinutes()}`;
    const formattedEndTime = `${endDateObj.getHours()}:${endDateObj.getMinutes()}`;

    // format the start and end date in the format day dd month like Wed, 01 Jan
    const formattedStartDate = startDateObj.toDateString().slice(0, 10);
    const formattedEndDate = endDateObj.toDateString().slice(0, 10);

    return {
      "id": event.id,
      "summary": event.summary,
      "description": event.description,
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
      "location": event.location,

    }
  })

  return formattedEvents;
}