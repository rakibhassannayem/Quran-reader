export default function Home() {
  return (
    <main className="flex items-center justify-center px-6 text-center md:py-24 md:min-h-screen md:overflow-auto overflow-hidden h-[calc(100vh-60px)] md:h-screen">
      <div className="w-full max-w-4xl">
        <p className="text-xs sm:text-sm uppercase tracking-[0.4em] text-(--accent-teal)">
          Quran Mazid
        </p>
        <h1 className="mt-4 sm:mt-6 text-3xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-white">
          Read the Quran with Arabic script, translation, and audio.
        </h1>
        <p className="mt-3 sm:mt-4 text-sm sm:text-base text-(--text-muted)">
          Start with a surah, follow the verse-by-verse translation, and listen
          to recitation as you read.
        </p>
      </div>
    </main>
  );
}
