"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Search, X, Loader2 } from "lucide-react";

type SearchResult = {
  number: number;
  text: string;
  surah: { number: number; name: string; englishName: string };
  numberInSurah: number;
};

type SearchPanelProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function SearchPanel({ isOpen, onClose }: SearchPanelProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const search = useCallback(async (q: string) => {
    if (!q.trim()) {
      setResults([]);
      setSearched(false);
      return;
    }
    setLoading(true);
    setSearched(true);
    try {
      const res = await fetch(
        `https://api.alquran.cloud/v1/search/${encodeURIComponent(q)}/all/en.sahih`,
      );
      if (!res.ok) {
        setResults([]);
        setLoading(false);
        return;
      }
      const json = await res.json();
      setResults(json.data?.matches ?? []);
    } catch {
      setResults([]);
    }
    setLoading(false);
  }, []);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      search(query);
    }, 400);
    return () => clearTimeout(timer);
  }, [query, search]);

  // Close on Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[10vh]">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panel */}
      <div
        className="relative w-full max-w-2xl mx-4 rounded-2xl overflow-hidden shadow-2xl animate-in fade-in slide-in-from-top-4 duration-300"
        style={{
          backgroundColor: "var(--card)",
          border: "1px solid var(--ayah-border)",
          maxHeight: "70vh",
        }}
      >
        {/* Search input */}
        <div
          className="flex items-center gap-3 px-5 py-4"
          style={{ borderBottom: "1px solid var(--ayah-border)" }}
        >
          <Search
            className="w-5 h-5 shrink-0"
            style={{ color: "var(--accent-teal)" }}
          />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search ayahs by English or Arabic text..."
            className="flex-1 bg-transparent text-base outline-none placeholder:text-(--text-muted)"
            style={{ color: "var(--foreground)" }}
            autoFocus
          />
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-muted transition-colors"
            style={{ color: "var(--text-muted)" }}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results */}
        <div
          className="overflow-y-auto surah-sidebar-scroll"
          style={{ maxHeight: "calc(70vh - 65px)" }}
        >
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2
                className="w-6 h-6 animate-spin"
                style={{ color: "var(--accent-teal)" }}
              />
            </div>
          ) : results.length > 0 ? (
            <div className="py-2">
              {results.slice(0, 50).map((r, idx) => (
                <Link
                  key={`${r.surah.number}-${r.numberInSurah}-${idx}`}
                  href={`/surah/${r.surah.number}#ayah-${r.numberInSurah}`}
                  onClick={onClose}
                  className="block px-5 py-4 transition-colors hover:bg-muted"
                  style={{ borderBottom: "1px solid var(--ayah-border)" }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span
                      className="px-2 py-0.5 text-xs font-semibold rounded"
                      style={{
                        backgroundColor: "var(--accent-teal-dim)",
                        color: "var(--accent-teal)",
                      }}
                    >
                      {r.surah.englishName} {r.surah.number}:{r.numberInSurah}
                    </span>
                    <span
                      className="text-sm"
                      style={{
                        fontFamily: "'KFGQPC Uthmanic Script HAFS', serif",
                        color: "var(--text-muted)",
                      }}
                    >
                      {r.surah.name}
                    </span>
                  </div>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "var(--text-translation)" }}
                  >
                    {r.text}
                  </p>
                </Link>
              ))}
            </div>
          ) : searched && !loading ? (
            <div className="text-center py-12">
              <p style={{ color: "var(--text-muted)" }}>
                No results found for &quot;{query}&quot;
              </p>
            </div>
          ) : (
            <div className="text-center py-12">
              <p style={{ color: "var(--text-muted)" }}>
                Type to search ayahs across all surahs
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
