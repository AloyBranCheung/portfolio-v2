import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function neobrutalist(offset: number = 4) {
  return `border-2 border-black shadow-[${offset}px_${offset}px_0px_0px_black] rounded-base`;
}
