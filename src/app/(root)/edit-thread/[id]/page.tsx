import CreateThread from "@/components/forms/CreateThread";
import { getUser } from "@/lib/actions/user.actions";
import { User } from "@/lib/types/user";
import { currentUser } from "@clerk/nextjs";
import { getThreadById } from "@/lib/actions/thread.actions";
import { Thread } from "@prisma/client";
export default async function Page({ params }: { params: { id: number } }) {
  const user = await currentUser();
  if (!user) return;

  const userInfo = await getUser(String(user?.id));
  if (!userInfo) return;

  const thread = await getThreadById(Number(params.id));
  if (!thread) return;
  const currentThread = {
    id: thread.id,
    author: thread.author.id,
    content: String(thread.content),
    media: thread.media,
    communityId: thread.communityId,
  };

  return (
    <div className="w-full">
      <h1 className="text-white text-2xl font-semibold mb-5">Edit Thread</h1>
      <div className=" flex flex-col justify-between w-full p-8 bg-slate-900 rounded-lg shadow-md text-white">
        <CreateThread
          user={userInfo as User}
          btnText="Create Thread"
          currentThread={currentThread}
        />
      </div>
    </div>
  );
}
