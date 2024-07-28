"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

import { SendHorizonalIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function PlaceholdersInput({
  placeholders,
  value,
  handleInputChange,
  handleSubmit,
  disabled,
}: {
  placeholders: string[];
  value: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  disabled?: boolean;
}) {
  const [currentPlaceholder, setCurrentPlaceholder] = useState(0);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const startAnimation = () => {
    intervalRef.current = setInterval(() => {
      setCurrentPlaceholder((prev) => (prev + 1) % placeholders.length);
    }, 7000);
  };
  const handleVisibilityChange = () => {
    if (document.visibilityState !== "visible" && intervalRef.current) {
      clearInterval(intervalRef.current); // Clear the interval when the tab is not visible
      intervalRef.current = null;
    } else if (document.visibilityState === "visible") {
      startAnimation(); // Restart the interval when the tab becomes visible
    }
  };

  useEffect(() => {
    startAnimation();
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [placeholders]);

  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <form
      className={cn(
        "w-full relative mx-auto h-10 rounded-md overflow-hidden transition duration-200 border border-input text-sm mt-2",
        value && "bg-accent border-white/20",
        disabled && "opacity-50 pointer-events-none"
      )}
      onSubmit={handleSubmit}
    >
      <input
        onChange={handleInputChange}
        ref={inputRef}
        value={value}
        disabled={disabled}
        type="text"
        className="w-full relative z-50 border-none dark:text-white bg-transparent text-black h-full rounded-full focus:outline-none focus:ring-0 pl-4 sm:pl-5 pr-10"
      />

      <button
        disabled={!value || disabled}
        type="submit"
        className="absolute right-0 top-1/2 z-50 -translate-y-1/2 h-10 w-12 disabled:opacity-50 group transition duration-200 flex items-center justify-center"
      >
        <SendHorizonalIcon size={18} />
      </button>

      <div className={`absolute inset-0 flex items-center rounded-full pointer-events-none ${value ? "opacity-0" : "opacity-100"}`}>
        <AnimatePresence mode="wait">
          {!value && !disabled && (
            <motion.p
              initial={{
                y: 5,
                opacity: 0,
              }}
              key={`current-placeholder-${currentPlaceholder}`}
              animate={{
                y: 0,
                opacity: 1,
              }}
              exit={{
                y: -15,
                opacity: 0,
              }}
              transition={{
                duration: 0.3,
                ease: "linear",
              }}
              className="text-foreground/60 pl-4 sm:pl-5 pr-2 text-left w-[calc(100%-2rem)] truncate"
            >
              {placeholders[currentPlaceholder]}
            </motion.p>
          )}
          {disabled && (<p className="text-foreground/60 pl-2 sm:pl-5 text-left w-[calc(100%-2rem)] truncate">Say something...</p>)}
        </AnimatePresence>
      </div>
    </form>
  );
}
