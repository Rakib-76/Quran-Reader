'use client';

import React, { useState, useEffect } from 'react';
import { Menu } from 'lucide-react';
import IconRail from './IconRail';
import SurahSidebar from './SurahSidebar';
import ReaderPanel from './ReaderPanel';
import SettingsPanel from './SettingsPanel';
import { useSettingsStore } from '@/store/useSettingsStore';

export default function AppShell() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme } = useSettingsStore();

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // Prevent hydration mismatch hiding main node temporarily isn't strictly needed for tailwind classes 
  // but let's map the dark root transition
  return (
    <div className="flex-1 flex flex-col md:flex-row h-full w-full min-h-0 bg-background dark:bg-dark-bg selection:bg-primary-green/20 transition-colors duration-300">

      {/* Mobile Top Header (Visible only on mobile) */}
      <div className="md:hidden h-[64px] border-b border-border-soft dark:border-dark-border bg-white dark:bg-dark-sidebar flex items-center px-5 shrink-0 shadow-sm z-30 transition-colors duration-300">
        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className="p-2 -ml-2 rounded-xl text-text-dark dark:text-dark-text-primary hover:bg-gray-100 dark:hover:bg-dark-border transition-colors duration-300"
        >
          <Menu size={22} className="text-text-dark dark:text-dark-text-primary" />
        </button>
        <div className="flex-1 flex justify-center items-center -ml-6">
          <div className="w-8 h-8 rounded-full bg-primary-green flex items-center justify-center text-white font-bold text-sm shadow-sm mr-2 transition-colors duration-300">
            Q
          </div>
          <span className="font-bold text-[17px] text-text-dark dark:text-dark-text-primary tracking-wide font-sans transition-colors duration-300">QuranReader</span>
        </div>
      </div>

      {/* Icon Rail (Hidden on mobile, visible on md+) */}
      <div className="hidden md:flex">
        <IconRail />
      </div>

      {/* Surah Sidebar (Slide drawer on mobile, static on md+) */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-[#00000020] backdrop-blur-[2px] z-40 md:hidden transition-opacity"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <div className={`fixed inset-y-0 left-0 z-50 transform transition-transform duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] md:relative md:translate-x-0 md:pointer-events-auto md:flex ${isMobileMenuOpen ? 'translate-x-0 pointer-events-auto' : '-translate-x-full pointer-events-none'}`}>
        <SurahSidebar onClose={() => setIsMobileMenuOpen(false)} />
      </div>

      {/* Reader Panel - Flex 1 */}
      <div className="flex-1 flex min-w-0 min-h-0 bg-white dark:bg-dark-panel transition-colors duration-300">
        <ReaderPanel />
      </div>

      {/* Settings Panel - visible only on XL screens */}
      <div className="hidden xl:flex">
        <SettingsPanel />
      </div>

    </div>
  );
}
