"use client";

import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import { BookOpen } from "lucide-react";

const Navbar = () => {
  const { open, isMobile } = useSidebar();

  return (
    <div className="bg-[#fdf9ee]">
      <div className="container mx-auto px-3 py-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <BookOpen className="w-8 h-8 text-green-800" />
          <h2 className="font-bold text-2xl text-green-800 tracking-tight">Quran Reader</h2>
        </div>
        <div
          className="transition-all duration-200 ease-linear"
          style={{
            marginRight: open && !isMobile ? "var(--sidebar-width)" : "0px",
          }}
        >
          <SidebarTrigger className="size-10! [&_svg]:size-8! text-green-800 hover:bg-green-100/50 hover:text-green-900" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
