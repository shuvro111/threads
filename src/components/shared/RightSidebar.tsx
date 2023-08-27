import { getSuggestedUsers } from "@/lib/actions/thread.actions";
import { currentUser } from "@clerk/nextjs";
import SuggestedUserCard from "@/components/cards/SuggestedUserCard";

export default async function RightSidebar() {
  const user = await currentUser();
  const suggestedUsers = await getSuggestedUsers(String(user?.id), "");

  return (
    <section className="hidden w-1/4 xl:flex xl:flex-col gap-4 sticky top-0 right-0 h-screen overflow-auto bg-slate-900 text-white justify-start pt-[75px] px-12">
      <h1 className="text-xl font-semibold">Suggested Accounts</h1>
      <div className="flex flex-col gap-4">
        {suggestedUsers?.map((user) => (
          <SuggestedUserCard
            key={user.id}
            userId={user.id}
            name={user.name}
            username={user.username}
            avatar={String(user.avatar)}
          />
        ))}
      </div>
      <h1 className="text-xl font-semibold mt-8">Similar Minds</h1>
      <p className="text-lg text-slate-400">Coming Soon...</p>
    </section>
  );
}
