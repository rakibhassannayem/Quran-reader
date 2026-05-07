"use client";

import { useState, useRef, useCallback, useEffect } from "react";

const AUDIO_BASE = "https://cdn.islamic.network/quran/audio/128/ar.alafasy";

export function useAudioPlayer() {
  const [currentAyah, setCurrentAyah] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const maxAyahRef = useRef<number>(0);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const stop = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setCurrentAyah(null);
    setIsPlaying(false);
    setIsLoading(false);
  }, []);

  const playAyah = useCallback(
    (globalAyahNumber: number, maxAyah?: number) => {
      if (maxAyah) {
        maxAyahRef.current = maxAyah;
      }

      // If same ayah, toggle pause/play
      if (currentAyah === globalAyahNumber && audioRef.current) {
        if (isPlaying) {
          audioRef.current.pause();
          setIsPlaying(false);
        } else {
          audioRef.current.play();
          setIsPlaying(true);
        }
        return;
      }

      // Stop current
      if (audioRef.current) {
        audioRef.current.pause();
      }

      setIsLoading(true);
      setCurrentAyah(globalAyahNumber);

      const audio = new Audio(`${AUDIO_BASE}/${globalAyahNumber}.mp3`);
      audioRef.current = audio;

      audio.addEventListener("canplaythrough", () => {
        setIsLoading(false);
        setIsPlaying(true);
        audio.play().catch(() => {
          setIsPlaying(false);
          setIsLoading(false);
        });
      }, { once: true });

      audio.addEventListener("ended", () => {
        // Auto-advance to next ayah
        const next = globalAyahNumber + 1;
        if (maxAyahRef.current && next <= maxAyahRef.current) {
          playAyah(next);
        } else {
          setIsPlaying(false);
          setCurrentAyah(null);
        }
      }, { once: true });

      audio.addEventListener("error", () => {
        setIsLoading(false);
        setIsPlaying(false);
        setCurrentAyah(null);
      }, { once: true });

      audio.load();
    },
    [currentAyah, isPlaying],
  );

  return {
    currentAyah,
    isPlaying,
    isLoading,
    playAyah,
    stop,
  };
}
