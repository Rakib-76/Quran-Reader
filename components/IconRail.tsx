import React from 'react';
import { Home, Grid, Send, Bookmark, LayoutDashboard } from 'lucide-react';

export default function IconRail() {
  const navItems = [
    { icon: <Home size={24} />, active: true },
    { icon: <Grid size={24} />, active: false },
    { icon: <Send size={24} />, active: false },
    { icon: <Bookmark size={24} />, active: false },
    { icon: <LayoutDashboard size={24} />, active: false },
  ];

  return (
    <div className="w-[72px] h-full flex flex-col items-center py-6 bg-white border-r border-border-soft shrink-0">
      {/* Top Logo PlaceHolder */}
      <div className="w-10 h-10 rounded-full bg-primary-green flex items-center justify-center text-white font-bold text-xl mb-auto cursor-pointer shadow-sm">
        Q
      </div>

      {/* Navigation Icons (Vertically Centered) */}
      <div className="flex flex-col gap-4">
        {navItems.map((item, index) => (
          <button
            key={index}
            className={`w-12 h-12 flex items-center justify-center rounded-2xl transition-all duration-200 
              ${
                item.active
                  ? 'bg-primary-green/10 text-primary-green'
                  : 'text-text-muted hover:bg-gray-100/80 hover:text-text-dark'
              }`}
            aria-label={`Nav item ${index + 1}`}
          >
            {item.icon}
          </button>
        ))}
      </div>

      {/* Bottom Spacer/Profile PlaceHolder */}
      <div className="mt-auto pt-6"></div>
    </div>
  );
}
