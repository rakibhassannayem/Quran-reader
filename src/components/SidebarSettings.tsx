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
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSettings, arabicFontFamily, type ArabicFont } from "@/lib/settings";
import { Settings as SettingsIcon, RotateCcw } from "lucide-react";

const ARABIC_FONTS: { id: ArabicFont; label: string }[] = [
  { id: "amiri", label: "Amiri (Naskh)" },
  { id: "noto", label: "Noto Naskh Arabic" },
];

export function SidebarSettings() {
  const { settings, update, reset } = useSettings();

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
          <SidebarGroupLabel>Arabic font</SidebarGroupLabel>
          <SidebarGroupContent className="px-2 space-y-2">
            <Select
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
            </Select>
            <div
              className="arabic mt-2 rounded-md border border-border bg-card px-3 py-2 text-2xl text-center"
              style={{ fontFamily: arabicFontFamily(settings.arabicFont) }}
            >
              بِسْمِ اللَّهِ
            </div>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="flex justify-between">
            <span>Arabic font size</span>
            <span>{settings.arabicFontSize}px</span>
          </SidebarGroupLabel>
          <SidebarGroupContent className="px-3 pt-4 pb-2">
            <Slider
              min={24}
              max={64}
              step={1}
              value={[settings.arabicFontSize]}
              onValueChange={(v) => {
                const val = Array.isArray(v) ? v[0] : v;
                update("arabicFontSize", val as number);
              }}
            />
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="flex justify-between">
            <span>Translation font size</span>
            <span>{settings.translationFontSize}px</span>
          </SidebarGroupLabel>
          <SidebarGroupContent className="px-3 pt-4 pb-2">
            <Slider
              min={14}
              max={28}
              step={1}
              value={[settings.translationFontSize]}
              onValueChange={(v) => {
                const val = Array.isArray(v) ? v[0] : v;
                update("translationFontSize", val as number);
              }}
            />
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border p-4">
        <Button variant="outline" size="sm" onClick={reset} className="gap-2 w-full">
          <RotateCcw className="h-3.5 w-3.5" />
          Reset to defaults
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
