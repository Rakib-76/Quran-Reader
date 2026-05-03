'use client';

import React, { useState } from 'react';
import { Settings, ChevronDown, ChevronUp, Type, Heart, BookOpen } from 'lucide-react';
import { useSettingsStore } from '@/store/useSettingsStore';

export default function SettingsPanel() {
  const [openSection, setOpenSection] = useState<'reading' | 'font' | null>('font');
  const [activeTab, setActiveTab] = useState<'translation' | 'reading'>('translation');

  const {
    arabicFont,
    setArabicFont,
    arabicFontSize,
    setArabicFontSize,
    translationFontSize,
    setTranslationFontSize,
  } = useSettingsStore();

  const toggleSection = (section: 'reading' | 'font') => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <div className="w-[360px] h-full bg-background dark:bg-dark-sidebar border-l border-border-soft dark:border-dark-border flex flex-col shrink-0 transition-colors duration-300">
      
      {/* Header */}
      <div className="h-[72px] flex items-center justify-between px-6 border-b border-border-soft dark:border-dark-border shrink-0 transition-colors duration-300">
        <span className="uppercase text-[13px] font-bold tracking-wider text-text-dark dark:text-dark-text-primary transition-colors">Settings</span>
        <Settings size={18} className="text-text-muted" />
      </div>

      <div className="flex-1 overflow-y-auto p-6 flex flex-col">
        
        {/* Top Segmented Toggle */}
        <div className="bg-border-soft/60 dark:bg-dark-bg p-1 flex rounded-[10px] mb-8 shrink-0 transition-colors duration-300">
          <button 
            onClick={() => setActiveTab('translation')}
            className={`flex-1 py-1.5 px-3 rounded-lg text-sm transition-all duration-200 ${
              activeTab === 'translation' 
                ? 'bg-white dark:bg-dark-border shadow-sm font-semibold text-text-dark dark:text-dark-text-primary' 
                : 'font-medium text-text-muted hover:text-text-dark dark:hover:text-dark-text-primary'
            }`}
          >
            Translation
          </button>
          <button 
            onClick={() => setActiveTab('reading')}
            className={`flex-1 py-1.5 px-3 rounded-lg text-sm transition-all duration-200 ${
              activeTab === 'reading' 
                ? 'bg-white dark:bg-dark-border shadow-sm font-semibold text-text-dark dark:text-dark-text-primary' 
                : 'font-medium text-text-muted hover:text-text-dark dark:hover:text-dark-text-primary'
            }`}
          >
            Reading
          </button>
        </div>

        {/* Accordions */}
        <div className="space-y-2 flex-1">
          
          {/* Reading Settings Accordion */}
          <div className="border border-border-soft dark:border-dark-border bg-white dark:bg-dark-bg transition-colors duration-300 rounded-2xl overflow-hidden shadow-sm">
            <button 
              onClick={() => toggleSection('reading')} 
              className="w-full flex items-center justify-between p-4 bg-white dark:bg-dark-bg hover:bg-gray-50 dark:hover:bg-dark-border transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-background dark:bg-dark-sidebar flex items-center justify-center text-primary-green transition-colors">
                  <BookOpen size={16} />
                </div>
                <span className="font-semibold text-[15px] text-text-dark dark:text-dark-text-primary transition-colors">Reading Settings</span>
              </div>
              <div className="text-text-muted">
                {openSection === 'reading' ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </div>
            </button>
            
            {openSection === 'reading' && (
              <div className="px-4 pb-5 pt-1 space-y-4 border-t border-border-soft/50 dark:border-dark-border/50 bg-white dark:bg-dark-bg transition-colors">
                <p className="text-sm text-text-muted">Reading settings configuration will appear here.</p>
              </div>
            )}
          </div>

          {/* Font Settings Accordion */}
          <div className="border border-border-soft dark:border-dark-border bg-white dark:bg-dark-bg transition-colors duration-300 rounded-2xl overflow-hidden shadow-sm">
            <button 
              onClick={() => toggleSection('font')} 
              className="w-full flex items-center justify-between p-4 bg-white dark:bg-dark-bg hover:bg-gray-50 dark:hover:bg-dark-border transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-background dark:bg-dark-sidebar flex items-center justify-center text-primary-green transition-colors">
                  <Type size={16} />
                </div>
                <span className="font-semibold text-[15px] text-text-dark dark:text-dark-text-primary transition-colors">Font Settings</span>
              </div>
              <div className="text-text-muted">
                {openSection === 'font' ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </div>
            </button>
            
            {openSection === 'font' && (
              <div className="px-4 pb-6 pt-3 space-y-6 border-t border-border-soft/50 dark:border-dark-border/50 bg-white dark:bg-dark-bg transition-colors">
                
                {/* Arabic Font Face */}
                <div className="space-y-2.5">
                  <label className="text-sm font-semibold text-text-dark dark:text-dark-text-primary transition-colors block">Arabic Font Face</label>
                  <select 
                    value={arabicFont}
                    onChange={(e) => setArabicFont(e.target.value)}
                    className="w-full bg-background dark:bg-dark-sidebar border border-border-soft dark:border-dark-border rounded-xl py-2.5 px-3 text-[14px] font-medium text-text-dark dark:text-dark-text-primary focus:outline-none focus:border-primary-green dark:focus:border-primary-green focus:ring-1 focus:ring-primary-green appearance-none cursor-pointer transition-colors"
                  >
                    <option value="Amiri">Amiri</option>
                    <option value="Scheherazade New">Scheherazade New</option>
                  </select>
                </div>

                {/* Arabic Font Size */}
                <div className="space-y-3 pt-2">
                  <div className="flex justify-between items-center text-sm transition-colors">
                    <span className="font-semibold text-text-dark dark:text-dark-text-primary transition-colors">Arabic Size</span>
                    <span className="text-text-muted font-medium bg-background dark:bg-dark-sidebar px-2 py-0.5 rounded-md text-xs transition-colors">{arabicFontSize}px</span>
                  </div>
                  <input 
                    type="range" 
                    min="20" 
                    max="80" 
                    value={arabicFontSize}
                    onChange={(e) => setArabicFontSize(Number(e.target.value))}
                    className="w-full h-1.5 bg-border-soft dark:bg-dark-border rounded-lg appearance-none cursor-pointer accent-primary-green transition-colors" 
                  />
                </div>

                {/* Translation Font Size */}
                <div className="space-y-3 pt-2">
                  <div className="flex justify-between items-center text-sm transition-colors">
                    <span className="font-semibold text-text-dark dark:text-dark-text-primary transition-colors">Translation Size</span>
                    <span className="text-text-muted font-medium bg-background dark:bg-dark-sidebar px-2 py-0.5 rounded-md text-xs transition-colors">{translationFontSize}px</span>
                  </div>
                  <input 
                    type="range" 
                    min="12" 
                    max="40" 
                    value={translationFontSize}
                    onChange={(e) => setTranslationFontSize(Number(e.target.value))}
                    className="w-full h-1.5 bg-border-soft dark:bg-dark-border rounded-lg appearance-none cursor-pointer accent-primary-green relative z-10 transition-colors" 
                  />
                </div>

              </div>
            )}
          </div>

        </div>

        {/* Support Support Card Bottom */}
        <div className="mt-8 pt-4">
          <div className="bg-primary-green/5 border border-primary-green/20 rounded-2xl p-5 text-center relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary-green to-transparent opacity-50"></div>
            
            <div className="w-12 h-12 bg-white dark:bg-dark-bg rounded-full flex items-center justify-center mx-auto mb-3 shadow-sm text-primary-green group-hover:scale-110 transition-transform duration-300">
              <Heart size={20} className="fill-primary-green/10" />
            </div>
            
            <h3 className="text-[15px] font-bold text-text-dark dark:text-dark-text-primary mb-1.5 transition-colors">Support Us</h3>
            <p className="text-xs text-text-muted mb-4 leading-relaxed px-2">
              Help us maintain and add new features to the platform.
            </p>
            
            <button className="w-full bg-primary-green text-white rounded-xl py-2.5 text-sm font-semibold shadow-sm hover:shadow hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200">
              Donate Now
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
