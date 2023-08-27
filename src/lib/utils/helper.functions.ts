import { currentUser } from "@clerk/nextjs";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { User } from "../types/user";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isBase64Image(imageData: string) {
  //check if string is base64 encoded image with regex
  return imageData.match(/^data:image\/(png|jpg|jpeg|gif|webp);base64,/);
}

export function getIsLikedByUser(likedBy: User[], userId: string) {
  return likedBy.some((like) => like.id === userId);
}
