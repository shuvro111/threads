"use client";

import Image from "next/image";
import { UserCard } from "@/lib/types/user";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { notification } from "@/lib/types/comment";
import Link from "next/link";

export default function UserCard({
  threadId,
  threadAuthor,
  commentId,
  commentAuthor,
  commentContent,
  createdAt,
}: notification) {
  const router = useRouter();

  return (
    <div className="flex flex-col justify-between w-full text-white p-8 bg-slate-900 rounded-lg shadow-md gap-6">
      <div className="flex items-center gap-2">
        <Image
          src={commentAuthor.avatar}
          width={48}
          height={48}
          alt="thread-author"
          className="w-15 h-15 rounded-full"
        />
        <div className="flex flex-col">
          <span className="">
            <Link
              href={`/profile/${commentAuthor.id}`}
              className="font-semibold text-emerald-400"
            >
              {commentAuthor.name}{" "}
            </Link>
            commented on your thread on{" "}
            {createdAt.toDateString().replace(" ", ", ")}
          </span>
          <span className="text-slate-400 text-ellipsis">{commentContent}</span>
        </div>
        <Button
          onClick={() => router.push(`/thread/${commentId}`)}
          variant="secondary"
          className="ml-auto bg-transparent text-emerald-400 hover:bg-emerald-400 hover:text-slate-900 border rounded-md border-emerald-400"
        >
          View
        </Button>
      </div>
    </div>
  );
}
