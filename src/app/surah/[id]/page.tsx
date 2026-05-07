import { fetchSurahWithTranslation } from "@/lib/quran-api";
import Link from "next/link";
import { Metadata } from "next";
import SurahReaderClient from "./SurahReaderClient";

type PageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  const surahId = parseInt(id, 10);
  if (isNaN(surahId)) return { title: "Not Found" };

  try {
    const { arabic } = await fetchSurahWithTranslation(surahId, "en.sahih");
    return {
      title: `Surah ${arabic.englishName} (${String(surahId).padStart(2, "0")}) - Arabic, English Translation & Recitation | ${arabic.name}`,
      description: `Read & Listen to Surah ${arabic.englishName} (${arabic.name}) with English Translation. ${arabic.revelationType} surah with ${arabic.numberOfAyahs} ayahs.`,
    };
  } catch {
    return { title: "Surah Not Found" };
  }
}

export default async function SurahPage({ params }: PageProps) {
  const { id } = await params;
  const surahId = parseInt(id, 10);

  if (isNaN(surahId) || surahId < 1 || surahId > 114) {
    return (
      <div className="h-[80vh] flex flex-col items-center justify-center gap-4">
        <p className="text-lg" style={{ color: "var(--text-muted)" }}>
          Invalid Surah ID
        </p>
        <Link
          href="/surah/1"
          className="text-sm px-4 py-2 rounded-lg transition-colors"
          style={{
            backgroundColor: "var(--accent-teal-dim)",
            color: "var(--accent-teal)",
          }}
        >
          Go to Al-Fatihah
        </Link>
      </div>
    );
  }

  let surahData;
  try {
    surahData = await fetchSurahWithTranslation(surahId, "en.sahih");
  } catch {
    return (
      <div className="h-[80vh] flex flex-col gap-4 items-center justify-center">
        <p className="text-lg" style={{ color: "var(--destructive)" }}>
          Failed to load Surah.
        </p>
        <Link
          href="/surah/1"
          className="text-sm px-4 py-2 rounded-lg transition-colors"
          style={{
            backgroundColor: "var(--accent-teal-dim)",
            color: "var(--accent-teal)",
          }}
        >
          Go to Al-Fatihah
        </Link>
      </div>
    );
  }

  const { arabic, translation } = surahData;

  const ayahs = arabic.ayahs.map((arabicAyah, index) => ({
    number: arabicAyah.number, // global number
    numberInSurah: arabicAyah.numberInSurah,
    arabicText: arabicAyah.text,
    translationText: translation.ayahs[index]?.text ?? "",
    juz: arabicAyah.juz,
    page: arabicAyah.page,
  }));

  // Last global ayah number in this surah for auto-advance
  const maxGlobalAyah = ayahs[ayahs.length - 1]?.number ?? 0;

  return (
    <SurahReaderClient
      surahId={surahId}
      surahName={arabic.name}
      englishName={arabic.englishName}
      englishNameTranslation={arabic.englishNameTranslation}
      revelationType={arabic.revelationType}
      numberOfAyahs={arabic.numberOfAyahs}
      ayahs={ayahs}
      maxGlobalAyah={maxGlobalAyah}
    />
  );
}
