"use client";

import { useRouter } from "next/navigation";

import { Input } from "@/components/ui/input";

import { FiSearch } from "react-icons/fi";

import { textInputStyles } from "@/lib/design/styles";
import { cn } from "@/lib/utils/helper.functions";
import { useEffect, useState } from "react";

export default function SearchForm({ path }: { path: string }) {
  // get current path
  const router = useRouter();
  const [query, setQuery] = useState("");

  // query after 0.3s of no input
  useEffect(() => {
    const searchDebounce = setTimeout(() => {
      if (query) {
        router.push(`/${path}?q=` + query);
      } else {
        router.push(`/${path}`);
      }
    }, 300);

    return () => clearTimeout(searchDebounce);
  }, [query, path, router]);

  return (
    <div className=" flex justify-between items-center w-full py-2 px-6 bg-slate-900 rounded-lg shadow-md text-slate-300">
      <Input
        type="text"
        placeholder={path === "/search" ? "Search Users" : "Search Communities"}
        className={cn(
          textInputStyles,
          "no-focus focus-visible:ring-0 focus-visible:ring-offset-0 rounded-full p-0 bg-transparent text:lg"
        )}
        onChange={(e) => setQuery(e.target.value)}
      />

      <FiSearch size={20} />
    </div>
  );
}
