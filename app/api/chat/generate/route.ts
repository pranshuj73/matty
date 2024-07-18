import { z } from 'zod';
import { openai } from '@ai-sdk/openai';
import { generateText, streamText, tool } from 'ai';
import { NextResponse } from 'next/server';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { question, eventName, matchedEvents } = await req.json();

  const { text } = await generateText({
    model: openai('gpt-3.5-turbo'),
    system: 'You are Matty, a virtual assistant that can help with scheduling events, setting reminders, and more.',
    prompt: `Events: "${matchedEvents}` + (question ? `User: "${question}"` : `Give a short description about "${eventName}"`),
    toolChoice: 'none',
  });

  // Return the generated text
  return NextResponse.json({ response: text });
}