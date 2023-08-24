"use client";

import Image from "next/image";
import { UserCard } from "@/lib/types/user";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

export default function SuggestedUserCard({
  userId,
  avatar,
  name,
  username,
}: UserCard) {
  const router = useRouter();

  return (
    <div className="flex flex-col justify-between w-full text-white gap-4">
      <div className="flex items-center gap-2">
        <Image
          src={avatar}
          width={48}
          height={48}
          alt="thread-author"
          className="w-15 h-15 rounded-full"
        />
        <div className="flex flex-col">
          <span className="font-semibold">{name}</span>
          <span className="text-sm text-slate-400">@{username}</span>
        </div>
        <Button
          onClick={() => router.push(`/profile/${userId}`)}
          variant="secondary"
          className="ml-auto bg-transparent text-emerald-400 hover:bg-emerald-400 hover:text-slate-900 border rounded-md border-emerald-400"
        >
          View Profile
        </Button>
      </div>
    </div>
  );
}
