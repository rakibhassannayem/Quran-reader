"use client";

import { useState, useEffect, Suspense } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

function SearchInputInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");

  // Listen for external URL clears (e.g. clicking the "Clear Search" generic link)
  useEffect(() => {
    if (!searchParams.has("q")) {
      setSearchQuery("");
    }
  }, [searchParams]);

  useEffect(() => {
    const delay = setTimeout(() => {
      const currentQ = searchParams.get("q") || "";
      if (searchQuery === currentQ) return;

      const params = new URLSearchParams(searchParams.toString());
      if (searchQuery) {
        params.set("q", searchQuery);
      } else {
        params.delete("q");
      }
      router.replace(`/?${params.toString()}`, { scroll: false });
    }, 300);

    return () => clearTimeout(delay);
  }, [searchQuery, router, searchParams]);

  return (
    <div className="max-w-xl mx-auto mb-10 relative">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <Input
          type="text"
          placeholder="Search by name, meaning, or number..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-12 py-6 text-lg rounded-full bg-white shadow-xs border-gray-200 focus-visible:ring-green-600 transition-all focus:shadow-md"
        />
      </div>
    </div>
  );
}

export default function SearchInput() {
  return (
    <Suspense fallback={
      <div className="max-w-xl mx-auto mb-10 relative">
        <div className="relative">
           <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
           <Input className="pl-12 py-6 text-lg rounded-full bg-white" placeholder="Loading search..." disabled />
        </div>
      </div>
    }>
      <SearchInputInner />
    </Suspense>
  );
}
