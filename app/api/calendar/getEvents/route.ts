import { google } from 'googleapis';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get('token')
  const minTime = request.nextUrl.searchParams.get('minTime')
  const maxTime = request.nextUrl.searchParams.get('maxTime')

  if (!token || typeof token !== 'string') {
    return NextResponse.json({ error: 'Invalid token' }, { status: 400 });
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
  

  const response = await calendar.events.list({
    calendarId: 'primary',
    timeMin: (minTime && minTime !== "undefined") ? new Date(minTime).toISOString() : new Date().toISOString(),
    timeMax: (maxTime && maxTime !== "undefined") ? new Date(maxTime).toISOString() : undefined,
    showDeleted: false,
    singleEvents: true,
    maxResults: 100,
    orderBy: 'startTime',
  });

  const events = response.data.items || [];

  return NextResponse.json(events);
}
