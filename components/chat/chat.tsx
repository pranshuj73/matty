'use client';

import { useChat } from 'ai/react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { calendar_v3 } from '@googleapis/calendar';
import { Input } from '@/components/ui/input';
import { SendHorizonalIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import React, { PropsWithChildren, useState } from 'react';
import Markdown from '@/components/chat/markdown';
import { ToolInvocation, tool } from 'ai';
import Events from './events';
import { fetchEvents, findEventByName, scheduleEvent } from '@/lib/calendar';


export default function Chat(props: PropsWithChildren<{ data: calendar_v3.Schema$Event[], providerToken: string }>) {
  interface ListEventsArgs { minTime?: string; maxTime?: string; eventName?: string;}

  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    async onToolCall({ toolCall } : { toolCall: ToolInvocation }) {
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
  });

  

  return (
    <section className="p-8 max-w-screen-md mx-auto h-full flex flex-col">
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
      <form className="flex gap-2 pt-4" onSubmit={handleSubmit}>
        <Input
          value={input}
          placeholder="Say Something..."
          onChange={handleInputChange}
          className=" focus-visible:bg-accent transition-colors duration-150 ease-in-out"
        />
        <Button variant={"outline"} size={"icon"} type='submit'>
          <SendHorizonalIcon size={18} />
        </Button>
      </form>
    </section>
  );
}