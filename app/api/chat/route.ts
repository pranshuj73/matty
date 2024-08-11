import { z } from 'zod';
import { openai } from '@ai-sdk/openai';
import { streamText, tool, convertToCoreMessages } from 'ai';
import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const { data: { session } } = await supabase.auth.getSession();
  
  if (!user || !session) { return NextResponse.json({ error: 'Not authenticated' }, { status: 401 }); }
  const { data, error } = await supabase.from('users').select().eq('id', user.id).single();
  if (!data) { return NextResponse.json({ error: 'User not found' }, { status: 404 }); }
  if (error) { return NextResponse.json({ error: 'Database error' }, { status: 500 }); }

  if (data.credits < 1) { return NextResponse.json({ error: 'Insufficient credits' }, { status: 402 }); }

  const { messages } = await req.json();

  const result = await streamText({
    model: openai('gpt-4o-mini'),
    system: 'You are Matty, a helpful assistant paired with the user\'s calendar that can help with scheduling events, setting reminders, discussing days or planning for it and more! Be vibey but do not use emojis. Assume all questions asked by user are only about their calendar & scheduled events. When passed an image, use data from image to schedule events or set reminders for the user. Do not ask user for any optional details (description, location, attendees) if not provided in the user message.',
    messages: convertToCoreMessages(messages),
    tools: {
      answerQuery: tool({
        description: `Answer any query related to the user's calendar events.`,
        parameters: z.object({
          key: z.string().describe('The keyword to search for in the event data fetched from the user\'s calendar.'),
        }),
      }),
      listAllEvents: tool({
        description: 'Display a list of 10 upcoming events.',
        parameters: z.object({}),
      }),
      listEventsWithinRange: tool({
        description: `Display a list of upcoming events within a specific time range.`,
        parameters: z.object({
          minTime: z.string().optional().describe(`The minimum date-time in ISO format to get events from. Optional. Is current date-time if not provided.`),
          maxTime: z.string().describe(`The maximum date-time in ISO format to get events until. Optional. Must be greater than ${new Date().toISOString()}`),
        }),
      }),
      scheduleEvent: tool({
        description: `Schedule an event with a specific summary, start and end datetimes, and optional description, location and/or attendee list provided by the user.`,
        parameters: z.object({
          summary: z.string().describe('The name of the event to schedule.'),
          description: z.string().optional().describe('The description of the event.'),
          location: z.string().optional().describe('The location of the event. Could also be a meet or zoom link.'),
          attendees: z.string().optional().describe('Comma separated list of attendee emails.'),
          eventStartDateTime: z.string().describe('The start datetime of the event in ISO format as specified by user without any timezone details.'),
          eventEndDateTime: z.string().describe('The end datetime of the event in ISO format as specified by user without any timezone details.'),
        }),
      }),
    },
    temperature: 0.75,
  });

  if (!data.superuser) {
    await supabase.from('users').update({ credits: data.credits - 1 }).eq('id', user.id);
  }

  return result.toAIStreamResponse();
}