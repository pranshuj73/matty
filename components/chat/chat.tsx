'use client';

import { useChat } from 'ai/react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { calendar_v3 } from '@googleapis/calendar';
import { Input } from '@/components/ui/input';
import { SendHorizonalIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import React, { PropsWithChildren, use, useEffect, useState } from 'react';
import Markdown from '@/components/chat/markdown';
import { ToolInvocation, tool } from 'ai';
import Events from './events';
import { fetchEvents, findEventByName, scheduleEvent } from '@/lib/calendar';
import { createClient } from '@/lib/supabase/client';
import { User } from '@supabase/supabase-js';


export default function Chat(props: PropsWithChildren<{ data: calendar_v3.Schema$Event[], providerToken: string, user: User, credits: number }>) {
  const supabase = createClient();
  const [credits, setCredits] = useState(props.credits);

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
          const response = await scheduleEvent(props.providerToken, summary, eventStartDateTime, eventEndDateTime, description, location, attendees);
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


  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (credits < 1 || isLoading) { return; }
      handleSubmit();
    }

  

  return (
    <section className={`p-8 max-w-screen-md mx-auto h-full flex flex-col`}>
      <ScrollArea className="self-stretch place-self-stretch flex-1 pr-4">
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
                    return ( <> <p>Here are your events:</p> <Events key={toolCallId} events={toolInvocation.result} /> </> );
                  case 'answerQuery':
                    return <Markdown key={toolCallId} content={toolInvocation.result} />;
                  case 'scheduleEvent':
                    return (<> <p key={toolCallId}>Scheduled your event ✌️</p> <Events events={[toolInvocation.result]} /> </>);
                }
              }

              return <p>Calling {toolName}...</p>
            })}

          </div>
        ))}
      </ScrollArea>
      { (credits < 1) && (<span className='pt-4 text-xs opacity-60 text-red-400'>Insufficient credits. Please add more to continue using Matty!</span>) }
      <form className="flex gap-2 pt-4" onSubmit={handleFormSubmit}>
        <Input
          value={input}
          placeholder="Say Something..."
          onChange={handleInputChange}
          className=" focus-visible:bg-accent transition-colors duration-150 ease-in-out"
          disabled={credits < 1 || isLoading}
        />
        <Button variant={"outline"} size={"icon"} type='submit' disabled={credits < 1 || isLoading}>
          <SendHorizonalIcon size={18} />
        </Button>
      </form>
    </section>
  );
}