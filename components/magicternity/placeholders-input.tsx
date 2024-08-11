"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

import { PaperclipIcon, SendHorizonalIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

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

export function PlaceholdersInput({
  value,
  handleInputChange,
  handleSubmit,
  disabled,
  fileInputRef,
  files,
  setFiles
}: {
  value: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  disabled: boolean;
  fileInputRef: React.RefObject<HTMLInputElement>;
  files: FileList | undefined;
  setFiles: React.Dispatch<React.SetStateAction<FileList | undefined>>;
}) {
  const [currentPlaceholder, setCurrentPlaceholder] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const startAnimation = () => {
    intervalRef.current = setInterval(() => {
      setCurrentPlaceholder((prev) => (prev + 1) % placeholders.length);
    }, 5000);
  };
  const handleVisibilityChange = () => {
    if (document.visibilityState !== "visible" && intervalRef.current) {
      clearInterval(intervalRef.current); // Clear the interval when the tab is not visible
      intervalRef.current = null;
    } else if (document.visibilityState === "visible") {
      startAnimation(); // Restart the interval when the tab becomes visible
    }
  };

  const filterAndSetFiles = (files: FileList) => {
    const dataTransfer = new DataTransfer();
    // max file size 3 MB
    const images = Array.from(files).slice(0, 5).filter(file => file.type.startsWith("image/") && file.size < 3 * 1024 * 1024);
    images.forEach(file => dataTransfer.items.add(file));
    setFiles(dataTransfer.files);
  };

  useEffect(() => {
    document.addEventListener('paste', e => {
      if (e.clipboardData && e.clipboardData.files.length) {
        filterAndSetFiles(e.clipboardData.files);
      }
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && !disabled) {
        inputRef.current?.focus();
        if (intervalRef.current) { clearInterval(intervalRef.current); intervalRef.current = null; }

      }
      if (e.key === "Escape" && !disabled) {
        inputRef.current?.blur();
        startAnimation();
      }
    });

    return () => {
      document.removeEventListener("keydown", () => {});
    };
  }, []);

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
        type="file"
        className="absolute w-0 h-0 hidden"
        onChange={event => {
          if (event.target.files) {
            filterAndSetFiles(event.target.files);
          }
        }}
        multiple
        accept="image/*"
        ref={fileInputRef}
      />
      <input
        onChange={handleInputChange}
        ref={inputRef}
        value={value}
        disabled={disabled}
        type="text"
        className="w-full relative z-30 border-none dark:text-white bg-transparent text-black h-full rounded-md outline-none focus:outline-none ring-0 focus:ring-0 focus:bg-accent focus:border-white/20 transition-all duration-300 ease-in-out pl-11 pr-10"
      />
      {/* attachment button */}
      <Tooltip delayDuration={1500}>
        <TooltipTrigger asChild>
          <button
            disabled={disabled}
            onClick={() => fileInputRef.current?.click()}
            type="button"
            className="absolute left-0 top-1/2 z-30 -translate-y-1/2 h-10 w-12 opacity-50 group transition duration-200 flex items-center justify-center"
          >
            <PaperclipIcon size={18} />
          </button>
        </TooltipTrigger>
        <TooltipContent align="center">Attach up to 5 images (max 3MB each) as additional context.</TooltipContent>
      </Tooltip>
      {/* submit button */}
      <button
        disabled={!value || disabled}
        type="submit"
        className="absolute right-0 top-1/2 z-30 -translate-y-1/2 h-10 w-12 disabled:opacity-50 group transition duration-200 flex items-center justify-center"
      >
        <SendHorizonalIcon size={18} />
      </button>

      <div className={`absolute inset-0 flex items-center rounded-full pointer-events-none ${value ? "opacity-0" : "opacity-100"}`}>
        <AnimatePresence mode="wait" initial={false}>
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
              className="text-foreground/60 pl-11 pr-10 text-left w-full truncate"
            >
              {placeholders[currentPlaceholder]}
            </motion.p>
          )}
          {disabled && (<p className="text-foreground/60 pl-11 pr-10 text-left w-full truncate">Say something...</p>)}
        </AnimatePresence>
      </div>
    </form>
  );
}
