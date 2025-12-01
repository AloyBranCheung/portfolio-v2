import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function neobrutalist() {
  return "border-2 border-black shadow-[4px_4px_0px_0px_black] rounded-base bg-white dark:border-white dark:shadow-[4px_4px_0px_0px_white] dark:bg-black dark:text-white";
}
