import type { Metadata } from "next";
import { Amiri, Noto_Naskh_Arabic } from "next/font/google";
import "./globals.css";
import { SettingsProvider } from "@/lib/settings";
import AppShell from "@/components/AppShell";

const amiri = Amiri({
  weight: ["400", "700"],
  subsets: ["arabic"],
  variable: "--font-arabic-amiri",
  display: "swap",
});

const notoNaskh = Noto_Naskh_Arabic({
  weight: ["400", "700"],
  subsets: ["arabic"],
  variable: "--font-arabic-noto",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Quran Reader — Read, Study, and Learn The Quran",
  description:
    "Read the Holy Quran with Arabic text, English translation (Saheeh International), and audio recitation. Search ayahs, customize fonts, and explore all 114 surahs.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${amiri.variable} ${notoNaskh.variable} h-full antialiased`}
    >
      <body>
        <SettingsProvider>
          <AppShell>{children}</AppShell>
        </SettingsProvider>
      </body>
    </html>
  );
}
