import {
  getThreadById,
  getThreadWithInfiniteNestedChildren,
} from "@/lib/actions/thread.actions";
import ThreadCard from "@/components/cards/ThreadCard";
import Comment from "@/components/forms/Comment";
import { User } from "@/lib/types/user";
import { getUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";

export default async function Page({ params }: { params: { id: string } }) {
  const user = await currentUser();
  const thread = await getThreadById(Number(params.id));
  if (!thread) return;

  console.log(thread);

  // await getThreadWithInfiniteNestedChildren(2).then((res) => {
  //   // console.log(res);
  // });

  const userInfo = await getUser(String(user?.id));
  if (!userInfo) return;
  return (
    <div className="w-full flex flex-col gap-12">
      <ThreadCard
        key={thread.id}
        id={thread.id}
        author={thread.author as User}
        communityId={thread.communityId}
        content={String(thread.content)}
        createdAt={thread.createdAt}
        media={String(thread.media)}
        userInfo={userInfo as User}
      />
      <Comment
        threadId={thread.id}
        userId={userInfo.id}
        userAvatar={String(userInfo.avatar)}
        btnText="Reply"
      />

      <div className="flex flex-col gap-12">
        {thread.children.map((comment) => (
          <ThreadCard
            key={comment.id}
            id={comment.id}
            author={comment.author as User}
            communityId={comment.communityId}
            content={String(comment.content)}
            createdAt={comment.createdAt}
            media={String(comment.media)}
            userInfo={userInfo as User}
            isComment={true}
            child={comment.children}
          />
        ))}
      </div>
    </div>
  );
}
