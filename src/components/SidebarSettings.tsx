"use client"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
// import { useSettings, arabicFontFamily, type ArabicFont } from "@/lib/settings";
// import { TRANSLATION_EDITIONS, type TranslationEditionId } from "@/lib/quran-api";
import { Settings as SettingsIcon, RotateCcw } from "lucide-react";

// const ARABIC_FONTS: { id: ArabicFont; label: string }[] = [
//   { id: "amiri", label: "Amiri (Naskh)" },
//   { id: "scheherazade", label: "Scheherazade New" },
//   { id: "noto", label: "Noto Naskh Arabic" },
// ];

export function SidebarSettings() {
  // const { settings, update, reset } = useSettings();

  return (
    <Sidebar side="right" collapsible="offcanvas" variant="inset">
      <SidebarHeader className="border-b border-sidebar-border">
        <div className="flex items-center gap-2 px-2 py-1.5">
          <SettingsIcon className="h-4 w-4 text-primary" />
          <span className="font-semibold">Settings</span>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Translation</SidebarGroupLabel>
          <SidebarGroupContent className="px-2">
            {/* <Select
              value={settings.translation}
              onValueChange={(v) => update("translation", v as TranslationEditionId)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {TRANSLATION_EDITIONS.map((e) => (
                  <SelectItem key={e.id} value={e.id}>
                    {e.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select> */}
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Arabic font</SidebarGroupLabel>
          <SidebarGroupContent className="px-2 space-y-2">
            {/* <Select
              value={settings.arabicFont}
              onValueChange={(v) => update("arabicFont", v as ArabicFont)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {ARABIC_FONTS.map((f) => (
                  <SelectItem key={f.id} value={f.id}>
                    <span style={{ fontFamily: arabicFontFamily(f.id) }}>{f.label}</span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select> */}
            {/* <div
              className="arabic mt-2 rounded-md border border-border bg-card px-3 py-2 text-2xl"
              style={{ fontFamily: arabicFontFamily(settings.arabicFont) }}
            >
              بِسْمِ اللَّهِ
            </div> */}
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          {/* <SidebarGroupLabel>
            Arabic font size — {settings.arabicFontSize}px
          </SidebarGroupLabel> */}
          <SidebarGroupContent className="px-3 pt-2">
            {/* <Slider
              min={20}
              max={64}
              step={1}
              value={[settings.arabicFontSize]}
              onValueChange={(v) => update("arabicFontSize", v[0])}
            /> */}
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          {/* <SidebarGroupLabel>
            Translation font size — {settings.translationFontSize}px
          </SidebarGroupLabel> */}
          <SidebarGroupContent className="px-3 pt-2">
            {/* <Slider
              min={12}
              max={28}
              step={1}
              value={[settings.translationFontSize]}
              onValueChange={(v) => update("translationFontSize", v[0])}
            /> */}
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border">
        {/* <Button variant="outline" size="sm" onClick={reset} className="gap-2">
          <RotateCcw className="h-3.5 w-3.5" />
          Reset to defaults
        </Button> */}
      </SidebarFooter>
    </Sidebar>
  );
}
