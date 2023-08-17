import AccountProfile from "@/components/forms/AccountProfile";
import { getUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";

export default async function Onboarding() {
  const user = await currentUser();

  const userInfo = await getUser(String(user?.id));

  const userData = {
    id: String(user?.id),
    username: userInfo?.username || String(user?.username),
    name: userInfo?.name || `${user?.firstName} ${user?.lastName}` || "",
    bio: String(userInfo?.bio),
    avatar: userInfo?.avatar || String(user?.imageUrl),
  };

  return (
    <main className="max-w-2xl text-white mx-auto w-full flex justify-center items-center h-full min-h-screen">
      <div className="w-full">
        <section className="flex flex-col gap-2">
          <h1 className="text-3xl font-semibold">Edit Profile</h1>
          <p className="text-lg text-slate-300">
            Edit your profile information and settings. Finish & continue
            using&nbsp;
            <span className="text-gradient font-bold">Threads</span>
          </p>
        </section>
        <section className="mt-10 bg-slate-900 p-10 rounded-lg">
          <AccountProfile user={userData} btnText="save" />
        </section>
      </div>
    </main>
  );
}
