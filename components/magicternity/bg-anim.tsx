"use client";
import { useEffect } from "react";
import { delay, motion, stagger, useAnimate } from "framer-motion";
import { cn } from "@/lib/utils";

export const BGEffect = ({ className, }: { className?: string; }) => {
  const [scope, animate] = useAnimate();
  const states = {
    initial: { display: "block", opacity: 1, backdropFilter: "blur(16px)", transition: { type: "spring", damping: 100, stiffness: 100}, },
    animate: { display: "hidden", opacity: 0, backdropFilter: "blur(0px)", transition: { type: "spring", damping: 100, stiffness: 100}, },
  }

  return (
    <motion.div variants={states} initial="initial" animate="animate" className="fixed top-0 left-0 w-full h-screen inset-0 bg-black z-10" />
  );
};
