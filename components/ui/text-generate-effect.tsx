"use client";
import { useEffect } from "react";
import { motion, stagger, useAnimate } from "framer-motion";
import { cn } from "@/lib/utils";

export const TextGenerateEffect = ({ words, className, }: { words: string; className?: string; }) => {
  const [scope, animate] = useAnimate();
  let wordsArray = words.split(" ");
  useEffect(() => {
    animate(
      "span",
      { filter: "blur(0px)", opacity: 1, },
      { duration: 1, delay: stagger(0.15), }
    );
  }, [scope.current]);

  return (
    <motion.div ref={scope}>
      {wordsArray.map((word, idx) => {
        return (
          <motion.span
            key={word + idx}
            className={cn("text-current opacity-0 blur-lg", className)}
          >
            {word}{" "}
          </motion.span>
        );
      })}
    </motion.div>
  );
};
