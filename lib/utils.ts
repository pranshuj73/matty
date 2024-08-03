import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function timeUntilEvent(eventStart: string, eventEnd: string) {
  const startDiff = new Date(eventStart).getTime() - new Date().getTime();
  const endDiff = new Date(eventEnd).getTime() - new Date().getTime();
  if (startDiff < 0 && endDiff > 0) {
    return "Ongoing Right Now";
  }
  const eventEnded = endDiff < 0;
  const differenceInMs = eventEnded ? Math.abs(endDiff): Math.abs(startDiff);
  const differenceInMinutes = Math.floor(differenceInMs / (1000 * 60));
  const differenceInHours = Math.floor(differenceInMs / (1000 * 60 * 60));
  const differenceInDays = Math.floor(differenceInHours / 24);
  
  const displayTime = differenceInDays >= 1 ? differenceInDays : differenceInHours >= 1 ? differenceInHours : differenceInMinutes;
  const displayUnit = differenceInDays >= 1 ? "Day" : differenceInHours >= 1 ? "Hour" : "Minute";
  
  if (eventEnded) {
    return `Ended ${displayTime} ${displayUnit}${displayTime > 1 ? 's' : ''} Ago`;
  }

  return `In ${displayTime} ${displayUnit}${displayTime > 1 ? 's' : ''}`;
}

export function updateTimezone(date: string, offset: number) {
  const padNum = (num: number) => num.toString().padStart(2, '0');

  const clockTime = date.replace(/Z$/, '');
  const hour = padNum(Math.floor(Math.abs(offset) / 60));
  const minute = padNum(Math.abs(offset) % 60);
  const dif = -offset >= 0 ? '+' : '-';
  return `${clockTime}${dif}${hour}:${minute}`;
}

export const getURL = () => {
  let url =
    process?.env?.NEXT_PUBLIC_SITE_URL ?? // Set this to your site URL in production env.
    process?.env?.NEXT_PUBLIC_VERCEL_URL ?? // Automatically set by Vercel.
    'http://localhost:3000/'
  // Make sure to include `https://` when not localhost.
  url = url.startsWith('http') ? url : `https://${url}`
  // Make sure to remove the trailing `/`.
  url = url.endsWith('/') ? url.slice(0, -1) : url
  return url;
}