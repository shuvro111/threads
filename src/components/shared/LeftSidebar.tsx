"use client";
import { sidebarLinks } from "@/lib/design/sidebar-links";
import { cn } from "@/lib/utils/helper.functions";
import { SignOutButton, SignedIn } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FiLogOut } from "react-icons/fi";

export default function LeftSidebar() {
  const pathname = usePathname();
  const defaultLinkClass =
    "flex items-center gap-4  hover:text-emerald-400 hover:md:bg-[#161f39] py-3 px-6 rounded-md transition-all duration-200";
  const { push } = useRouter();

  return (
    <section className="custom-scrollbar hidden md:flex flex-col justify-between  gap-4  overflow-auto sticky left-0 top-0 bg-slate-900 w-fit h-full min-h-screen pt-24 pb-8 md:px-4 text-white">
      <div className="flex flex-col gap-2">
        {sidebarLinks.map((link) => {
          return (
            <Link
              href={link.route}
              key={link.label}
              className={cn(
                defaultLinkClass,
                pathname === link.route && "text-emerald-400 md:bg-[#161f39]"
              )}
            >
              <span className="text-xl">{link.icon}</span>
              <span className="hidden md:block">{link.label}</span>
            </Link>
          );
        })}
      </div>
      <SignedIn>
        <SignOutButton signOutCallback={() => push("/sign-in")}>
          <div className={cn(defaultLinkClass, "cursor-pointer")}>
            <FiLogOut className="text-xl" />
            <span className="hidden md:block">Logout</span>
          </div>
        </SignOutButton>
      </SignedIn>
    </section>
  );
}
