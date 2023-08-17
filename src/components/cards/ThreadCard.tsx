"use client";

import { ThreadCard } from "@/lib/types/thread";
import {
  FiHeart,
  FiMessageCircle,
  FiRepeat,
  FiSend,
  FiTrash,
} from "react-icons/fi";

import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils/helper.functions";
import * as DialogPrimitive from "@radix-ui/react-dialog";

import {
  DialogFooter,
  DialogHeader,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";

export default function ThreadCard({
  id,
  currentUserId,
  author,
  content,
  media,
  createdAt,
  isComment,
  child,
}: ThreadCard) {
  return (
    <div
      className={cn("flex flex-col justify-between w-full text-white", {
        "p-8 bg-slate-900 rounded-lg shadow-md": !isComment,
        "ml-8": isComment,
      })}
    >
      <div className="flex items-center gap-2">
        <Image
          src={author.avatar}
          width={48}
          height={48}
          alt="thread-author"
          className="w-15 h-15 rounded-full"
        />
        <div className="flex flex-col">
          <span className="font-semibold">{author.name}</span>
          <span className="text-sm text-slate-400">@{author.username}</span>
        </div>
      </div>
      <article className="flex flex-col gap-8 text-slate-300 text-lg font-light leading-relaxed  border-l border-slate-700 py-2 px-8 ml-6 my-6">
        {content}
        {media !== "null" || "" ? (
          <>
            <Image
              src={media}
              alt={`Thread media by - ${author.name}`}
              width={800}
              height={800}
              objectFit="contain"
              className="w-full h-full rounded-lg"
            />
          </>
        ) : null}
      </article>
      <div className="flex flex-row items-center mt-4 px-4 gap-4 text-slate-400">
        <span className="text-xl hover:text-white transition cursor-pointer">
          <FiHeart />
        </span>
        <Link
          href={`/thread/${id}`}
          className="text-xl hover:text-white transition cursor-pointer"
        >
          <FiMessageCircle />
        </Link>
        <span className="text-xl hover:text-white transition cursor-pointer">
          <FiRepeat />
        </span>
        <span className="text-xl hover:text-white transition cursor-pointer">
          <FiSend />
        </span>
        {author.id === currentUserId ? (
          <span className="text-xl hover:text-white transition cursor-pointer">
            <Dialog>
              <DialogTrigger asChild>
                <FiTrash />
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Are you sure?</DialogTitle>
                  <DialogDescription>
                    You are about to delete this thread. This action cannot be
                    reversed.
                  </DialogDescription>
                </DialogHeader>

                <DialogFooter>
                  <DialogPrimitive.Close asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogPrimitive.Close>
                  <Button variant="destructive" type="submit">
                    Delete
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </span>
        ) : null}
        {isComment && child && child.length > 0 ? (
          <>
            <Link
              href={`/thread/${id}`}
              className="hover:text-emerald-400 transition cursor-pointer"
            >
              {child.length} replies
            </Link>
          </>
        ) : null}
      </div>
    </div>
  );
}
