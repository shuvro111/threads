import NotificationCard from "@/components/cards/NotificationCard";
import { getNotifications } from "@/lib/actions/thread.actions";
import { currentUser } from "@clerk/nextjs";

export default async function SearchPage() {
  const user = await currentUser();
  //users
  const notifications = await getNotifications(String(user?.id));

  return (
    <div className="w-full">
      <h1 className="text-white text-2xl font-semibold mb-5">Notifications</h1>

      <div className="flex flex-col gap-4">
        {notifications.map((notification) => (
          <NotificationCard
            key={notification.commentId}
            threadId={notification.threadId}
            threadAuthor={notification.threadAuthor}
            commentId={notification.commentId}
            commentAuthor={notification.commentAuthor}
            commentContent={notification.commentContent}
            createdAt={notification.createdAt}
          />
        ))}
      </div>
    </div>
  );
}
