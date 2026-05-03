'use client';

import React, { useState } from 'react';
import { Menu } from 'lucide-react';
import IconRail from './IconRail';
import SurahSidebar from './SurahSidebar';
import ReaderPanel from './ReaderPanel';
import SettingsPanel from './SettingsPanel';

export default function AppShell() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="flex flex-col md:flex-row h-full w-full bg-background selection:bg-primary-green/20">
      
      {/* Mobile Top Header (Visible only on mobile) */}
      <div className="md:hidden h-[64px] border-b border-border-soft bg-white flex items-center px-5 shrink-0 shadow-sm z-30">
        <button 
          onClick={() => setIsMobileMenuOpen(true)}
          className="p-2 -ml-2 rounded-xl text-text-dark hover:bg-gray-100 transition-colors"
        >
          <Menu size={22} className="text-text-dark" />
        </button>
        <div className="flex-1 flex justify-center items-center -ml-6">
          <div className="w-8 h-8 rounded-full bg-primary-green flex items-center justify-center text-white font-bold text-sm shadow-sm mr-2">
            Q
          </div>
          <span className="font-bold text-[17px] text-text-dark tracking-wide font-sans">QuranReader</span>
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
      
      <div className={`fixed inset-y-0 left-0 z-50 transform pointer-events-auto transition-transform duration-400 cubic-bezier(0.16, 1, 0.3, 1) md:relative md:translate-x-0 md:flex ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <SurahSidebar onClose={() => setIsMobileMenuOpen(false)} />
      </div>

      {/* Reader Panel - Flex 1 */}
      <div className="flex-1 flex min-w-0 bg-white">
        <ReaderPanel />
      </div>

      {/* Settings Panel - visible only on XL screens */}
      <div className="hidden xl:flex">
        <SettingsPanel />
      </div>
      
    </div>
  );
}
