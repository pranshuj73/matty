import { ReactNode } from "react";
import { ArrowRightIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const BentoGrid = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "grid w-full auto-rows-[22rem] grid-cols-3 gap-4",
        className,
      )}
    >
      {children}
    </div>
  );
};

const BentoCard = ({ name, className, background, Icon, description }: { name: string; className: string; background: ReactNode; Icon: any; description: string; }) => (
  <div
    key={name}
    className={cn(
      "group col-span-3 flex flex-col justify-end overflow-hidden rounded-xl min-h-[200px]",
      // light styles
      "bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
      // dark styles
      "transform-gpu dark:bg-black dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]",
      className,
    )}
  >
    <div>{background}</div>
    <div className="relative pointer-events-none z-10 transform-gpu -mb-8 p-6 transition-all duration-300 group-hover:-translate-y-10">
      <Icon className="h-6 w-6 mb-1 origin-left transform-gpu text-neutral-700 transition-all duration-300 ease-in-out group-hover:scale-75" />
      <h3 className="text-lg font-semibold text-neutral-700 dark:text-neutral-300">
        {name}
      </h3>
      <p className="h-10 pointer-events-none transform-gpu opacity-0 transition-all duration-300 group-hover:opacity-100 text-sm text-neutral-400">{description}</p>
    </div>
    <div className="pointer-events-none absolute h-1/2 w-full bottom-0 left-0 bg-gradient-to-b from-transparent to-black to-80%" />
    <div className="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:bg-black/[.03] group-hover:dark:bg-neutral-800/10" />
  </div>
);

export { BentoCard, BentoGrid };
