"use client";

import { X, RotateCcw } from "lucide-react";
import { useSettings, arabicFontFamily, ARABIC_FONTS, type ArabicFont } from "@/lib/settings";

type SettingsPanelProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function SettingsPanel({ isOpen, onClose }: SettingsPanelProps) {
  const { settings, update, reset } = useSettings();

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={onClose}
        />
      )}

      {/* Panel */}
      <div
        className="fixed top-0 right-0 h-full z-50 flex flex-col transition-transform duration-300 ease-in-out"
        style={{
          width: "320px",
          maxWidth: "90vw",
          backgroundColor: "var(--surah-sidebar-bg)",
          borderLeft: "1px solid var(--ayah-border)",
          transform: isOpen ? "translateX(0)" : "translateX(100%)",
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-5 py-4 shrink-0"
          style={{ borderBottom: "1px solid var(--ayah-border)" }}
        >
          <div>
            <h2 className="text-base font-bold" style={{ color: "var(--foreground)" }}>
              Reading Settings
            </h2>
            <p className="text-xs" style={{ color: "var(--text-muted)" }}>
              Font Settings
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[var(--muted)] transition-colors cursor-pointer"
            style={{ color: "var(--text-muted)" }}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-5 py-6 space-y-8">
          {/* Arabic Font Size */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-medium" style={{ color: "var(--foreground)" }}>
                Arabic Font Size
              </label>
              <span
                className="text-sm font-mono px-2 py-0.5 rounded"
                style={{
                  backgroundColor: "var(--accent-teal-dim)",
                  color: "var(--accent-teal)",
                }}
              >
                {settings.arabicFontSize}
              </span>
            </div>
            <input
              type="range"
              min={20}
              max={64}
              step={1}
              value={settings.arabicFontSize}
              onChange={(e) => update("arabicFontSize", parseInt(e.target.value))}
              className="w-full accent-[var(--accent-teal)] h-1.5 rounded-full appearance-none cursor-pointer"
              style={{ backgroundColor: "var(--ayah-border)" }}
            />
            <div className="flex justify-between text-xs mt-1" style={{ color: "var(--text-muted)" }}>
              <span>20</span>
              <span>64</span>
            </div>
          </div>

          {/* Translation Font Size */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-medium" style={{ color: "var(--foreground)" }}>
                Translation Font Size
              </label>
              <span
                className="text-sm font-mono px-2 py-0.5 rounded"
                style={{
                  backgroundColor: "var(--accent-teal-dim)",
                  color: "var(--accent-teal)",
                }}
              >
                {settings.translationFontSize}
              </span>
            </div>
            <input
              type="range"
              min={12}
              max={28}
              step={1}
              value={settings.translationFontSize}
              onChange={(e) => update("translationFontSize", parseInt(e.target.value))}
              className="w-full accent-[var(--accent-teal)] h-1.5 rounded-full appearance-none cursor-pointer"
              style={{ backgroundColor: "var(--ayah-border)" }}
            />
            <div className="flex justify-between text-xs mt-1" style={{ color: "var(--text-muted)" }}>
              <span>12</span>
              <span>28</span>
            </div>
          </div>

          {/* Arabic Font Face */}
          <div>
            <label className="text-sm font-medium block mb-3" style={{ color: "var(--foreground)" }}>
              Arabic Font Face
            </label>
            <div className="space-y-2">
              {ARABIC_FONTS.map((f) => {
                const isSelected = settings.arabicFont === f.id;
                return (
                  <button
                    key={f.id}
                    onClick={() => update("arabicFont", f.id)}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-left cursor-pointer"
                    style={{
                      backgroundColor: isSelected ? "var(--accent-teal-dim)" : "var(--ayah-card-bg)",
                      border: `1px solid ${isSelected ? "var(--accent-teal)" : "var(--ayah-border)"}`,
                    }}
                  >
                    <span
                      className="w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0"
                      style={{
                        borderColor: isSelected ? "var(--accent-teal)" : "var(--ayah-border)",
                      }}
                    >
                      {isSelected && (
                        <span
                          className="w-2.5 h-2.5 rounded-full"
                          style={{ backgroundColor: "var(--accent-teal)" }}
                        />
                      )}
                    </span>
                    <div>
                      <span
                        className="text-sm block"
                        style={{ color: isSelected ? "var(--accent-teal)" : "var(--foreground)" }}
                      >
                        {f.label}
                      </span>
                      <span
                        className="text-lg block mt-1"
                        style={{
                          fontFamily: arabicFontFamily(f.id),
                          color: "var(--text-arabic)",
                        }}
                      >
                        بِسۡمِ ٱللَّهِ
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div
          className="shrink-0 px-5 py-4"
          style={{ borderTop: "1px solid var(--ayah-border)" }}
        >
          <button
            onClick={reset}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors cursor-pointer"
            style={{
              backgroundColor: "var(--ayah-card-bg)",
              border: "1px solid var(--ayah-border)",
              color: "var(--text-muted)",
            }}
          >
            <RotateCcw className="w-4 h-4" />
            Reset to defaults
          </button>
        </div>
      </div>
    </>
  );
}
