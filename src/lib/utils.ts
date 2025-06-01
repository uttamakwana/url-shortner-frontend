import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getInitials = (name = "U") => {
  return name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .toUpperCase();
};