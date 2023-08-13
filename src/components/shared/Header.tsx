"use client";
import Link from "next/link";
import Image from "next/image";
import { OrganizationSwitcher, SignOutButton, SignedIn } from "@clerk/nextjs";

import { FiLogOut } from "react-icons/fi";
import { useRouter } from "next/navigation";

export default function Header() {
  const { push } = useRouter();
  return (
    <header>
      <nav className="bg-slate-900 absolute top-0 left-0 z-10 w-full py-4 px-8 flex justify-between items-center">
        {/* Logo */}
        <Link className="flex items-center gap-2" href="/">
          <Image src="/assets/logo.svg" width={40} height={40} alt="logo" />
          <h1 className="text-2xl font-semibold text-white">Threads</h1>
        </Link>
        {/* Right Menu */}
        <SignedIn>
          <div className="flex md:hidden items-center gap-4 h-full">
            {/* Signout Button */}
            <SignOutButton signOutCallback={() => push("/sign-in")}>
              <FiLogOut
                size={20}
                className="text-white hover:text-emerald-400 transition-colors duration-200 cursor-pointer"
              />
            </SignOutButton>
            {/* Organization Switcher */}
            <OrganizationSwitcher
              appearance={{
                elements: {
                  organizationSwitcherTrigger: "mt-2 w-8 focus:shadow-none",
                  avatarImage: "rounded-full",
                },
              }}
            />
          </div>
        </SignedIn>
      </nav>
    </header>
  );
}
