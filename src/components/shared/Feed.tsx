import { getThreads } from "@/lib/actions/thread.actions";
import ThreadCard from "@/components/cards/ThreadCard";
import { User } from "@/lib/types/user";
import { currentUser } from "@clerk/nextjs";

export default async function Feed() {
  const user = await currentUser();
  if (!user) return null;

  const threads = await getThreads();
  return (
    <div className="flex flex-col gap-12">
      {threads.map((thread) => (
        <ThreadCard
          key={thread.id}
          id={thread.id}
          author={thread.author as User}
          communityId={thread.communityId}
          content={String(thread.content)}
          createdAt={thread.createdAt}
          media={String(thread.media)}
          currentUserId={String(user.id)}
        />
      ))}
    </div>
  );
}
