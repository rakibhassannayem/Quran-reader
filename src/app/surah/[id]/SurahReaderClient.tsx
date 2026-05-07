"use client";

import Link from "next/link";
import { ChevronLeft, ChevronRight, Play, Pause, Loader2 } from "lucide-react";
import { useAudioPlayer } from "@/hooks/useAudioPlayer";

type Ayah = {
  number: number;
  numberInSurah: number;
  arabicText: string;
  translationText: string;
  juz: number;
  page: number;
};

type SurahReaderClientProps = {
  surahId: number;
  surahName: string;
  englishName: string;
  englishNameTranslation: string;
  revelationType: string;
  numberOfAyahs: number;
  ayahs: Ayah[];
  maxGlobalAyah: number;
};

export default function SurahReaderClient({
  surahId,
  surahName,
  englishName,
  englishNameTranslation,
  revelationType,
  numberOfAyahs,
  ayahs,
  maxGlobalAyah,
}: SurahReaderClientProps) {
  const { currentAyah, isPlaying, isLoading, playAyah, stop } = useAudioPlayer();

  const showBismillah = surahId !== 1 && surahId !== 9;

  const stripBismillah = (text: string, ayahNum: number) => {
    if (surahId !== 1 && ayahNum === 1 && text.startsWith("بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ ")) {
      return text.replace("بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ ", "");
    }
    return text;
  };

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-8 py-8 animate-in fade-in duration-500">
      {/* Surah Header */}
      <div
        className="text-center py-10 px-6 mb-8 rounded-2xl relative overflow-hidden"
        style={{
          backgroundColor: "var(--ayah-card-bg)",
          border: "1px solid var(--ayah-border)",
        }}
      >
        {/* Decorative corner accents */}
        <div
          className="absolute top-0 left-0 w-20 h-20 opacity-10"
          style={{
            background: "radial-gradient(circle at 0 0, var(--accent-teal), transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-0 right-0 w-20 h-20 opacity-10"
          style={{
            background: "radial-gradient(circle at 100% 100%, var(--accent-teal), transparent 70%)",
          }}
        />

        <h1
          className="text-4xl sm:text-5xl mb-3 relative z-10"
          style={{
            fontFamily: "var(--arabic-font-family)",
            color: "var(--accent-teal)",
            lineHeight: "1.6",
          }}
        >
          {surahName}
        </h1>
        <h2
          className="text-xl sm:text-2xl font-semibold mb-3 relative z-10"
          style={{ color: "var(--foreground)" }}
        >
          Surah {englishName}
        </h2>
        <p className="text-sm relative z-10" style={{ color: "var(--text-muted)" }}>
          Ayah-{numberOfAyahs}, {revelationType === "Meccan" ? "Makkah" : "Madinah"}
        </p>
      </div>

      {/* Bismillah */}
      {showBismillah && (
        <div
          className="text-center py-8 mb-8 rounded-xl"
          style={{
            backgroundColor: "var(--ayah-card-bg)",
            border: "1px solid var(--ayah-border)",
          }}
        >
          <p className="arabic-text" style={{ textAlign: "center", fontSize: "calc(var(--arabic-font-size) * 1.1)" }}>
            بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
          </p>
          <p className="translation-text mt-2 text-center italic" style={{ color: "var(--text-muted)" }}>
            In the name of Allah, the Entirely Merciful, the Especially Merciful.
          </p>
        </div>
      )}

      {/* Ayahs */}
      <div className="space-y-4">
        {ayahs.map((ayah) => {
          const isCurrentPlaying = currentAyah === ayah.number;
          return (
            <div
              key={ayah.number}
              id={`ayah-${ayah.numberInSurah}`}
              className={`rounded-xl p-5 sm:p-7 transition-all duration-300 ${isCurrentPlaying ? "ayah-playing" : ""}`}
              style={{
                backgroundColor: "var(--ayah-card-bg)",
                border: `1px solid ${isCurrentPlaying ? "var(--accent-teal)" : "var(--ayah-border)"}`,
              }}
            >
              {/* Ayah header row */}
              <div className="flex items-center justify-between mb-5">
                {/* Verse reference badge */}
                <span
                  className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold"
                  style={{
                    backgroundColor: "var(--accent-teal-dim)",
                    color: "var(--accent-teal)",
                  }}
                >
                  {surahId}:{ayah.numberInSurah}
                </span>

                {/* Play button */}
                <button
                  onClick={() => {
                    if (isCurrentPlaying && isPlaying) {
                      playAyah(ayah.number, maxGlobalAyah);
                    } else if (isCurrentPlaying && !isPlaying) {
                      playAyah(ayah.number, maxGlobalAyah);
                    } else {
                      playAyah(ayah.number, maxGlobalAyah);
                    }
                  }}
                  className="w-9 h-9 flex items-center justify-center rounded-full transition-all duration-200 cursor-pointer"
                  style={{
                    backgroundColor: isCurrentPlaying ? "var(--accent-teal)" : "var(--accent-teal-dim)",
                    color: isCurrentPlaying ? "var(--background)" : "var(--accent-teal)",
                  }}
                  title={isCurrentPlaying && isPlaying ? "Pause" : "Play"}
                >
                  {isLoading && isCurrentPlaying ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : isCurrentPlaying && isPlaying ? (
                    <Pause className="w-4 h-4" />
                  ) : (
                    <Play className="w-4 h-4 ml-0.5" />
                  )}
                </button>
              </div>

              {/* Arabic text */}
              <p className="arabic-text mb-5">
                {stripBismillah(ayah.arabicText, ayah.numberInSurah)}
              </p>

              {/* Divider */}
              <div
                className="h-px w-full mb-4"
                style={{
                  background: "linear-gradient(to right, transparent, var(--ayah-divider), transparent)",
                }}
              />

              {/* Translation label */}
              <p className="text-xs font-medium mb-2" style={{ color: "var(--text-label)" }}>
                Saheeh International
              </p>

              {/* Translation text */}
              <p className="translation-text">{ayah.translationText}</p>
            </div>
          );
        })}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between mt-10 mb-8">
        {surahId > 1 ? (
          <Link
            href={`/surah/${surahId - 1}`}
            className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-medium transition-all duration-200"
            style={{
              backgroundColor: "var(--ayah-card-bg)",
              border: "1px solid var(--ayah-border)",
              color: "var(--foreground)",
            }}
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </Link>
        ) : (
          <div />
        )}

        {surahId < 114 ? (
          <Link
            href={`/surah/${surahId + 1}`}
            className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-medium transition-all duration-200"
            style={{
              backgroundColor: "var(--accent-teal-dim)",
              border: "1px solid var(--accent-teal)",
              color: "var(--accent-teal)",
            }}
          >
            Next
            <ChevronRight className="w-4 h-4" />
          </Link>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
}
