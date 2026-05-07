"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X, Search } from "lucide-react";
import { type Surah } from "@/lib/quran-api";

type SurahSidebarProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function SurahSidebar({ isOpen, onClose }: SurahSidebarProps) {
  const [surahs, setSurahs] = useState<Surah[]>([]);
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();

  // Extract current surah number from pathname
  const currentSurahMatch = pathname.match(/\/surah\/(\d+)/);
  const currentSurah = currentSurahMatch ? parseInt(currentSurahMatch[1], 10) : null;

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/surahs");
        if (!res.ok) throw new Error();
        const data = await res.json();
        setSurahs(data);
      } catch {
        // Fallback: fetch from external API directly
        try {
          const res = await fetch("https://api.alquran.cloud/v1/surah");
          const json = await res.json();
          setSurahs(json.data);
        } catch {
          console.error("Failed to load surahs");
        }
      }
      setLoading(false);
    }
    load();
  }, []);

  const filteredSurahs = filter
    ? surahs.filter((s) => {
        const q = filter.toLowerCase();
        return (
          s.englishName.toLowerCase().includes(q) ||
          s.englishNameTranslation.toLowerCase().includes(q) ||
          s.name.includes(q) ||
          s.number.toString() === q
        );
      })
    : surahs;

  return (
    <>
      {/* Mobile overlay backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed top-0 h-full z-40 flex flex-col transition-transform duration-300 ease-in-out
          md:left-[var(--icon-sidebar-width)] left-0
        `}
        style={{
          width: "var(--surah-sidebar-width)",
          backgroundColor: "var(--surah-sidebar-bg)",
          borderRight: "1px solid var(--ayah-border)",
          transform: isOpen ? "translateX(0)" : "translateX(-100%)",
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-5 py-4 shrink-0"
          style={{ borderBottom: "1px solid var(--ayah-border)" }}
        >
          <div>
            <h2
              className="text-lg font-bold"
              style={{ color: "var(--accent-teal)" }}
            >
              Quran Reader
            </h2>
            <p className="text-xs" style={{ color: "var(--text-muted)" }}>
              Read, Study, and Learn
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg transition-colors md:hidden"
            style={{ color: "var(--text-muted)" }}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search filter */}
        <div className="px-4 py-3 shrink-0">
          <div
            className="flex items-center gap-2 px-3 py-2 rounded-lg"
            style={{
              backgroundColor: "var(--ayah-card-bg)",
              border: "1px solid var(--ayah-border)",
            }}
          >
            <Search className="w-4 h-4 shrink-0" style={{ color: "var(--text-muted)" }} />
            <input
              type="text"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              placeholder="Search surahs..."
              className="bg-transparent text-sm w-full outline-none placeholder:text-[var(--text-muted)]"
              style={{ color: "var(--foreground)" }}
            />
          </div>
        </div>

        {/* Surah list */}
        <div className="flex-1 overflow-y-auto surah-sidebar-scroll px-2 pb-4">
          {loading ? (
            <div className="flex items-center justify-center h-32">
              <div
                className="w-6 h-6 border-2 border-t-transparent rounded-full animate-spin"
                style={{ borderColor: "var(--accent-teal)", borderTopColor: "transparent" }}
              />
            </div>
          ) : (
            filteredSurahs.map((s) => {
              const isActive = currentSurah === s.number;
              return (
                <Link
                  key={s.number}
                  href={`/surah/${s.number}`}
                  onClick={onClose}
                  className="flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 group mb-0.5"
                  style={{
                    backgroundColor: isActive ? "var(--accent-teal-dim)" : "transparent",
                    borderLeft: isActive ? "3px solid var(--accent-teal)" : "3px solid transparent",
                  }}
                >
                  {/* Number */}
                  <span
                    className="w-10 h-10 flex items-center justify-center rounded-lg text-sm font-semibold shrink-0"
                    style={{
                      backgroundColor: isActive ? "var(--accent-teal)" : "var(--ayah-card-bg)",
                      color: isActive ? "var(--background)" : "var(--text-muted)",
                    }}
                  >
                    {String(s.number).padStart(3, "0")}
                  </span>

                  {/* Names */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className="text-sm font-medium truncate transition-colors"
                        style={{
                          color: isActive ? "var(--accent-teal)" : "var(--foreground)",
                        }}
                      >
                        {s.englishName}
                      </span>
                      <span
                        className="text-base shrink-0"
                        style={{
                          fontFamily: "'KFGQPC Uthmanic Script HAFS', 'Amiri', serif",
                          color: isActive ? "var(--accent-teal)" : "var(--text-muted)",
                        }}
                      >
                        {s.name}
                      </span>
                    </div>
                    <span
                      className="text-xs truncate block"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {s.englishNameTranslation}
                    </span>
                  </div>
                </Link>
              );
            })
          )}
        </div>
      </aside>
    </>
  );
}
