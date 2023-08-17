import { currentUser } from "@clerk/nextjs";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isBase64Image(imageData: string) {
  //check if string is base64 encoded image with regex
  return imageData.match(/^data:image\/(png|jpg|jpeg|gif|webp);base64,/);
}
