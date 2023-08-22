import Feed from "@/components/shared/Feed";
import { getUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function Home() {
  const user = await currentUser();

  const userInfo = await getUser(String(user?.id));
  if (!userInfo?.onboardingStatus) {
    redirect("/onboarding");
  }
  return (
    <div>
      <h1 className="text-white text-2xl font-semibold mb-5">News Feed</h1>
      <Feed />
    </div>
  );
}
