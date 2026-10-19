import React from 'react';
import {
  X,
  User,
  Settings,
  HelpCircle,
  CreditCard,
  Palette,
  LogOut,
  ShieldCheck,
  Check,
} from 'lucide-react';
import { sound } from '../utils/sound.ts';

interface SidebarDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenProfileBilling: () => void;
  onOpenSettings: () => void;
  onOpenFaq: () => void;
  currentTheme: string;
  onChangeTheme: (theme: string) => void;
  onLogoutSession: () => void;
}

export const SidebarDrawer: React.FC<SidebarDrawerProps> = ({
  isOpen,
  onClose,
  onOpenProfileBilling,
  onOpenSettings,
  onOpenFaq,
  currentTheme,
  onChangeTheme,
  onLogoutSession,
}) => {
  if (!isOpen) return null;

  const themes = [
    { id: 'dark', name: 'Bedrock Obsidian', color: '#0a0e11', accent: '#10b981' },
    { id: 'emerald', name: 'Emerald Matrix', color: '#05160e', accent: '#34d399' },
    { id: 'amethyst', name: 'Amethyst Nether', color: '#110d1a', accent: '#a855f7' },
    { id: 'light', name: 'Cyber Birch (Light)', color: '#f4ede4', accent: '#059669' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Dimmed backdrop */}
      <div
        className="fixed inset-0 bg-black/75 backdrop-blur-xs transition-opacity"
        onClick={() => {
          sound.playBlip();
          onClose();
        }}
      />

      {/* Drawer content */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Sidebar Menu"
        className="relative z-10 w-full max-w-xs sm:max-w-sm bg-[var(--bg-surface)] border-r-4 border-[var(--border-color)] h-full flex flex-col justify-between shadow-[8px_0_0_rgba(0,0,0,0.6)] animate-in slide-in-from-left duration-200"
      >
        {/* Top Header */}
        <div>
          <div className="p-4 border-b-2 border-[var(--border-color)] flex items-center justify-between bg-[#151f28]">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-[#10b981] border border-black flex items-center justify-center">
                <span className="font-pixel text-[10px] text-black">A</span>
              </div>
              <h2 className="font-pixel text-xs text-[#f5ebe0] tracking-wider">
                ALYTHRA ENGINE
              </h2>
            </div>
            <button
              onClick={() => {
                sound.playBlip();
                onClose();
              }}
              aria-label="Tutup menu"
              className="pixel-btn p-1.5 bg-[#253442] hover:bg-red-950 hover:text-red-400 text-[#f5ebe0] cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* User Profile Mini Card */}
          <div className="p-4 border-b-2 border-[var(--border-color)] bg-[#0d141a]">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-[#2a1d14] border-2 border-[#10b981] flex items-center justify-center shadow-[2px_2px_0_#000]">
                <span className="font-pixel text-base text-[#10b981]">OP</span>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-bold text-sm text-[#f5ebe0]">Alya Gracias</h3>
                  <ShieldCheck className="w-4 h-4 text-[#10b981]" />
                </div>
                <div className="flex items-center gap-1 text-[11px] text-[var(--text-muted)] mt-0.5">
                  <span className="font-pixel text-[8px] bg-[#fbbf24]/20 text-[#fbbf24] px-1 py-0.2 border border-[#fbbf24]/40">
                    MYTHIC TIER
                  </span>
                  <span>· Level 42</span>
                </div>
                <div className="flex items-center gap-1 mt-1 font-mono text-xs text-[#10b981]">
                  <span>Saldo: 4,850 Emeralds</span>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Links List */}
          <div className="p-3 space-y-1">
            <button
              onClick={() => {
                sound.playBlip();
                onClose();
                onOpenProfileBilling();
              }}
              className="w-full flex items-center gap-3 px-3 py-2.5 text-left text-xs font-medium hover:bg-[#1b2630] border-2 border-transparent hover:border-[var(--border-accent)] transition-all cursor-pointer"
            >
              <User className="w-4 h-4 text-[#06b6d4]" />
              <div className="flex-1">
                <span className="font-semibold block text-[#f5ebe0]">Profile &amp; Kredensial</span>
                <span className="text-[10px] text-[var(--text-muted)]">API Keys, session &amp; operator ID</span>
              </div>
            </button>

            <button
              onClick={() => {
                sound.playBlip();
                onClose();
                onOpenProfileBilling();
              }}
              className="w-full flex items-center gap-3 px-3 py-2.5 text-left text-xs font-medium hover:bg-[#1b2630] border-2 border-transparent hover:border-[var(--border-accent)] transition-all cursor-pointer"
            >
              <CreditCard className="w-4 h-4 text-[#fbbf24]" />
              <div className="flex-1">
                <span className="font-semibold block text-[#f5ebe0]">Billing &amp; Subscription</span>
                <span className="text-[10px] text-[var(--text-muted)]">Upgrade kuota &amp; tier Mythic</span>
              </div>
            </button>

            <button
              onClick={() => {
                sound.playBlip();
                onClose();
                onOpenSettings();
              }}
              className="w-full flex items-center gap-3 px-3 py-2.5 text-left text-xs font-medium hover:bg-[#1b2630] border-2 border-transparent hover:border-[var(--border-accent)] transition-all cursor-pointer"
            >
              <Settings className="w-4 h-4 text-[#ec4899]" />
              <div className="flex-1">
                <span className="font-semibold block text-[#f5ebe0]">Settings &amp; Ubuntu Config</span>
                <span className="text-[10px] text-[var(--text-muted)]">Chromium path, webhooks, rate limit</span>
              </div>
            </button>

            <button
              onClick={() => {
                sound.playBlip();
                onClose();
                onOpenFaq();
              }}
              className="w-full flex items-center gap-3 px-3 py-2.5 text-left text-xs font-medium hover:bg-[#1b2630] border-2 border-transparent hover:border-[var(--border-accent)] transition-all cursor-pointer"
            >
              <HelpCircle className="w-4 h-4 text-[#10b981]" />
              <div className="flex-1">
                <span className="font-semibold block text-[#f5ebe0]">FAQ &amp; Dokumentasi</span>
                <span className="text-[10px] text-[var(--text-muted)]">Tutorial Pairing Baileys &amp; Telegraf</span>
              </div>
            </button>
          </div>

          {/* Theme Switcher Section */}
          <div className="p-4 border-t-2 border-[var(--border-color)]">
            <div className="flex items-center gap-2 mb-2.5">
              <Palette className="w-4 h-4 text-[#10b981]" />
              <span className="font-pixel text-[9px] text-[#f5ebe0]">PILIH TEMA PIXEL</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {themes.map((t) => (
                <button
                  key={t.id}
                  onClick={() => {
                    sound.playBlip();
                    onChangeTheme(t.id);
                  }}
                  className={`p-2 border-2 text-left flex items-center justify-between text-[11px] cursor-pointer ${
                    currentTheme === t.id
                      ? 'border-[#10b981] bg-[#1a2b23]'
                      : 'border-[var(--border-color)] bg-[#0f151b] hover:border-gray-500'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span
                      className="w-3.5 h-3.5 border border-black inline-block"
                      style={{ backgroundColor: t.accent }}
                    />
                    <span className="truncate max-w-[85px] text-[#f5ebe0]">{t.name}</span>
                  </div>
                  {currentTheme === t.id && (
                    <Check className="w-3.5 h-3.5 text-[#10b981]" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Session Logout */}
        <div className="p-4 border-t-2 border-[var(--border-color)] bg-[#0c1217]">
          <button
            onClick={() => {
              sound.playError();
              onLogoutSession();
            }}
            className="w-full pixel-btn py-2 px-3 bg-[#3f1616] hover:bg-[#5c1c1c] text-red-200 flex items-center justify-center gap-2 text-xs font-semibold cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Putuskan Sesi / Reset Cache</span>
          </button>
          <div className="mt-2 text-center text-[10px] text-[var(--text-muted)] font-mono">
            Node: ubuntu-lts-x86_64 · Uptime: 99.98%
          </div>
        </div>
      </div>
    </div>
  );
};
