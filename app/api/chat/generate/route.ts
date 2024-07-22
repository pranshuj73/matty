import { z } from 'zod';
import { openai } from '@ai-sdk/openai';
import { generateText, streamText, tool } from 'ai';
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

  const { question, eventName, matchedEvents } = await req.json();

  if (!matchedEvents) { return NextResponse.json({ response: `Could not find events related to ${eventName}` }); }

  const { text } = await generateText({
    model: openai('gpt-4o-mini'),
    system: 'You are Matty, a virtual assistant that can help with scheduling events, setting reminders, and more. Be vibey but do not use emojis.',
    prompt: `Events: "${matchedEvents}` + (question ? `User: "${question}"` : `Give a short description about "${eventName}"`),
    toolChoice: 'none',
  });

  // Deduct 1 credit from user
  if (!data.superuser) {
    await supabase.from('users').update({ credits: data.credits - 1 }).eq('id', user.id);
  }
  
  return NextResponse.json({ response: text });
}