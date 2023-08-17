import ThreadCard from "@/components/cards/ThreadCard";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getThreadsByUserId } from "@/lib/actions/thread.actions";
import { User } from "@/lib/types/user";
import { currentUser } from "@clerk/nextjs";
import { FiEdit3, FiGrid } from "react-icons/fi";
import Image from "next/image";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function ProfilePage() {
  const user = await currentUser();

  const { threads, comments } = await getThreadsByUserId(String(user?.id));

  return (
    <div className="w-full">
      <div className="flex justify-between">
        <div className="flex flex-col mb-8">
          <Image
            src={String(threads[0].author.avatar)}
            width={100}
            height={100}
            alt={String(threads[0].author.name)}
            className="w-28 h-w-28 object-cover rounded-full"
          />
          <h1 className="text-white text-2xl font-semibold mt-4 leading-none">
            {String(threads[0].author.name)}
          </h1>
          <span className="text-slate-400">@{threads[0].author.username}</span>
          <h4 className="text-slate-300 text-lg font-medium border-b border-slate-800 mt-6 mb-4 pb-2 leading-none">
            Bio
          </h4>
          <p className="text-slate-400">{threads[0].author.bio}</p>
        </div>

        <Link href="/profile/edit">
          <Button
            variant="secondary"
            className="ml-auto bg-transparent text-emerald-400 hover:bg-emerald-400 hover:text-slate-900 border rounded-md border-emerald-400"
          >
            <FiEdit3 className="mr-2" /> Edit Profile
          </Button>
        </Link>
      </div>
      <h1 className="text-white text-2xl font-semibold mb-5">Profile</h1>
      <Tabs defaultValue="threads">
        <TabsList className="w-full bg-slate-900/70 rounded-lg shadow-md p-2 h-16 gap-2">
          <TabsTrigger
            value="threads"
            className="flex-1 bg-slate-900 data-[state=active]:bg-slate-800/50 p-0 h-full rounded-md"
          >
            <h1 className="flex items-center gap-2 text-white">
              <span>
                <FiGrid />
              </span>
              Threads
              <Badge className="relative -top-2 p-2 w-5 h-5 flex justify-center items-center bg-emerald-400 text-slate-800">
                {threads.length}
              </Badge>
            </h1>
          </TabsTrigger>
          <TabsTrigger
            value="comments"
            className="flex-1 bg-slate-900 data-[state=active]:bg-slate-800/50 p-0 h-full rounded-md"
          >
            <h1 className="flex items-center gap-2 text-white">
              <span>
                <FiGrid />
              </span>
              Comments
              <Badge className="relative -top-2 p-2 w-5 h-5 flex justify-center items-center bg-emerald-400 text-slate-800">
                {comments.length}
              </Badge>
            </h1>
          </TabsTrigger>
          <TabsTrigger
            value="tagged"
            className="flex-1 bg-slate-900 data-[state=active]:bg-slate-800/50 p-0 h-full rounded-md"
          >
            <h1 className="flex items-center gap-2 text-white">
              <span>
                <FiGrid />
              </span>
              Tagged
            </h1>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="threads" className="mt-12">
          <>
            {threads.map((thread) => (
              <ThreadCard
                key={thread.id}
                id={thread.id}
                currentUserId={String(user?.id)}
                author={thread.author as User}
                communityId={thread.communityId}
                content={String(thread.content)}
                createdAt={thread.createdAt}
                media={String(thread.media)}
                userInfo={thread.author as User}
                child={thread.children}
              />
            ))}
          </>
        </TabsContent>
        <TabsContent value="comments" className="flex flex-col gap-12  mt-12">
          {comments.map((comment) => (
            <div
              className="p-8 pl-0 bg-slate-900 rounded-lg shadow-md"
              key={comment.id}
            >
              <ThreadCard
                id={comment.id}
                currentUserId={String(user?.id)}
                author={comment.author as User}
                communityId={comment.communityId}
                content={String(comment.content)}
                createdAt={comment.createdAt}
                media={String(comment.media)}
                userInfo={comment.author as User}
                child={comment.children}
                isComment
              />
            </div>
          ))}
        </TabsContent>
        <TabsContent value="tagged">
          <h1 className="text-white text-2xl font-semibold mb-5">Tagged</h1>
        </TabsContent>
      </Tabs>
    </div>
  );
}
