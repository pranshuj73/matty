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
  const differenceInMs = Math.abs(startDiff);
  const differenceInMinutes = Math.floor(differenceInMs / (1000 * 60));
  const differenceInHours = Math.floor(differenceInMs / (1000 * 60 * 60));
  const differenceInDays = Math.floor(differenceInHours / 24);
  if (differenceInDays >= 1) {
      return !eventEnded ? `In ${differenceInDays} Days` : `Ended ${differenceInDays} Days Ago`;
  } else if (differenceInHours >= 1) {
      return !eventEnded ? `In ${differenceInHours} Hours` : `Ended ${differenceInHours} Hours Ago`;
  } else {
      return !eventEnded ? `In ${differenceInMinutes} Minutes` : `Ended ${differenceInMinutes} Minutes Ago`;
  }
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