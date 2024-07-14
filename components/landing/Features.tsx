import {
  BellDotIcon,
  CalendarIcon,
  GoalIcon,
  LanguagesIcon,
  RefreshCwIcon,
} from "lucide-react";
 
import { BentoCard, BentoGrid } from "@/components/magicui/bento-grid";
import { TextGenerateEffect } from "../ui/text-generate-effect";

const features = [
  {
    Icon: CalendarIcon,
    name: "Intuitive Scheduling",
    description: "Chat with Matty to quickly add, modify, or delete events in your calendar.",
    background: <img className="absolute -right-20 -top-20 opacity-60" src="/path-to-image" />,
    className: "md:col-start-1 md:col-end-3 lg:row-start-1 lg:row-end-4 lg:col-start-2 lg:col-end-3",
},
{
    Icon: GoalIcon,
    name: "Goal Tracking",
    description: "Set and monitor your personal and professional goals, with progress updates and suggestions to stay on track.",
    background: <img className="absolute -right-20 -top-20 opacity-60" src="/path-to-image" />,
    className: "md:col-start-3 md:col-end-4 lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-3",
},
{
    Icon: RefreshCwIcon,
    name: "Seamless Integration",
    description: "Sync with Google Calendar and other popular calendar apps to ensure all your events are in one place.",
    background: <img className="absolute -right-20 -top-20 opacity-60" src="/path-to-image" />,
    className: "md:col-start-1 md:col-end-2 lg:col-start-1 lg:col-end-2 lg:row-start-3 lg:row-end-4",
},
{
    Icon: LanguagesIcon,
    name: "Natural Language Processing",
    description: "Communicate with Matty in natural language, making interactions simple and human-like.",
    background: <img className="absolute -right-20 -top-20 opacity-60" src="/path-to-image" />,
    className: "md:col-start-2 md:col-end-4 lg:col-start-3 lg:col-end-3 lg:row-start-1 lg:row-end-2",
},
{
    Icon: BellDotIcon,
    name: "Customizable Notifications",
    description: "Set personalized reminders and notifications to keep you informed and prepared.",
    background: <img className="absolute -right-20 -top-20 opacity-60" src="/path-to-image" />,
    className: "lg:col-start-3 lg:col-end-3 lg:row-start-2 lg:row-end-4",
},
];

export default function Features() {
  return (
    <section className="max-w-screen-lg flex flex-col items-center">
      <h2 className="text-4xl md:text-5xl font-semibold">Your Calendar Experience Redefined.</h2>

      <BentoGrid className="md:grid-rows-2 lg:grid-rows-3 mt-16">
        {features.map((feature) => (
          <BentoCard key={feature.name} {...feature} />
        ))}
      </BentoGrid>
      
    </section>
  )
}