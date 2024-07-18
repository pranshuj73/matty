import { calendar_v3 } from '@googleapis/calendar';
import { google } from 'googleapis';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: any) {
  try {
    const { token, summary, description, location, attendees, eventStartDateTime, eventEndDateTime } = await request.json();

    console.log('Received event data:', {
      summary,
      description,
      location,
      attendees,
      eventStartDateTime,
      eventEndDateTime,
    });

    if (!token || typeof token !== 'string') {
      console.error('Invalid token');
      return NextResponse.json({ error: 'Invalid token' }, { status: 400 });
    }

    if (!eventStartDateTime || !eventEndDateTime) {
      console.error('Invalid event start or end date-time');
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
      'description': (description ? `${description} ` : " " )+ "✦ Created by Matty",
      'start': {
        'dateTime': eventStartDateTime,
        'timeZone': 'Asia/Kolkata'
      },
      'end': {
        'dateTime': eventEndDateTime,
        'timeZone': 'Asia/Kolkata'
      },
      'attendees': attendees ? attendees.split(',').map((email: string) => ({ email: email.trim() })) : undefined
    };

    console.log('Event to be scheduled:', event);
    const response = await calendar.events.insert({
      calendarId: 'primary',
      requestBody: event,
    })

    console.log(response.data)

    return NextResponse.json(response.data);
  } catch (error) {
    console.error('Error in POST handler:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
