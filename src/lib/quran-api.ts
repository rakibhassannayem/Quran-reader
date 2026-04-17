export type Surah = {
  number: number;
  name: string; // Arabic
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: "Meccan" | "Medinan";
};

export type Ayah = {
  number: number;
  numberInSurah: number;
  text: string;
  juz: number;
  page: number;
};

export type SurahDetail = Surah & {
  ayahs: Ayah[];
};

export const TRANSLATION_EDITIONS = [
  { id: "en.sahih", label: "English — Sahih International", lang: "en" },
  { id: "en.pickthall", label: "English — Pickthall", lang: "en" },
  { id: "bn.bengali", label: "Bengali — Muhiuddin Khan (বাংলা)", lang: "bn" },
  { id: "bn.hoque", label: "Bengali — Zohurul Hoque (বাংলা)", lang: "bn" },
  { id: "ur.jalandhry", label: "Urdu — Jalandhry", lang: "ur" },
  { id: "id.indonesian", label: "Indonesian", lang: "id" },
  { id: "fr.hamidullah", label: "French — Hamidullah", lang: "fr" },
  { id: "tr.diyanet", label: "Turkish — Diyanet", lang: "tr" },
] as const;

export type TranslationEditionId = (typeof TRANSLATION_EDITIONS)[number]["id"];

export async function fetchSurahList(): Promise<Surah[]> {
  const res = await fetch(`${process.env.BASE_API}/surah`);

  if (!res.ok) throw new Error("Failed to fetch surah list");

  const result = (await res.json()) as { data: Surah[] };

  return result.data;
}

export async function fetchSurah(
  number: number,
  edition: string = "quran-uthmani",
): Promise<SurahDetail> {
  const res = await fetch(`${process.env.BASE_API}/surah/${number}/${edition}`);
  if (!res.ok) throw new Error(`Failed to fetch surah ${number}`);
  const json = (await res.json()) as { data: SurahDetail };
  return json.data;
}

export async function fetchSurahWithTranslation(
  number: number,
  translationEdition: TranslationEditionId,
): Promise<{ arabic: SurahDetail; translation: SurahDetail }> {
  const [arabic, translation] = await Promise.all([
    fetchSurah(number, "quran-uthmani"),
    fetchSurah(number, translationEdition),
  ]);
  return { arabic, translation };
}

// Search ayahs by text in a translation edition.
export type SearchMatch = {
  number: number;
  text: string;
  surah: { number: number; name: string; englishName: string };
  numberInSurah: number;
};

export async function searchAyahs(
  query: string,
  edition: TranslationEditionId,
): Promise<SearchMatch[]> {
  if (!query.trim()) return [];
  const res = await fetch(
    `${process.env.BASE_API}/search/${encodeURIComponent(query)}/all/${edition}`,
  );
  if (!res.ok) return [];
  const json = (await res.json()) as {
    data?: { matches?: SearchMatch[] };
  };
  return json.data?.matches ?? [];
}
