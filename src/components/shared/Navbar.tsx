"use client";

import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";

const Navbar = () => {
  const { open, isMobile } = useSidebar();

  return (
    <div className="bg-[#fdf9ee]">
      <div className="container mx-auto px-3 py-6 flex items-center justify-between">
        <h2 className="font-bold text-xl text-green-800">Quran Reader</h2>
        <div
          className="transition-all duration-200 ease-linear"
          style={{
            marginRight: open && !isMobile ? "var(--sidebar-width)" : "0px",
          }}
        >
          <SidebarTrigger />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
