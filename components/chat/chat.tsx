'use client';

import React, { PropsWithChildren, useEffect, useRef, useState } from 'react';
import Link from 'next/link';

import { useChat } from 'ai/react';
import { Message, ToolInvocation } from 'ai';

import { createClient } from '@/lib/supabase/client';
import { User } from '@supabase/supabase-js';

import { fetchEvents, findEventByName, scheduleEvent } from '@/lib/calendar';

import { ScrollArea } from '@/components/ui/scroll-area';
import { PlaceholdersInput } from '@/components/magicternity/placeholders-input';

import Markdown from '@/components/chat/markdown';
import Events, { EventItem } from '@/components/chat/events';
import ChatNav from '@/components/chat/chat-nav';
import TypingLoader from '@/components/chat/typing-loader';


const placeholders = [
  "What's my schedule for today?",
  "Do I have any meetings tomorrow?",
  "Set up a team lunch for Friday at 1 PM.",
  "What's the next event on my calendar?",
  "Do I have any birthdays coming up this week?",
  "What's on my calendar for the next three days?",
  "Schedule a meeting with halpert@dundermifflin.com next Monday at 2PM.",
  "Do I have any overlapping events today?",
  "Who are invited to my Donut Appreciation Hour next Friday?",
  "Set up a 'Taco Tuesday Team Huddle' at 1 PM next Tuesday.",
  "Schedule a 'Netflix and Chill' night at 8 PM this Saturday.",
  "Add a 'Beach Day with the Squad' at 11 AM next Sunday.",
  "Set up a 'Binge-Watch Session of FRIENDS' from 7 - 10 PM tonight."
];

export default function Chat(props: PropsWithChildren<{ providerToken: string, user: User, credits: number }>) {
  const supabase = createClient();
  const [credits, setCredits] = useState(props.credits);
  const chatRef = useRef<HTMLDivElement>(null);

  async function fetchCredits() {
    const { data: userData, error } = await supabase.from('users').select('credits').eq('id', props.user.id).single();
    if (!userData) { return; }
    if (error) { return; }
    setCredits(userData.credits);
  }

  useEffect(() => {
    fetchCredits();
  }
  , [props.user, props.providerToken]);
  

  interface ListEventsArgs { minTime?: string; maxTime?: string; eventName?: string;}

  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    async onToolCall({ toolCall } : { toolCall: any }) {
      switch (toolCall.toolName) {
        case 'listAllEvents':
          return fetchEvents(props.providerToken);

        case 'listEventsWithinRange': {
          const { minTime, maxTime } = toolCall.args as ListEventsArgs;
          if (minTime) { return fetchEvents(props.providerToken, maxTime, minTime); }
          return fetchEvents(props.providerToken, maxTime);
        }

        case 'answerQuery': {
          const { eventName } = toolCall.args as {eventName: string};
          if (eventName) {
            const answer = await findEventByName(eventName, input, props.providerToken);
            return answer;  
          }
        }

        case 'scheduleEvent': {
          const { summary, description, location, attendees, eventStartDateTime, eventEndDateTime } = toolCall.args as { summary: string, eventStartDateTime: string, eventEndDateTime: string, description?: string, location?: string, attendees?: string };
          const response = await scheduleEvent(props.providerToken, summary, eventStartDateTime, eventEndDateTime, Intl.DateTimeFormat().resolvedOptions().timeZone, description, location, attendees);
          return response;
        }

        default:
          return toolCall;
      }
    },
    onFinish() {
      fetchCredits();
    }
  });

  useEffect(() => {
    chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight, behavior: 'smooth' });

    // check if last message was a tool call by assistant, if so check if it was a schedule event tool call and then insert a message to inform user of the event being scheduled
    const lastMessage = messages[messages.length - 1];
    if (lastMessage && lastMessage.role === 'assistant' && lastMessage.toolInvocations) {
      const lastToolInvocation = lastMessage.toolInvocations[lastMessage.toolInvocations.length - 1];
      
      switch (lastToolInvocation.toolName) {
        case 'listAllEvents':
        case 'listEventsWithinRange': {
          const newMessage: Message = { ...lastMessage, content: "Here are your upcoming events:", };
          messages.pop();
          messages.push(newMessage);
        }
        
        case 'scheduleEvent': {
          const newMessage: Message = {
            ...lastMessage,
            content: `Your event${lastMessage.toolInvocations.length > 1 ? "s have" : " has"}  been scheduled!`,
          };
          messages.pop();
          messages.push(newMessage);
        }
      }
    }
  }, [messages]);


  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetchCredits();
    if (credits < 1 || isLoading) { return; }
    handleSubmit();
  }

  

  return (
    <section className={`p-8 max-w-screen-md mx-auto h-dynamic flex flex-col`}>
      <ChatNav credits={credits} />

      <ScrollArea viewportRef={chatRef} className="h-full flex-1 pr-4 pb-2">
        {props.children}
        {messages.map(m => (
          <div key={m.id} className="mb-5">
            <p className="opacity-50">{m.role === 'user' ? '• You' : '✦ Matty'}</p>
            <Markdown content={m.content} />
            
            {m.toolInvocations?.map((toolInvocation: ToolInvocation) => {
              const toolCallId = toolInvocation.toolCallId;
              const toolName = toolInvocation.toolName;

              if ('result' in toolInvocation) {
                if (toolInvocation.result.error) { return <p key={toolCallId}>Error fetching details...</p>; }

                switch (toolName) {
                  case 'listAllEvents':
                  case 'listEventsWithinRange':
                    return <Events key={toolCallId} events={toolInvocation.result} />;

                  case 'answerQuery':
                    return <Markdown key={toolCallId} content={toolInvocation.result} />;

                  case 'scheduleEvent':
                    return (toolInvocation.result).map((event: any) => (<EventItem event={event} />));
                }
              }

              return <p>Calling {toolName}...</p>
            })}

          </div>
        ))}
      </ScrollArea>
      { isLoading && <TypingLoader /> }
      { (credits < 1) && (<span className='pt-4 ml-5 text-xs opacity-60 text-red-400'>Insufficient credits. Please contact <Link className="border-b border-dashed border-red-400" href={"mailto:hello@pranshujha.com"}>hello@pranshujha.com</Link> with your email for more credits.</span>) }
      <PlaceholdersInput
        placeholders={placeholders}
        value={input}
        handleInputChange={handleInputChange}
        handleSubmit={handleFormSubmit}
        disabled={isLoading || credits < 1}
      />
    </section>
  );
}
