import { fetchSurahWithTranslation } from "@/lib/quran-api";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Metadata } from "next";

type PageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const surahId = parseInt(id, 10);
  if (isNaN(surahId)) return { title: "Not Found" };
  
  try {
    const { arabic } = await fetchSurahWithTranslation(surahId, "en.sahih");
    return {
      title: `${arabic.englishName} (${arabic.name}) - The Holy Quran`,
      description: `Read Surah ${arabic.englishName} (${arabic.englishNameTranslation}) with translation. It is a ${arabic.revelationType} surah with ${arabic.numberOfAyahs} ayahs.`,
    };
  } catch {
    return { title: "Surah Not Found" };
  }
}

export default async function SurahPage({ params }: PageProps) {
  const { id } = await params;
  const surahId = parseInt(id, 10);

  if (isNaN(surahId)) {
    return (
      <div className="h-[50vh] flex items-center justify-center text-red-500 font-medium">
        Invalid Surah ID provided.
      </div>
    );
  }

  let surahData;
  try {
    surahData = await fetchSurahWithTranslation(surahId, "en.sahih");
  } catch (error) {
    return (
      <div className="h-[50vh] flex flex-col gap-4 items-center justify-center text-center">
        <p className="text-red-500 font-medium text-lg">Failed to load Surah.</p>
        <Link href="/">
          <span className="text-green-700 hover:underline">Return to Home</span>
        </Link>
      </div>
    );
  }

  const { arabic, translation } = surahData;

  // Combine ayahs so we can map through them
  const ayahs = arabic.ayahs.map((arabicAyah, index) => ({
    arabic: arabicAyah,
    translation: translation.ayahs[index],
  }));

  // Render "Bismillah" for all except Surah 1 and Surah 9
  const showBismillah = surahId !== 1 && surahId !== 9;

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl pb-32 animate-in fade-in duration-500">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-slate-500 hover:text-green-700 transition-colors mb-8 font-medium bg-slate-100 hover:bg-green-50 px-4 py-2 rounded-full text-sm"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Surahs
      </Link>

      <div className="relative overflow-hidden bg-linear-to-br from-green-800 via-green-700 to-green-900 rounded-[2rem] p-8 sm:p-14 text-center mb-16 shadow-2xl text-white">
        {/* Background decorative elements */}
        <div className="absolute top-0 right-0 opacity-10 pointer-events-none transform translate-x-1/4 -translate-y-1/4">
          <svg width="400" height="400" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path fill="currentColor" d="M45.7,-76.3C58.9,-69.3,69.1,-55.3,77.5,-40.5C85.9,-25.7,92.5,-10.1,91.3,4.9C90.1,19.9,81.1,34.3,70.5,46.1C59.9,57.9,47.7,67.1,33.8,73.8C19.9,80.5,4.3,84.7,-10.5,82.7C-25.3,80.7,-39.3,72.5,-52.1,62.2C-64.9,51.9,-76.5,39.5,-83.4,24.3C-90.3,9.1,-92.5,-8.9,-87.3,-24.5C-82.1,-40.1,-69.5,-53.3,-55.1,-60.8C-40.7,-68.3,-24.5,-70.1,-8.3,-69.6C7.9,-69.1,24.8,-66.3,45.7,-76.3Z" transform="translate(100 100)" />
          </svg>
        </div>
        <div className="absolute bottom-0 left-0 opacity-10 pointer-events-none transform -translate-x-1/4 translate-y-1/4">
           <svg width="300" height="300" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path fill="currentColor" d="M54.5,-68.3C66.8,-53.2,70.5,-31.8,70.1,-12.3C69.7,7.2,65.2,24.8,55,39.4C44.8,54,29,65.6,9.5,70.4C-10,75.2,-33.2,73.2,-48.5,60.8C-63.8,48.4,-71.2,25.6,-70.4,4.5C-69.6,-16.6,-60.6,-36,-46.3,-51.5C-32,-67,-12.4,-78.6,4.6,-84C21.6,-89.4,42.2,-83.4,54.5,-68.3Z" transform="translate(100 100)" />
          </svg>
        </div>

        <div className="relative z-10 flex flex-col items-center">
            <h1
              className="text-5xl sm:text-7xl font-bold mb-6 drop-shadow-lg text-green-50"
              style={{ fontFamily: "var(--arabic-font-family, var(--font-arabic-amiri))" }}
            >
              {arabic.name}
            </h1>
            <h2 className="text-3xl sm:text-4xl font-semibold mb-3 tracking-tight">
              {arabic.englishName}
            </h2>
            <div className="flex items-center justify-center gap-3 text-green-100 font-medium bg-white/10 backdrop-blur-md px-6 py-2 rounded-full border border-white/20">
              <span>{arabic.englishNameTranslation}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-green-300" />
              <span>{arabic.revelationType}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-green-300" />
              <span>{arabic.numberOfAyahs} Ayahs</span>
            </div>
        </div>
      </div>

      {showBismillah && (
        <div className="text-center mb-16 px-4">
           <p 
             className="text-gray-800 py-6 transition-all duration-300"
             style={{ 
               fontFamily: 'var(--arabic-font-family, var(--font-arabic-amiri))',
               fontSize: 'calc(var(--arabic-font-size, 36px) * 1.25)',
               lineHeight: 'var(--arabic-line-height, 72px)'
             }}
           >
              بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
           </p>
           <p className="text-gray-500 italic mt-2">
             In the name of Allah, the Entirely Merciful, the Especially Merciful.
           </p>
        </div>
      )}

      <div className="space-y-6 sm:space-y-8">
        {ayahs.map(({ arabic: ar, translation: tr }) => (
          <div
            key={ar.number}
            className="group bg-white p-6 sm:p-10 rounded-2xl sm:rounded-3xl shadow-xs border border-slate-100 hover:shadow-xl hover:border-green-200 transition-all duration-300 relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-1.5 h-full bg-transparent group-hover:bg-green-600 transition-colors duration-300" />
            
            <div className="flex flex-col sm:flex-row gap-6 sm:gap-10 sm:items-start justify-between">
              
              <div className="flex items-center sm:items-start gap-4 shrink-0 sm:w-32 justify-between sm:justify-start">
                 <div className="flex items-center justify-center h-12 w-12 bg-green-50 text-green-700 font-bold rounded-xl text-lg group-hover:bg-green-600 group-hover:text-white transition-colors duration-300 shadow-sm border border-green-100 group-hover:border-transparent">
                    {ar.numberInSurah}
                 </div>
                 <div className="flex flex-col sm:mt-1 gap-1 text-right sm:text-left">
                   <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                     Juz {ar.juz}
                   </span>
                   <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                     Page {ar.page}
                   </span>
                 </div>
              </div>
              
              <div className="flex-1 min-w-0 space-y-8">
                <p
                  className="text-right text-slate-800 transition-all duration-300"
                  style={{ 
                    fontFamily: "var(--arabic-font-family, var(--font-arabic-amiri))", 
                    fontSize: "var(--arabic-font-size, 36px)",
                    lineHeight: "var(--arabic-line-height, 72px)",
                    direction: "rtl", 
                    wordSpacing: '0.1em' 
                  }}
                >
                  {/* Remove bismillah from first ayah if not Surah 1 */}
                  {(surahId !== 1 && ar.numberInSurah === 1 && ar.text.startsWith("بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ "))
                    ? ar.text.replace("بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ ", "")
                    : ar.text}
                </p>
                
                <div className="w-full h-px bg-linear-to-r from-transparent via-slate-200 to-transparent lg:via-slate-100" />
                
                <p 
                  className="text-slate-600 leading-relaxed sm:leading-loose transition-all duration-300"
                  style={{ fontSize: "var(--translation-font-size, 18px)" }}
                >
                  {tr.text}
                </p>
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
