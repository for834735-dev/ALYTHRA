import React from 'react';
import { Menu, Volume2, VolumeX, Shield, Radio, Sparkles } from 'lucide-react';
import { sound } from '../utils/sound.ts';
import type { BotStatus } from '../types/index.ts';

interface NavbarProps {
  onOpenSidebar: () => void;
  soundMuted: boolean;
  onToggleSound: () => void;
  waStatus: BotStatus;
  tgStatus: BotStatus;
  activeFeaturesCount: number;
  totalFeaturesCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenSidebar,
  soundMuted,
  onToggleSound,
  waStatus,
  tgStatus,
  activeFeaturesCount,
  totalFeaturesCount,
}) => {
  return (
    <header className="sticky top-0 z-30 w-full bg-[var(--bg-surface)] border-b-2 border-[var(--border-color)] px-4 py-3 flex items-center justify-between gap-4 shadow-[0_4px_0_rgba(0,0,0,0.4)]">
      {/* Zone 1: Hamburger Menu + Brand Wordmark */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => {
            sound.playBlip();
            onOpenSidebar();
          }}
          aria-label="Buka menu navigasi"
          className="pixel-btn p-2 bg-[#1b2630] text-[#f5ebe0] hover:bg-[#253442] flex items-center justify-center cursor-pointer"
        >
          <Menu className="w-5 h-5 text-[#10b981]" />
        </button>

        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-[#10b981] border-2 border-black flex items-center justify-center shadow-[1px_1px_0_#000]">
            <span className="font-pixel text-[11px] text-black font-bold">A</span>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-pixel text-sm md:text-base tracking-wider text-[#f5ebe0]">
                ALYTHRA
              </span>
              <span className="font-pixel text-[8px] bg-[#10b981]/20 text-[#10b981] px-1.5 py-0.5 border border-[#10b981]/40 hidden sm:inline-block">
                v4.8-MYTHIC
              </span>
            </div>
            <span className="text-[10px] text-[var(--text-muted)] tracking-wide hidden sm:block">
              Multi-Platform Bot Core (WA + TG)
            </span>
          </div>
        </div>
      </div>

      {/* Zone 2: Platform Status Overview */}
      <div className="hidden md:flex items-center gap-4 text-xs">
        <div className="flex items-center gap-2 px-2.5 py-1 bg-[#0f151b] border border-[var(--border-color)]">
          <span className="font-pixel text-[9px] text-[var(--text-muted)]">WA:</span>
          <span
            className={`font-mono font-semibold text-[11px] ${
              waStatus === 'online' ? 'text-[#10b981]' : 'text-[#f59e0b]'
            }`}
          >
            {waStatus.toUpperCase()}
          </span>
          <Radio className={`w-3.5 h-3.5 ${waStatus === 'online' ? 'text-[#10b981]' : 'text-[#f59e0b]'}`} />
        </div>

        <div className="flex items-center gap-2 px-2.5 py-1 bg-[#0f151b] border border-[var(--border-color)]">
          <span className="font-pixel text-[9px] text-[var(--text-muted)]">TG:</span>
          <span
            className={`font-mono font-semibold text-[11px] ${
              tgStatus === 'online' ? 'text-[#06b6d4]' : 'text-[#f59e0b]'
            }`}
          >
            {tgStatus.toUpperCase()}
          </span>
          <Radio className={`w-3.5 h-3.5 ${tgStatus === 'online' ? 'text-[#06b6d4]' : 'text-[#f59e0b]'}`} />
        </div>

        <div className="flex items-center gap-1.5 px-2.5 py-1 bg-[#10b981]/10 border border-[#10b981]/30 text-[#10b981]">
          <Sparkles className="w-3.5 h-3.5" />
          <span className="font-mono text-xs font-semibold tabular-nums">
            {activeFeaturesCount}/{totalFeaturesCount} Fitur Aktif
          </span>
        </div>
      </div>

      {/* Zone 3: Audio FX Toggle & Operator Level */}
      <div className="flex items-center gap-2">
        <button
          onClick={onToggleSound}
          aria-label={soundMuted ? 'Aktifkan suara 8-bit' : 'Bisukan suara 8-bit'}
          title={soundMuted ? 'Unmute Audio 8-bit' : 'Mute Audio 8-bit'}
          className="pixel-btn p-2 bg-[#1b2630] hover:bg-[#253442] text-[#f5ebe0] cursor-pointer"
        >
          {soundMuted ? (
            <VolumeX className="w-4 h-4 text-red-400" />
          ) : (
            <Volume2 className="w-4 h-4 text-[#10b981]" />
          )}
        </button>

        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-[#241812] border-2 border-[#4a3525] text-[#f5ebe0] shadow-[2px_2px_0_#000]">
          <Shield className="w-3.5 h-3.5 text-[#f59e0b]" />
          <span className="font-pixel text-[9px] text-[#fbbf24]">MYTHIC OPERATOR</span>
        </div>
      </div>
    </header>
  );
};
