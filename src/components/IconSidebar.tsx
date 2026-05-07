"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  Search,
  Settings,
  Home,
} from "lucide-react";

type IconSidebarProps = {
  onToggleSurahSidebar: () => void;
  onToggleSearch: () => void;
  onToggleSettings: () => void;
  surahSidebarOpen: boolean;
};

const NAV_ITEMS = [
  { id: "home", icon: Home, label: "Home", href: "/" },
  { id: "surahs", icon: BookOpen, label: "Surahs" },
  { id: "search", icon: Search, label: "Search" },
  { id: "settings", icon: Settings, label: "Settings" },
];

export default function IconSidebar({
  onToggleSurahSidebar,
  onToggleSearch,
  onToggleSettings,
  surahSidebarOpen,
}: IconSidebarProps) {
  const pathname = usePathname();
  const isSurahPage = pathname.startsWith("/surah");

  const handleClick = (id: string) => {
    switch (id) {
      case "surahs":
        onToggleSurahSidebar();
        break;
      case "search":
        onToggleSearch();
        break;
      case "settings":
        onToggleSettings();
        break;
    }
  };

  return (
    <aside
      className="hidden md:flex flex-col items-center py-6 gap-1 fixed left-0 top-0 h-full z-50"
      style={{
        width: "var(--icon-sidebar-width)",
        backgroundColor: "var(--icon-sidebar-bg)",
        borderRight: "1px solid var(--ayah-border)",
      }}
    >
      {/* Logo */}
      <Link
        href="/"
        className="flex items-center justify-center w-10 h-10 mb-5 rounded-xl transition-colors bg-primary"
        title="Quran Reader"
      >
        <BookOpen className="text-white" />
      </Link>

      {/* Nav icons */}
      <nav className="flex flex-col items-center gap-1 flex-1">
        {NAV_ITEMS.map((item) => {
          const isActive =
            (item.id === "home" && pathname === "/") ||
            (item.id === "surahs" && (surahSidebarOpen || isSurahPage)) ||
            false;

          const Icon = item.icon;

          if (item.href) {
            return (
              <Link
                key={item.id}
                href={item.href}
                className="flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-200 group relative"
                style={{
                  backgroundColor: isActive ? "var(--accent-teal-dim)" : "transparent",
                  color: isActive ? "var(--accent-teal)" : "var(--text-muted)",
                }}
                title={item.label}
              >
                <Icon className="w-5 h-5 transition-colors group-hover:text-[var(--accent-teal)]" />
                {isActive && (
                  <span
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-r-full"
                    style={{ backgroundColor: "var(--accent-teal)" }}
                  />
                )}
              </Link>
            );
          }

          return (
            <button
              key={item.id}
              onClick={() => handleClick(item.id)}
              className="flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-200 group relative cursor-pointer"
              style={{
                backgroundColor:
                  (item.id === "surahs" && surahSidebarOpen)
                    ? "var(--accent-teal-dim)"
                    : "transparent",
                color:
                  (item.id === "surahs" && surahSidebarOpen)
                    ? "var(--accent-teal)"
                    : "var(--text-muted)",
              }}
              title={item.label}
            >
              <Icon className="w-5 h-5 transition-colors group-hover:text-[var(--accent-teal)]" />
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
