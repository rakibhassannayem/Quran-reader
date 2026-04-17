import { fetchSurahList } from "@/lib/quran-api";
import Link from "next/link";
import SearchInput from "./SearchInput";

const SurahLists = async ({ query }: { query?: string }) => {
  const surahs = await fetchSurahList();

  const filteredSurahs = query
    ? surahs.filter((s) => {
        const q = query.toLowerCase();
        return (
          s.englishName.toLowerCase().includes(q) ||
          s.englishNameTranslation.toLowerCase().includes(q) ||
          s.name.includes(q) ||
          s.number.toString() === q
        );
      })
    : surahs;

  return (
    <div className="mb-20">
      <div className="m-8 text-center">
        <h1 className="text-3xl sm:text-4xl font-bold">The Holy Quran</h1>
        <p className="mt-2 text-gray-500">
          Read all 114 surahs with translation. Search any surah below.
        </p>
      </div>

      <SearchInput />

      {filteredSurahs.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredSurahs.map((s) => (
            <Link href={`/surah/${s.number}`} key={s.number}>
              <div className="gap-3 p-5 transition-all hover:shadow-lg h-full bg-white flex rounded-xl items-center border border-transparent hover:border-green-100 group">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-linear-to-br from-green-800 to-green-700 text-white font-bold group-hover:scale-105 transition-transform duration-300 shadow-sm">
                  {s.number}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline justify-between gap-2">
                    <p className="font-semibold truncate group-hover:text-green-700 transition-colors">
                      {s.englishName}
                    </p>
                    <p
                      className="arabic text-xl text-green-700 shrink-0"
                      style={{
                        fontFamily: "var(--font-arabic-amiri, 'Amiri')",
                      }}
                    >
                      {s.name}
                    </p>
                  </div>
                  <p className="text-sm text-gray-500 truncate">
                    {s.englishNameTranslation} &bull; {s.revelationType} &bull;{" "}
                    {s.numberOfAyahs} ayahs
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-xl text-gray-500">
            No Surahs found matching &quot;{query}&quot;
          </p>
          <Link href="/" className="mt-4 text-green-700 hover:underline">
            Clear Search
          </Link>
        </div>
      )}
    </div>
  );
};

export default SurahLists;
