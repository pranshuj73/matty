import { formatEvents } from '@/lib/calendar';
import { calendar_v3 } from '@googleapis/calendar';
import { google } from 'googleapis';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: any) {
  try {
    const { token, summary, eventStartDateTime, eventEndDateTime, timezone, description, location, attendees } = await request.json();

    if (!token || typeof token !== 'string') {
      return NextResponse.json({ error: 'Invalid token' }, { status: 400 });
    }

    if (!eventStartDateTime || !eventEndDateTime) {
      return NextResponse.json({ error: 'Invalid event start or end date-time' }, { status: 400 });
    }

    const oauth = new google.auth.OAuth2({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      redirectUri: process.env.GOOGLE_REDIRECT_URI,
    });
    
    // set access token
    oauth.setCredentials({
      access_token: token,
    });

    const calendar = google.calendar({ version: 'v3', auth: oauth });

    var event: calendar_v3.Schema$Event = {
      'summary': summary || "Untitled Event",
      'location': location,
      'description': (description ? `${description} ` : "" )+ "✦ Created by Matty",
      'start': {
        'dateTime': eventStartDateTime,
        'timeZone': (timezone.length !== 0) ? timezone : "UTC"
      },
      'end': {
        'dateTime': eventEndDateTime,
        'timeZone': (timezone.length !== 0) ? timezone : "UTC"
      },
      'attendees': attendees ? attendees.split(',').map((email: string) => ({ email: email.trim() })) : undefined
    };

    const response = await calendar.events.insert({
      calendarId: 'primary',
      requestBody: event,
    })

    // update the event date-time to the user's timezone
    if (response.data.start && response.data.start.dateTime) {
      response.data.start.dateTime = new Date(response.data.start.dateTime).toLocaleString('en-US', { timeZone: timezone });
    }
    if (response.data.end && response.data.end.dateTime) {
      response.data.end.dateTime = new Date(response.data.end.dateTime).toLocaleString('en-US', { timeZone: timezone });
    }

    return NextResponse.json(formatEvents([response.data]));
  } catch (error) {
    console.error('Error in POST handler:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
