import CreateThread from "@/components/forms/CreateThread";
import { getUser } from "@/lib/actions/user.actions";
import { User } from "@/lib/types/user";
import { currentUser } from "@clerk/nextjs";
import Image from "next/image";

export default async function Page() {
  const user = await currentUser();
  if (!user) return;

  const userInfo = await getUser(String(user?.id));
  if (!userInfo) return;

  return (
    <div className="w-full">
      <h1 className="text-white text-2xl font-semibold mb-5">
        Create A Thread
      </h1>
      <div className=" flex flex-col justify-between w-full p-8 bg-slate-900 rounded-lg shadow-md text-white">
        <CreateThread user={userInfo as User} btnText="Create Thread" />
      </div>
    </div>
  );
}
