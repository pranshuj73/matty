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