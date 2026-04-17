import { fetchSurahList } from "@/lib/quran-api";
import Link from "next/link";

const SurahLists = async () => {
  const surahs = await fetchSurahList();
  return (
    <div>
      <div className="m-8 text-center">
        <h1 className="text-3xl sm:text-4xl font-bold">The Holy Quran</h1>
        <p className="mt-2 text-gray-500">
          Read all 114 surahs with translation. Search any ayah below.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {surahs.map((s) => (
          <Link href={`/surah/${s.number}`} key={s.number}>
            <div className="gap-3 p-5 transition-all hover:shadow-lg h-full bg-white flex rounded-xl items-center">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-linear-to-br from-green-800 to-green-700 text-white font-bold text-sm border">
                {s.number}
              </div>

              <div className="flex-1">
                <div className="flex items-baseline justify-between gap-2">
                  <p className="font-semibold  truncate group-hover:text-primary transition-colors">
                    {s.englishName}
                  </p>
                  <p
                    className="arabic text-lg text-primary shrink-0"
                    style={{ fontFamily: "var(--font-arabic-amiri)" }}
                  >
                    {s.name}
                  </p>
                </div>
                <p className="text-sm text-muted-foreground truncate">
                  {s.englishNameTranslation} · {s.numberOfAyahs} ayahs ·{" "}
                  {s.revelationType}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SurahLists;
