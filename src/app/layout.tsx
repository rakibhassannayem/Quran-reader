import type { Metadata } from "next";
import { Geist, Geist_Mono, Amiri, Noto_Naskh_Arabic } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/shared/Navbar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { SidebarSettings } from "@/components/SidebarSettings";
import { SettingsProvider } from "@/lib/settings";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const amiri = Amiri({
  weight: ["400", "700"],
  subsets: ["arabic"],
  variable: "--font-arabic-amiri",
});

const notoNaskh = Noto_Naskh_Arabic({
  weight: ["400", "700"],
  subsets: ["arabic"],
  variable: "--font-arabic-noto",
});

export const metadata: Metadata = {
  title: "Quran Reader",
  description: "The Holy Quran",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${amiri.variable} ${notoNaskh.variable} h-full antialiased`}
    >
      <body>
        <SettingsProvider>
          <SidebarProvider defaultOpen={false} className="min-h-full flex flex-col">
            <SidebarSettings />
            <header>
              <Navbar />
            </header>
            <main className="bg-[#faf3e3] min-h-screen w-full">{children}</main>
          </SidebarProvider>
        </SettingsProvider>
      </body>
    </html>
  );
}
