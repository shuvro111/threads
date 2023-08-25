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
import { cn, getIsLikedByUser } from "@/lib/utils/helper.functions";
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
import {
  deleteThread,
  repostThread,
  toggleLike,
} from "@/lib/actions/thread.actions";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RepostCard({
  id,
  currentUserId,
  parent,
  author,
  content,
  media,
  createdAt,
  isComment,
  likedBy,
  child,
}: ThreadCard) {
  const router = useRouter();

  const [likedByCurrentUser, setLikedByCurrentUser] = useState(
    getIsLikedByUser(likedBy, currentUserId)
  );

  const handleDelete = (id: number) => async () => {
    await deleteThread(id).then(() => {
      router.refresh();
    });
  };

  const handleToggleLike = (id: number) => async () => {
    setLikedByCurrentUser(!likedByCurrentUser);
    await toggleLike(id, currentUserId, likedByCurrentUser)
      .then(() => {
        router.refresh();
      })
      .catch(() => {
        setLikedByCurrentUser(!likedByCurrentUser);
      });
  };

  const handleRepost = (id: number, currentUserId: string) => async () => {
    await repostThread(id, currentUserId).then(() => {
      router.refresh();
    });
  };

  return (
    <div>
      <div className="flex gap-2 items-center mb-8">
        <Image
          src={String(author.avatar)}
          width={48}
          height={48}
          alt="thread-author"
          className="w-12 h-12 object-cover rounded-full"
        />
        <span>
          <Link
            href={`/profile/${parent?.author.id}`}
            className="text-emerald-400"
          >
            {author.name}
          </Link>
          <span className="text-slate-400">
            {" "}
            reposted{" "}
            <Link
              href={`/profile/${parent?.author.id}`}
              className="text-emerald-400"
            >
              {parent?.author.name}
            </Link>
            &apos;s thread
          </span>
        </span>
      </div>
      <div
        className={cn("flex flex-col justify-between w-full text-white", {
          "p-8 bg-slate-900 rounded-lg shadow-md": !isComment,
          "ml-8": isComment,
        })}
      >
        <div className="flex justify-between items-center">
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
          {author.id === currentUserId ? (
            <Link href={`/edit-thread/${id}`}>
              <Button
                variant="secondary"
                className="ml-auto bg-transparent text-emerald-400 hover:bg-emerald-400 hover:text-slate-900 border rounded-md border-emerald-400"
              >
                Edit Thread
              </Button>
            </Link>
          ) : null}
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
          <span
            className={cn(
              "text-xl hover:text-white transition cursor-pointer",
              {
                "text-emerald-400 hover:text-emerald-400": likedByCurrentUser,
              }
            )}
            onClick={handleToggleLike(id)}
          >
            <FiHeart fill={likedByCurrentUser && "rgb(52 211 153)"} />
          </span>
          <Link
            href={`/thread/${id}`}
            className="text-xl hover:text-white transition cursor-pointer"
          >
            <FiMessageCircle />
          </Link>
          {author.id !== currentUserId ? (
            <span className="text-xl hover:text-white transition cursor-pointer">
              <Dialog>
                <DialogTrigger asChild>
                  <FiRepeat />
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Are you sure?</DialogTitle>
                    <DialogDescription>
                      Do you want to repost this thread?
                    </DialogDescription>
                  </DialogHeader>

                  <DialogFooter>
                    <DialogPrimitive.Close asChild>
                      <Button variant="outline">Cancel</Button>
                    </DialogPrimitive.Close>
                    <DialogPrimitive.Close asChild>
                      <Button
                        variant="brand"
                        type="submit"
                        onClick={handleRepost(id, currentUserId)}
                      >
                        Repost
                      </Button>
                    </DialogPrimitive.Close>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </span>
          ) : null}
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
                    <DialogPrimitive.Close asChild>
                      <Button
                        variant="destructive"
                        type="submit"
                        onClick={handleDelete(id)}
                      >
                        Delete
                      </Button>
                    </DialogPrimitive.Close>
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
    </div>
  );
}
