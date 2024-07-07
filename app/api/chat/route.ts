import { z } from 'zod';
import { openai } from '@ai-sdk/openai';
import { streamText, tool } from 'ai';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = await streamText({
    model: openai('gpt-3.5-turbo'),
    system: 'You are Matty, a virtual assistant that can help with scheduling events, setting reminders, and more.',
    messages,
    tools: {
      listAllEvents: tool({
        description: 'Get all upcoming events from your calendar',
        parameters: z.object({}),
      }),
      listEventsWithinRange: tool({
        description: `Get upcoming events from your calendar within a specified time range. Can be used when user wants to see their schedule for the day or week in which case the maxTime can be set as tomorrow or end of the week. current date-time is ${new Date().toISOString()}.`,
        parameters: z.object({
          minTime: z.date().optional().describe(`The minimum date-time in ISO format to get events from. Optional. Is current date-time if not provided.`),
          maxTime: z.date().describe(`The maximum date-time in ISO format to get events until. Optional. Must be greater than ${new Date().toISOString()}`),
        }),
      })
    }
  });

  return result.toAIStreamResponse();
}