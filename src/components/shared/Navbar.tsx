"use client";

import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import { BookOpen } from "lucide-react";
import { useEffect, useState } from "react";

const Navbar = () => {
  const { open, isMobile } = useSidebar();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`transition-all duration-300 ${
        scrolled ? "bg-[#fdf9ee]/70 backdrop-blur-md border-b border-green-900/10 py-1" : "bg-[#fdf9ee]"
      }`}
    >
      <div className="container mx-auto p-3 flex items-center justify-between">
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
