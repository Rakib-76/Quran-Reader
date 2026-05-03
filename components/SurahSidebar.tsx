'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Search } from 'lucide-react';
import { getSurahs, SurahMeta } from '@/lib/api';

export default function SurahSidebar({ onClose }: { onClose?: () => void }) {
  const [surahs, setSurahs] = useState<SurahMeta[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const params = useParams();
  const activeSurahId = params.id ? Number(params.id) : 1;

  useEffect(() => {
    getSurahs().then((data) => setSurahs(data));
  }, []);

  const filteredSurahs = surahs.filter((surah) => {
    if (!searchQuery.trim()) return true;
    const lowerQuery = searchQuery.toLowerCase();
    return (
      surah.englishName.toLowerCase().includes(lowerQuery) ||
      surah.name.includes(lowerQuery) ||
      surah.englishNameTranslation.toLowerCase().includes(lowerQuery)
    );
  });

  return (
    <div className="w-[85vw] max-w-[360px] md:w-[340px] lg:w-[390px] h-full flex flex-col bg-background dark:bg-dark-sidebar border-r border-border-soft dark:border-dark-border shrink-0 shadow-2xl md:shadow-none transition-colors duration-300">
      
      {/* Header Area */}
      <div className="pt-6 pb-4 px-6 border-b border-border-soft dark:border-dark-border shrink-0 transition-colors duration-300">
        
        {/* Segmented Control */}
        <div className="bg-border-soft/50 dark:bg-dark-bg p-1 flex rounded-xl mb-6 transition-colors duration-300">
          <button className="flex-1 py-1.5 px-3 bg-white dark:bg-dark-border shadow-sm rounded-lg text-sm font-semibold text-text-dark dark:text-dark-text-primary transition-colors duration-300">
            Surah
          </button>
          <button className="flex-1 py-1.5 px-3 text-sm font-medium text-text-muted hover:text-text-dark dark:hover:text-dark-text-primary transition-colors">
            Juz
          </button>
          <button className="flex-1 py-1.5 px-3 text-sm font-medium text-text-muted hover:text-text-dark dark:hover:text-dark-text-primary transition-colors">
            Page
          </button>
        </div>

        {/* rounded search input */}
        <div className="relative">
          <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted" />
          <input
            type="text"
            placeholder="Search Surah..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white dark:bg-dark-bg border border-border-soft dark:border-dark-border rounded-full py-2.5 pl-10 pr-4 text-sm text-text-dark dark:text-dark-text-primary focus:outline-none focus:border-primary-green dark:focus:border-primary-green focus:ring-1 focus:ring-primary-green transition-colors placeholder:text-text-muted/70"
          />
        </div>
      </div>

      {/* Surah List Cards */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
        {filteredSurahs.map((surah) => {
          const isActive = activeSurahId === surah.number;
          return (
            <Link
              key={surah.number}
              href={`/surah/${surah.number}`}
              onClick={() => onClose?.()}
              className={`flex items-center p-3.5 rounded-[18px] cursor-pointer transition-all duration-300 group block border-2 ${
                isActive
                  ? 'bg-primary-green/5 border-primary-green/20 ring-1 ring-primary-green/10 shadow-[0_4px_16px_-4px_rgba(76,140,63,0.12)]'
                  : 'bg-white dark:bg-dark-card border-transparent hover:border-border-soft/60 dark:hover:border-dark-border hover:bg-gray-50/50 dark:hover:bg-dark-border hover:shadow-[0_8px_24px_-6px_rgba(0,0,0,0.04)] active:scale-[0.98]'
              }`}
            >
              {/* Left: Diamond Number Badge */}
              <div className="relative w-10 h-10 flex items-center justify-center shrink-0 mr-4">
                <div
                  className={`absolute inset-0 rotate-45 rounded-[8px] transition-colors ${
                    isActive
                      ? 'bg-primary-green text-white'
                      : 'bg-[#F2F4F1] dark:bg-[#2A3441] group-hover:bg-primary-green/10'
                  }`}
                ></div>
                <span
                  className={`relative z-10 font-bold text-sm transition-colors ${
                    isActive ? 'text-white' : 'text-text-dark dark:text-dark-text-primary group-hover:text-primary-green dark:group-hover:text-primary-green'
                  }`}
                >
                  {surah.number}
                </span>
              </div>

              {/* Center: English Name & Subtitle */}
              <div className="flex-1 min-w-0 pr-3">
                <h3 className={`font-semibold text-[15px] truncate transition-colors ${
                  isActive ? 'text-primary-green' : 'text-text-dark dark:text-dark-text-primary group-hover:text-primary-green'
                }`}>
                  {surah.englishName}
                </h3>
                <p className="text-xs text-text-muted mt-0.5 truncate uppercase tracking-widest font-medium opacity-80 transition-colors">
                  {surah.englishNameTranslation}
                </p>
              </div>

              {/* Right: Arabic Name */}
              <div className={`text-xl font-arabic shrink-0 transition-colors ${
                isActive ? 'text-primary-green' : 'text-text-dark dark:text-dark-text-primary group-hover:text-primary-green'
              }`}>
                {surah.name}
              </div>
            </Link>
          );
        })}

        {/* Bottom padding */}
        <div className="h-6"></div>
      </div>
    </div>
  );
}
