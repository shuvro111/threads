import { Badge } from "@/components/ui/badge";
import SearchForm from "@/components/forms/Search";
import UserCard from "@/components/cards/UserCard";
import { FiUser, FiUsers } from "react-icons/fi";
import { getSuggestedUsers } from "@/lib/actions/thread.actions";
import { currentUser } from "@clerk/nextjs";

export default async function SearchPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const user = await currentUser();

  const query = searchParams?.q;

  //users
  const users = await getSuggestedUsers(String(user?.id), String(query ?? ""));

  return (
    <div className="w-full">
      <h1 className="text-white text-2xl font-semibold mb-5">Search</h1>
      <SearchForm path="search" />

      <div className="flex flex-col gap-4 mt-12">
        <h1 className="text-white text-xl font-semibold mb-5 flex items-center">
          <FiUser className="mr-2" />
          Users
          <Badge
            variant={"secondary"}
            className="relative -top-2 left-2 p-2 w-6 h-6 flex justify-center items-center bg-emerald-400"
          >
            {users.length}
          </Badge>
        </h1>

        <div className="flex flex-col gap-4">
          {users.map((user) => (
            <UserCard
              key={user.id}
              userId={user.id}
              avatar={String(user.avatar)}
              name={user.name}
              username={user.username}
            />
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-4 mt-12">
        <h1 className="text-white text-xl font-semibold mb-5 flex items-center">
          <FiUsers className="mr-2" />
          Communities
          <Badge
            variant={"secondary"}
            className="relative -top-2 left-2 p-2 w-6 h-6 flex justify-center items-center bg-emerald-400"
          >
            {users.length}
          </Badge>
        </h1>

        <div className="flex flex-col gap-4">
          {users.map((user) => (
            <UserCard
              key={user.id}
              userId={user.id}
              avatar={String(user.avatar)}
              name={user.name}
              username={user.username}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
