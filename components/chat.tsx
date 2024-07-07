'use client';

import { useChat } from 'ai/react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { calendar_v3 } from '@googleapis/calendar';
import { Input } from '@/components/ui/input';
import { SendHorizonalIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import React, { PropsWithChildren } from 'react';
import Markdown from '@/components/markdown';
import { ToolInvocation } from 'ai';
import Events from './events';
import { fetchEvents } from '@/utils/calendar';

export default function Chat(props: PropsWithChildren<{ data: calendar_v3.Schema$Event[], providerToken: string }>) {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    async onToolCall({ toolCall }) {
      switch (toolCall.toolName) {
        case 'listAllEvents':
          console.log("hello")
          return fetchEvents(props.providerToken);

        case 'listEventsWithinRange': {
          console.log("range event triggered")
          interface ListEventsArgs {
            minTime?: string;
            maxTime: string;
          }
          
          const minTime = (toolCall.args as ListEventsArgs)?.minTime;
          const maxTime = (toolCall.args as ListEventsArgs).maxTime;
  
          console.log('minTime', minTime, 'maxTime', maxTime);

          if (minTime) {
            return fetchEvents(props.providerToken, maxTime, minTime);
          }
  
          return fetchEvents(props.providerToken, maxTime);
        }

        default:
          console.log(toolCall);
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
            console.log("toolInvocation", toolInvocation.toolName)
            
            
            
            if (toolInvocation.toolName === 'listAllEvents' || toolInvocation.toolName === 'listEventsWithinRange') {
              if ('result' in toolInvocation) {

                // check if error in result json
                if (toolInvocation.result.error) {
                  return <p key={toolCallId}>Error fetching details...</p>;
                }
                

                return (
                  <Events key={toolCallId} events={toolInvocation.result} />
                );
              }
              
              return <p key={toolCallId}>Loading Events...</p>;
            } else {
              if ('result' in toolInvocation) {
                return (
                  <div key={toolCallId}>
                    Tool call {`${toolInvocation.toolName}: `}
                    {toolInvocation.result}
                  </div>
                )
              }
              return <div key={toolCallId}>Calling {toolInvocation.toolName}...</div>;
            }

            })}

          </div>
        ))}
      </ScrollArea>
      <form className="flex gap-2 pt-4" onSubmit={handleSubmit}>
        <Input
          value={input}
          placeholder="Hey I'm planning to..."
          onChange={handleInputChange}
          className="focus-visible:bg-white/5 transition-colors duration-150 ease-in-out"
        />
        <Button variant={"outline"} size={"icon"} type='submit'>
          <SendHorizonalIcon size={18} />
        </Button>
      </form>
    </section>
  );
}