import React from 'react';
import { Terminal, Bot, Sparkles, BarChart3, ShoppingBag } from 'lucide-react';
import { sound } from '../utils/sound.ts';

export type NavTab = 'bot' | 'console' | 'features' | 'analytics' | 'store';

interface BottomNavProps {
  activeTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  unreadLogsCount?: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onSelectTab,
  unreadLogsCount = 0,
}) => {
  const tabs = [
    {
      id: 'bot' as NavTab,
      label: 'Bot Status',
      icon: Bot,
      color: 'text-[#10b981]',
    },
    {
      id: 'console' as NavTab,
      label: 'Console',
      icon: Terminal,
      color: 'text-[#06b6d4]',
      badge: unreadLogsCount > 0 ? `${unreadLogsCount}` : undefined,
    },
    {
      id: 'features' as NavTab,
      label: '127 Fitur',
      icon: Sparkles,
      color: 'text-[#ec4899]',
    },
    {
      id: 'analytics' as NavTab,
      label: 'Analytics',
      icon: BarChart3,
      color: 'text-[#f59e0b]',
    },
    {
      id: 'store' as NavTab,
      label: 'Store',
      icon: ShoppingBag,
      color: 'text-[#10b981]',
    },
  ];

  return (
    <nav
      aria-label="Navigasi Utama Bawah"
      className="fixed bottom-0 left-0 right-0 z-30 bg-[var(--bg-surface)] border-t-2 border-[var(--border-color)] px-2 py-2 flex items-center justify-around shadow-[0_-4px_0_rgba(0,0,0,0.5)]"
    >
      <div className="w-full max-w-4xl mx-auto flex items-center justify-between gap-1">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;

          return (
            <button
              key={tab.id}
              onClick={() => {
                sound.playBlip();
                onSelectTab(tab.id);
              }}
              className={`flex-1 flex flex-col items-center justify-center py-1.5 px-2 transition-all relative cursor-pointer ${
                isActive
                  ? 'bg-[#1b2630] border-2 border-[var(--border-accent)] shadow-[2px_2px_0_#000] -translate-y-1'
                  : 'hover:bg-[#151e26] border-2 border-transparent'
              }`}
            >
              <div className="relative">
                <Icon
                  className={`w-5 h-5 ${
                    isActive ? tab.color : 'text-[var(--text-muted)]'
                  }`}
                />
                {tab.badge && (
                  <span className="absolute -top-1.5 -right-3 font-pixel text-[8px] bg-red-600 text-white px-1 py-0.2 border border-black shadow-[1px_1px_0_#000]">
                    {tab.badge}
                  </span>
                )}
              </div>
              <span
                className={`font-pixel text-[8px] sm:text-[9px] mt-1 tracking-tight ${
                  isActive ? 'text-[#f5ebe0] font-bold' : 'text-[var(--text-muted)]'
                }`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
