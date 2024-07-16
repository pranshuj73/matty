import {
  BellDotIcon,
  CalendarIcon,
  GoalIcon,
  LanguagesIcon,
  RefreshCwIcon,
} from "lucide-react";
 
import { BentoCard, BentoGrid } from "@/components/magicui/bento-grid";
import Notifications from "@/components/magicui/notifications";

const features = [
  {
    Icon: CalendarIcon,
    name: "Intuitive Scheduling",
    description: "Chat with Matty to quickly add, modify, or delete events in your calendar.",
    background: <img className="absolute -right-20 lg:-right-10 top-5 lg:top-24 opacity-60" src="/landing/intuitive-scheduling.svg" alt="Image showing Matty's Interface" />,
    className: "md:col-start-1 md:col-end-4 lg:row-start-1 lg:row-end-4 lg:col-start-2 lg:col-end-3",
},
{
    Icon: GoalIcon,
    name: "Goal Tracking",
    description: "Set and monitor your personal and professional goals, with progress updates and suggestions to stay on track.",
    background: <img className="absolute -top-20 right-0 lg:top-5 opacity-60 max-h-[300px]" src="/landing/goal-tracking.svg" alt="Goal Tracking Illustration" />,
    className: "md:col-start-1 md:col-end-3 lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-3",
},
{
    Icon: RefreshCwIcon,
    name: "Seamless Integration",
    description: "Sync with Google Calendar and other apps to ensure all your events are in one place.",
    background: <img className="absolute -right-20 top-1/2 -translate-y-1/2 opacity-60" src="/landing/seamless-integration.svg" alt="Seamless Integration Illustration"/>,
    className: "md:col-start-3 md:col-end-4 lg:col-start-1 lg:col-end-2 lg:row-start-3 lg:row-end-4",
},
{
    Icon: LanguagesIcon,
    name: "Natural Language Processing",
    description: "Communicate with Matty in natural language, making interactions simple and human-like.",
    background: <img className="absolute top-1/2 -translate-y-3/4 lg:-translate-y-1/2 left-1/2 -translate-x-1/2 opacity-60 scale-75" src="/landing/natural-language-processing.svg" alt="Natural Language Processing Illustration" />,
    className: "md:col-start-1 md:col-end-2 lg:col-start-3 lg:col-end-3 lg:row-start-1 lg:row-end-2",
},
{
    Icon: BellDotIcon,
    name: "Customizable Notifications",
    description: "Set personalized reminders and notifications to keep you informed and prepared.",
    background: (<Notifications className="absolute top-0 opacity-60" />),
    className: "md:col-start-2 md:col-end-4 lg:col-start-3 lg:col-end-3 lg:row-start-2 lg:row-end-4",
},
];

export default function Features() {
  return (
    <section className="max-w-screen-lg flex flex-col items-center pb-12">
      <h2 className="text-4xl md:text-5xl font-semibold text-center">Your Calendar Experience Redefined.</h2>

      <BentoGrid className="md:grid-rows-2 lg:grid-rows-3 mt-16">
        {features.map((feature) => (
          <BentoCard key={feature.name} {...feature} />
        ))}
      </BentoGrid>
      
    </section>
  )
}