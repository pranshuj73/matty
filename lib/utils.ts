import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function timeUntilEvent(event: string) {
  const diff = new Date(event).getTime() - new Date().getTime();
  const differenceInMs = Math.abs(diff);
  const differenceInHours = Math.floor(differenceInMs / (1000 * 60 * 60));
  const differenceInDays = Math.floor(differenceInHours / 24);
  if (differenceInDays >= 1) {
      return differenceInDays + 'd';
  } else {
      return differenceInHours + 'h';
  }

}