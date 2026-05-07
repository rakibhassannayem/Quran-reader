"use client";

import { useState, useEffect } from "react";
import { Menu } from "lucide-react";
import IconSidebar from "@/components/IconSidebar";
import SurahSidebar from "@/components/SurahSidebar";
import SearchPanel from "@/components/SearchPanel";
import SettingsPanel from "@/components/SettingsPanel";
import MobileNav from "@/components/MobileNav";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [isMobile, setIsMobile] = useState(false);
  const [surahSidebarOpen, setSurahSidebarOpen] = useState(true); // Always open on desktop
  const [searchOpen, setSearchOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  useEffect(() => {
    const check = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      // Always keep sidebar open on desktop
      if (!mobile) {
        setSurahSidebarOpen(true);
      }
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const handleToggleSurahSidebar = () => {
    if (isMobile) {
      setSurahSidebarOpen((v) => !v);
    }
    // On desktop, sidebar stays always open — do nothing
  };

  return (
    <>
      {/* Desktop icon sidebar */}
      <IconSidebar
        onToggleSurahSidebar={handleToggleSurahSidebar}
        onToggleSearch={() => setSearchOpen(true)}
        onToggleSettings={() => setSettingsOpen(true)}
      />

      {/* Surah list sidebar */}
      <SurahSidebar
        isOpen={surahSidebarOpen}
        onClose={() => {
          if (isMobile) setSurahSidebarOpen(false);
        }}
      />

      {/* Main content */}
      <main
        className="min-h-screen transition-all duration-300 pb-16 md:pb-0"
        style={{
          marginLeft: "var(--icon-sidebar-width)",
          paddingLeft: "var(--surah-sidebar-width)",
        }}
      >
        {/* Mobile: remove sidebar margins */}
        <style>{`
          @media (max-width: 767px) {
            main { margin-left: 0 !important; padding-left: 0 !important; }
          }
        `}</style>

        {/* Mobile top bar with hamburger */}
        <div
          className="sticky top-0 z-30 flex items-center gap-3 px-4 py-3 md:hidden"
          style={{
            backgroundColor: "var(--background)",
            borderBottom: "1px solid var(--ayah-border)",
          }}
        >
          <button
            onClick={() => setSurahSidebarOpen(true)}
            className="w-9 h-9 flex items-center justify-center rounded-lg transition-colors cursor-pointer"
            style={{
              backgroundColor: "var(--ayah-card-bg)",
              color: "var(--accent-teal)",
            }}
            aria-label="Open surah list"
          >
            <Menu className="w-5 h-5" />
          </button>
          <span
            className="text-base font-bold"
            style={{ color: "var(--accent-teal)" }}
          >
            Quran Reader
          </span>
        </div>

        {children}
      </main>

      {/* Search overlay */}
      <SearchPanel isOpen={searchOpen} onClose={() => setSearchOpen(false)} />

      {/* Settings panel */}
      <SettingsPanel
        isOpen={settingsOpen}
        onClose={() => setSettingsOpen(false)}
      />

      {/* Mobile bottom nav */}
      <MobileNav
        onToggleSurahSidebar={() => setSurahSidebarOpen((v) => !v)}
        onToggleSearch={() => setSearchOpen(true)}
        onToggleSettings={() => setSettingsOpen(true)}
      />
    </>
  );
}
