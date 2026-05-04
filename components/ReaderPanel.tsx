'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'next/navigation';
import { Play, Pause, Bookmark, MoreHorizontal, Loader2, Sun, Moon } from 'lucide-react';
import { getMergedSurah, MergedSurahData } from '@/lib/api';
import { useSettingsStore } from '@/store/useSettingsStore';

export default function ReaderPanel() {
  const { arabicFont, arabicFontSize, translationFontSize, theme, toggleTheme } = useSettingsStore();
  const params = useParams();
  const activeSurahId = params.id ? Number(params.id) : 1;

  const [data, setData] = useState<MergedSurahData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [playingAyah, setPlayingAyah] = useState<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    setIsLoading(true);
    getMergedSurah(activeSurahId).then((res) => {
      setData(res);
      setIsLoading(false);
    });
  }, [activeSurahId]);

  // Clean up audio on unmount or when changing surahs
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, [activeSurahId]);

  const togglePlay = (ayahGlobalNumber: number) => {
    // If the selected ayah is currently playing, pause it.
    if (playingAyah === ayahGlobalNumber) {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      setPlayingAyah(null);
      return;
    }

    // Stop current track if switching to a new verse
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    // Initialize new audio stream 
    const url = `https://cdn.islamic.network/quran/audio/128/ar.alafasy/${ayahGlobalNumber}.mp3`;
    const audio = new Audio(url);
    audioRef.current = audio;

    // Handle end of playback natively
    audio.addEventListener('ended', () => {
      setPlayingAyah(null);
    });

    audio.play().catch(console.error); // Catch standard browser auto-play locks visually
    setPlayingAyah(ayahGlobalNumber);
  };

  if (isLoading || !data) {
    return (
      <div className="flex-1 flex items-center justify-center h-full bg-white">
        <Loader2 className="animate-spin text-primary-green" size={32} />
      </div>
    );
  }

  // Choose correct CSS variable based on chosen font
  const fontFamilyVar = arabicFont === 'Amiri' ? 'var(--font-amiri)' : 'var(--font-scheherazade)';

  return (
    <div className="flex-1 flex flex-col h-full bg-white dark:bg-dark-panel overflow-hidden shadow-[-4px_0_24px_-4px_rgba(0,0,0,0.02)] z-10 relative transition-colors duration-300">

      {/* Centered Header Area */}
      <div className="py-6 md:py-10 border-b border-border-soft dark:border-dark-border flex flex-col items-center justify-center shrink-0 bg-white dark:bg-dark-panel relative transition-colors duration-300">

        {/* Toggle Theme Button Top Right */}
        <button
          onClick={toggleTheme}
          className="absolute top-6 right-6 md:top-8 md:right-8 p-2 rounded-full text-text-muted hover:text-primary-green hover:bg-primary-green/10 transition-colors"
        >
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-border-soft dark:via-dark-border to-transparent"></div>
        <h1 className="text-2xl md:text-[32px] font-bold text-text-dark dark:text-dark-text-primary mb-3 font-sans tracking-tight transition-colors">Surah {data.meta.englishName}</h1>
        <div className="bg-primary-green/5 px-5 py-1.5 rounded-full border border-primary-green/20 shadow-[0_2px_8px_-4px_rgba(76,140,63,0.2)]">
          <p className="text-[13px] font-bold tracking-wide uppercase text-primary-green opacity-90">Ayahs {data.meta.numberOfAyahs} • {data.meta.revelationType}</p>
        </div>
      </div>

      {/* Main Ayah Reading Space */}
      <div className="flex-1 overflow-y-auto px-5 md:px-10 lg:px-16 py-6 md:py-10 scroll-smooth">
        <div className="max-w-4xl mx-auto space-y-10 md:space-y-12">

          {data.mergedAyahs.map((ayah, index) => {
            const isPlaying = playingAyah === ayah.globalNumber;

            return (
              <React.Fragment key={ayah.numberInSurah}>
                <div className={`flex flex-col md:flex-row transition-all duration-500 ease-out p-5 md:p-6 -mx-2 md:-mx-6 rounded-[28px] ${isPlaying ? 'bg-primary-green/[0.04] shadow-[inset_0_0_0_1px_rgba(76,140,63,0.12)]' : 'group hover:bg-gray-50/60 dark:hover:bg-dark-card/50'}`}>

                  {/* Left Vertical Action Rail */}
                  <div className="flex flex-row md:flex-col items-center justify-between md:justify-start gap-4 md:gap-5 mb-5 md:mb-0 md:mr-8 shrink-0 md:py-2 w-full md:w-10">
                    <span className="text-[13px] font-bold text-primary-green bg-primary-green/10 px-3.5 py-1.5 md:px-0 md:w-full text-center rounded-lg shadow-sm">
                      {data.meta.number}:{ayah.numberInSurah}
                    </span>

                    <div className={`flex flex-row md:flex-col gap-6 md:gap-4 transition-all duration-300 ${isPlaying ? 'opacity-100 translate-y-0' : 'opacity-100 md:opacity-0 md:group-hover:opacity-100 md:translate-y-1 md:group-hover:translate-y-0'}`}>
                      <button
                        onClick={() => togglePlay(ayah.globalNumber)}
                        className={`transition-all duration-300 ${isPlaying ? 'text-primary-green scale-110 drop-shadow-sm' : 'text-text-muted hover:text-primary-green hover:scale-110 dark:hover:text-primary-green'}`}
                        aria-label="Play verse"
                      >
                        {isPlaying ? (
                          <Pause size={18} className="fill-primary-green text-primary-green" />
                        ) : (
                          <Play size={18} className="fill-transparent hover:fill-primary-green" />
                        )}
                      </button>
                      <button className="text-text-muted hover:text-primary-green hover:scale-110 transition-all duration-200" aria-label="Bookmark verse">
                        <Bookmark size={18} />
                      </button>
                      <button className="text-text-muted hover:text-primary-green hover:scale-110 transition-all duration-200" aria-label="More options">
                        <MoreHorizontal size={18} />
                      </button>
                    </div>
                  </div>

                  {/* Right Content */}
                  <div className="flex-1 min-w-0">
                    {/* Large Right-Aligned Arabic Text */}
                    <div className="text-right pb-8 pt-1">
                      <p
                        className="font-arabic font-medium antialiased text-text-dark dark:text-dark-text-primary optimize-legibility transition-colors"
                        style={{
                          fontFamily: fontFamilyVar,
                          fontSize: `${arabicFontSize}px`,
                          lineHeight: '2.4'
                        }}
                      >
                        {ayah.arabicText}
                      </p>
                    </div>

                    {/* English Translation */}
                    <div className="text-left border-l-[3px] border-border-soft dark:border-dark-border pl-5 py-1 transition-colors">
                      <span className="text-[11px] font-bold uppercase tracking-widest text-[#9BA89B] dark:text-dark-text-secondary/80 mb-2.5 block">
                        Sahih International
                      </span>
                      <p
                        className="text-text-dark/90 dark:text-dark-text-secondary leading-relaxed font-sans transition-colors"
                        style={{
                          fontSize: `${translationFontSize}px`
                        }}
                      >
                        {ayah.translationText}
                      </p>
                    </div>
                  </div>

                </div>

                {/* Soft Divider between Ayahs */}
                {index !== data.mergedAyahs.length - 1 && (
                  <div className="h-px bg-border-soft/60 dark:bg-dark-border w-full transition-colors" />
                )}
              </React.Fragment>
            );
          })}

        </div>
      </div>

    </div>
  );
}
