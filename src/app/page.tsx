export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-24 text-center">
      <div className="w-full max-w-4xl">
        <p className="text-sm uppercase tracking-[0.4em] text-(--accent-teal)">
          Quran Mazid
        </p>
        <h1 className="mt-6 text-5xl sm:text-6xl font-semibold tracking-tight text-white">
          Read the Quran with Arabic script, translation, and audio.
        </h1>
        <p className="mt-4 text-base text-(--text-muted)">
          Start with a surah, follow the verse-by-verse translation, and listen
          to recitation as you read.
        </p>
      </div>
    </main>
  );
}
