"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, Search, Settings, Home } from "lucide-react";

type MobileNavProps = {
  onToggleSurahSidebar: () => void;
  onToggleSearch: () => void;
  onToggleSettings: () => void;
};

export default function MobileNav({
  onToggleSurahSidebar,
  onToggleSearch,
  onToggleSettings,
}: MobileNavProps) {
  const pathname = usePathname();

  const items = [
    { id: "home", icon: Home, label: "Home", href: "/" },
    { id: "surahs", icon: BookOpen, label: "Surahs", action: onToggleSurahSidebar },
    { id: "search", icon: Search, label: "Search", action: onToggleSearch },
    { id: "settings", icon: Settings, label: "Settings", action: onToggleSettings },
  ];

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around py-2 px-2 md:hidden"
      style={{
        backgroundColor: "var(--icon-sidebar-bg)",
        borderTop: "1px solid var(--ayah-border)",
        paddingBottom: "calc(0.5rem + env(safe-area-inset-bottom, 0px))",
      }}
    >
      {items.map((item) => {
        const Icon = item.icon;
        const isActive = item.href && pathname === item.href;

        if (item.href) {
          return (
            <Link
              key={item.id}
              href={item.href}
              className="flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl transition-colors"
              style={{
                color: isActive ? "var(--accent-teal)" : "var(--text-muted)",
              }}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          );
        }

        return (
          <button
            key={item.id}
            onClick={item.action}
            className="flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl transition-colors cursor-pointer"
            style={{ color: "var(--text-muted)" }}
          >
            <Icon className="w-5 h-5" />
            <span className="text-[10px] font-medium">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
