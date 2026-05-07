"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export type ArabicFont = "uthmanic" | "amiri" | "noto";

export type Settings = {
  arabicFont: ArabicFont;
  arabicFontSize: number;
  translationFontSize: number;
};

const DEFAULT_SETTINGS: Settings = {
  arabicFont: "uthmanic",
  arabicFontSize: 30,
  translationFontSize: 17,
};

export const ARABIC_FONTS: { id: ArabicFont; label: string }[] = [
  { id: "uthmanic", label: "KFGQPC Uthmanic Script" },
  { id: "amiri", label: "Amiri (Naskh)" },
  { id: "noto", label: "Noto Naskh Arabic" },
];

export const arabicFontFamily = (font: ArabicFont) => {
  switch (font) {
    case "uthmanic":
      return "'KFGQPC Uthmanic Script HAFS', serif";
    case "amiri":
      return "var(--font-arabic-amiri, 'Amiri', serif)";
    case "noto":
      return "var(--font-arabic-noto, 'Noto Naskh Arabic', serif)";
    default:
      return "'KFGQPC Uthmanic Script HAFS', serif";
  }
};

type SettingsContextType = {
  settings: Settings;
  update: <K extends keyof Settings>(key: K, value: Settings[K]) => void;
  reset: () => void;
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const stored = localStorage.getItem("quran_settings");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setSettings({ ...DEFAULT_SETTINGS, ...parsed });
      } catch (e) {
        // invalid JSON
      }
    }
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    localStorage.setItem("quran_settings", JSON.stringify(settings));

    // Apply CSS variables to root to affect the whole document
    document.documentElement.style.setProperty("--arabic-font-size", `${settings.arabicFontSize}px`);
    document.documentElement.style.setProperty("--arabic-line-height", `${settings.arabicFontSize * 2}px`);
    document.documentElement.style.setProperty("--translation-font-size", `${settings.translationFontSize}px`);
    document.documentElement.style.setProperty("--arabic-font-family", arabicFontFamily(settings.arabicFont));
  }, [settings, isMounted]);

  const update = <K extends keyof Settings>(key: K, value: Settings[K]) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const reset = () => setSettings(DEFAULT_SETTINGS);

  return (
    <SettingsContext.Provider value={{ settings, update, reset }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error("useSettings must be used within SettingsProvider");
  }
  return context;
}
