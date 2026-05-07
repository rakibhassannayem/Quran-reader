"use client";

import { useState } from "react";
import IconSidebar from "@/components/IconSidebar";
import SurahSidebar from "@/components/SurahSidebar";
import SearchPanel from "@/components/SearchPanel";
import SettingsPanel from "@/components/SettingsPanel";
import MobileNav from "@/components/MobileNav";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [surahSidebarOpen, setSurahSidebarOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <>
      {/* Desktop icon sidebar */}
      <IconSidebar
        onToggleSurahSidebar={() => setSurahSidebarOpen((v) => !v)}
        onToggleSearch={() => setSearchOpen(true)}
        onToggleSettings={() => setSettingsOpen(true)}
        surahSidebarOpen={surahSidebarOpen}
      />

      {/* Surah list sidebar */}
      <SurahSidebar
        isOpen={surahSidebarOpen}
        onClose={() => setSurahSidebarOpen(false)}
      />

      {/* Main content */}
      <main
        className="min-h-screen transition-all duration-300 pb-16 md:pb-0"
        style={{
          marginLeft: "var(--icon-sidebar-width)",
          paddingLeft: surahSidebarOpen ? "var(--surah-sidebar-width)" : "0",
        }}
      >
        {/* Hide icon sidebar margin on mobile */}
        <style>{`
          @media (max-width: 767px) {
            main { margin-left: 0 !important; padding-left: 0 !important; }
          }
        `}</style>
        {children}
      </main>

      {/* Search overlay */}
      <SearchPanel isOpen={searchOpen} onClose={() => setSearchOpen(false)} />

      {/* Settings panel */}
      <SettingsPanel isOpen={settingsOpen} onClose={() => setSettingsOpen(false)} />

      {/* Mobile bottom nav */}
      <MobileNav
        onToggleSurahSidebar={() => setSurahSidebarOpen((v) => !v)}
        onToggleSearch={() => setSearchOpen(true)}
        onToggleSettings={() => setSettingsOpen(true)}
      />
    </>
  );
}
