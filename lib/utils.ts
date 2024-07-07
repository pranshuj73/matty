import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function timeUntilEvent(event: string) {
  const diff = new Date(event).getTime() - new Date().getTime();
  if (diff < 0) {
      return "Ongoing Right Now";
  }
  const differenceInMs = Math.abs(diff);
  const differenceInMinutes = Math.floor(differenceInMs / (1000 * 60));
  const differenceInHours = Math.floor(differenceInMs / (1000 * 60 * 60));
  const differenceInDays = Math.floor(differenceInHours / 24);
  if (differenceInDays >= 1) {
      return "In " + differenceInDays + ' Days';
  } else if (differenceInHours >= 1) {
      return "In " + differenceInHours + ' Hours';
  } else {
      return "In " + differenceInMinutes + ' Minutes';
  }
}