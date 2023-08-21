import { getThreads } from "@/lib/actions/thread.actions";
import ThreadCard from "@/components/cards/ThreadCard";
import RepostCard from "@/components/cards/RepostCard";
import { User } from "@/lib/types/user";
import { currentUser } from "@clerk/nextjs";
import { ThreadCard as ThreadCardType } from "@/lib/types/thread";

export default async function Feed() {
  const user = await currentUser();
  if (!user) return null;

  const threads = await getThreads();

  return (
    <div className="flex flex-col gap-12">
      {threads.map((thread) => {
        const parent: any = {};
        if (thread.isRepost && thread.parent) {
          parent.id = thread.parent.id;
          parent.author = thread.parent.author;
          parent.likedBy = thread.parent.likedBy;
          parent.communityId = thread.parent.communityId;
          parent.content = thread.parent.content;
          parent.media = thread.parent.media;
          parent.createdAt = thread.parent.createdAt;
          parent.currentUserId = user.id;
        }

        return thread.isRepost ? (
          <RepostCard
            key={thread.id}
            id={thread.id}
            author={thread.author as User}
            likedBy={thread.likedBy as User[]}
            communityId={thread.communityId}
            content={String(thread.content)}
            createdAt={thread.createdAt}
            media={String(thread.media)}
            currentUserId={String(user.id)}
            parent={parent}
          />
        ) : (
          <ThreadCard
            key={thread.id}
            id={thread.id}
            author={thread.author as User}
            likedBy={thread.likedBy as User[]}
            communityId={thread.communityId}
            content={String(thread.content)}
            createdAt={thread.createdAt}
            media={String(thread.media)}
            currentUserId={String(user.id)}
          />
        );
      })}
    </div>
  );
}
