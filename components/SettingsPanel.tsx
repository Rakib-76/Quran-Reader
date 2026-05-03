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
    <div className="w-[360px] h-full bg-background border-l border-border-soft flex flex-col shrink-0">
      
      {/* Header */}
      <div className="h-[72px] flex items-center justify-between px-6 border-b border-border-soft shrink-0">
        <span className="uppercase text-[13px] font-bold tracking-wider text-text-dark">Settings</span>
        <Settings size={18} className="text-text-muted" />
      </div>

      <div className="flex-1 overflow-y-auto p-6 flex flex-col">
        
        {/* Top Segmented Toggle */}
        <div className="bg-border-soft/60 p-1 flex rounded-[10px] mb-8 shrink-0">
          <button 
            onClick={() => setActiveTab('translation')}
            className={`flex-1 py-1.5 px-3 rounded-lg text-sm transition-all duration-200 ${
              activeTab === 'translation' 
                ? 'bg-white shadow-sm font-semibold text-text-dark' 
                : 'font-medium text-text-muted hover:text-text-dark'
            }`}
          >
            Translation
          </button>
          <button 
            onClick={() => setActiveTab('reading')}
            className={`flex-1 py-1.5 px-3 rounded-lg text-sm transition-all duration-200 ${
              activeTab === 'reading' 
                ? 'bg-white shadow-sm font-semibold text-text-dark' 
                : 'font-medium text-text-muted hover:text-text-dark'
            }`}
          >
            Reading
          </button>
        </div>

        {/* Accordions */}
        <div className="space-y-2 flex-1">
          
          {/* Reading Settings Accordion */}
          <div className="border border-border-soft bg-white rounded-2xl overflow-hidden shadow-sm transition-all">
            <button 
              onClick={() => toggleSection('reading')} 
              className="w-full flex items-center justify-between p-4 bg-white hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-background flex items-center justify-center text-primary-green">
                  <BookOpen size={16} />
                </div>
                <span className="font-semibold text-[15px] text-text-dark">Reading Settings</span>
              </div>
              <div className="text-text-muted">
                {openSection === 'reading' ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </div>
            </button>
            
            {openSection === 'reading' && (
              <div className="px-4 pb-5 pt-1 space-y-4 border-t border-border-soft/50 bg-white">
                <p className="text-sm text-text-muted">Reading settings configuration will appear here.</p>
              </div>
            )}
          </div>

          {/* Font Settings Accordion */}
          <div className="border border-border-soft bg-white rounded-2xl overflow-hidden shadow-sm transition-all">
            <button 
              onClick={() => toggleSection('font')} 
              className="w-full flex items-center justify-between p-4 bg-white hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-background flex items-center justify-center text-primary-green">
                  <Type size={16} />
                </div>
                <span className="font-semibold text-[15px] text-text-dark">Font Settings</span>
              </div>
              <div className="text-text-muted">
                {openSection === 'font' ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </div>
            </button>
            
            {openSection === 'font' && (
              <div className="px-4 pb-6 pt-3 space-y-6 border-t border-border-soft/50 bg-white">
                
                {/* Arabic Font Face */}
                <div className="space-y-2.5">
                  <label className="text-sm font-semibold text-text-dark block">Arabic Font Face</label>
                  <select 
                    value={arabicFont}
                    onChange={(e) => setArabicFont(e.target.value)}
                    className="w-full bg-background border border-border-soft rounded-xl py-2.5 px-3 text-[14px] font-medium text-text-dark focus:outline-none focus:border-primary-green focus:ring-1 focus:ring-primary-green appearance-none cursor-pointer"
                  >
                    <option value="Amiri">Amiri</option>
                    <option value="Scheherazade New">Scheherazade New</option>
                  </select>
                </div>

                {/* Arabic Font Size */}
                <div className="space-y-3 pt-2">
                  <div className="flex justify-between items-center text-sm">
                    <span className="font-semibold text-text-dark">Arabic Size</span>
                    <span className="text-text-muted font-medium bg-background px-2 py-0.5 rounded-md text-xs">{arabicFontSize}px</span>
                  </div>
                  <input 
                    type="range" 
                    min="20" 
                    max="80" 
                    value={arabicFontSize}
                    onChange={(e) => setArabicFontSize(Number(e.target.value))}
                    className="w-full h-1.5 bg-border-soft rounded-lg appearance-none cursor-pointer accent-primary-green" 
                  />
                </div>

                {/* Translation Font Size */}
                <div className="space-y-3 pt-2">
                  <div className="flex justify-between items-center text-sm">
                    <span className="font-semibold text-text-dark">Translation Size</span>
                    <span className="text-text-muted font-medium bg-background px-2 py-0.5 rounded-md text-xs">{translationFontSize}px</span>
                  </div>
                  <input 
                    type="range" 
                    min="12" 
                    max="40" 
                    value={translationFontSize}
                    onChange={(e) => setTranslationFontSize(Number(e.target.value))}
                    className="w-full h-1.5 bg-border-soft rounded-lg appearance-none cursor-pointer accent-primary-green relative z-10" 
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
            
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-sm text-primary-green group-hover:scale-110 transition-transform duration-300">
              <Heart size={20} className="fill-primary-green/10" />
            </div>
            
            <h3 className="text-[15px] font-bold text-text-dark mb-1.5">Support Us</h3>
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
