"use client";

import { sidebarLinks } from "@/lib/design/sidebar-links";
import { cn } from "@/lib/utils/helper.functions";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function BottomNavigation() {
  const pathname = usePathname();
  const defaultLinkClass =
    "flex sm:flex-col items-center gap-x-4 gap-y-2 hover:text-emerald-400 hover:md:bg-[#161f39] rounded-md transition-all duration-200";
  return (
    <div className="fixed bottom-0 w-full p-4">
      <div className="w-full flex justify-between items-center bg-slate-900 text-white py-6 px-12 rounded-xl md:hidden">
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
              <span className="hidden sm:block">{link.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
