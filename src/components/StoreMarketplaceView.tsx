import React, { useState } from 'react';
import {
  ShoppingBag,
  Sparkles,
  Download,
  Check,
  Star,
  Tag,
  Shield,
  Layers,
  Search,
} from 'lucide-react';
import type { MarketplacePlugin } from '../types/index.ts';
import { sound } from '../utils/sound.ts';

interface StoreMarketplaceViewProps {
  items: MarketplacePlugin[];
  emeralds: number;
  onInstallPlugin: (id: string) => void;
  onUninstallPlugin: (id: string) => void;
}

export const StoreMarketplaceView: React.FC<StoreMarketplaceViewProps> = ({
  items,
  emeralds,
  onInstallPlugin,
  onUninstallPlugin,
}) => {
  const [filterQuery, setFilterQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', 'Security & Forensics', 'Creative Audio', 'Economy & Gamification', 'Web Scraping', 'AI Model', 'Privacy Stealth'];

  const filteredItems = items.filter((item) => {
    const matchesQuery =
      !filterQuery ||
      item.name.toLowerCase().includes(filterQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(filterQuery.toLowerCase());
    const matchesCat = activeCategory === 'All' || item.category === activeCategory;
    return matchesQuery && matchesCat;
  });

  return (
    <div className="space-y-6 pb-24">
      {/* HUD Header with Emerald Balance */}
      <div className="pixel-panel p-5 bg-[#10171d] border-2 border-[var(--border-color)]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-pixel text-[9px] bg-[#10b981] text-black px-1.5 py-0.5 font-bold shadow-[1px_1px_0_#000]">
                MARKETPLACE PLUGIN RESMI
              </span>
              <span className="text-xs text-[var(--text-muted)] font-mono">
                Verified Engine Packages
              </span>
            </div>
            <h1 className="font-pixel text-base sm:text-lg text-[#f5ebe0]">
              ALYTHRA PLUGIN BAZAAR
            </h1>
            <p className="text-xs text-[var(--text-muted)] mt-1">
              Pasang modul ekstra berkinerja tinggi langsung ke node WhatsApp &amp; Telegram Anda.
            </p>
          </div>

          {/* Emerald Wallet Card */}
          <div className="flex items-center gap-3 p-3 bg-[#0a1811] border-2 border-[#10b981] shadow-[3px_3px_0_#000]">
            <div className="w-8 h-8 bg-[#10b981] border border-black flex items-center justify-center text-black font-bold font-pixel text-sm">
              E
            </div>
            <div>
              <span className="text-[10px] text-[var(--text-muted)] block font-mono">
                Saldo Akun Anda:
              </span>
              <span className="font-pixel text-sm sm:text-base text-[#10b981] tabular-nums">
                {emeralds.toLocaleString('id-ID')} EM
              </span>
            </div>
          </div>
        </div>

        {/* Search & Categories */}
        <div className="mt-4 pt-4 border-t border-[var(--border-color)] space-y-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-[var(--text-muted)]" />
            <input
              type="text"
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              placeholder="Cari plugin, modul audio, security tunnel..."
              className="w-full bg-[#0a0e11] border-2 border-[var(--border-color)] pl-9 pr-3 py-2 text-xs sm:text-sm text-[#f5ebe0] font-mono focus:border-[#10b981] focus:outline-hidden"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  sound.playBlip();
                  setActiveCategory(cat);
                }}
                className={`text-xs px-2.5 py-1 border transition-colors whitespace-nowrap cursor-pointer ${
                  activeCategory === cat
                    ? 'border-[#10b981] bg-[#10b981]/20 text-[#10b981] font-semibold'
                    : 'border-[var(--border-color)] text-[var(--text-muted)] hover:text-[#f5ebe0] bg-[#0c1217]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Item Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="pixel-panel p-4 bg-[#111921] border-2 border-[var(--border-color)] hover:border-[#10b981] flex flex-col justify-between"
          >
            <div>
              {/* Badge + Price */}
              <div className="flex items-center justify-between mb-2">
                <span className="font-pixel text-[8px] bg-[#fbbf24]/20 text-[#fbbf24] border border-[#fbbf24]/50 px-1.5 py-0.5">
                  {item.tag}
                </span>

                <div className="flex items-center gap-1 font-mono text-xs font-bold text-[#10b981]">
                  <span>{item.priceEmerald}</span>
                  <span className="text-[10px] text-[var(--text-muted)]">EM</span>
                </div>
              </div>

              {/* Title & Version */}
              <h3 className="font-bold text-sm text-[#f5ebe0]">
                {item.name}
              </h3>
              <div className="flex items-center gap-2 text-[10px] text-[var(--text-muted)] font-mono mt-0.5">
                <span>{item.version}</span>
                <span>·</span>
                <span>{item.author}</span>
              </div>

              {/* Description */}
              <p className="text-xs text-[var(--text-muted)] mt-2 leading-relaxed">
                {item.description}
              </p>

              {/* Rating & Downloads */}
              <div className="flex items-center gap-3 text-[11px] font-mono text-[var(--text-muted)] mt-3">
                <span className="flex items-center gap-1 text-amber-400">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span>{item.rating}</span>
                </span>
                <span className="flex items-center gap-1">
                  <Download className="w-3.5 h-3.5" />
                  <span>{item.downloads.toLocaleString('id-ID')} unduhan</span>
                </span>
              </div>
            </div>

            {/* Install Button */}
            <div className="mt-4 pt-3 border-t border-[var(--border-color)]">
              {item.installed ? (
                <div className="flex items-center gap-2">
                  <div className="flex-1 py-1.5 px-3 bg-[#132c20] border border-[#10b981] text-[#10b981] text-xs font-semibold flex items-center justify-center gap-1.5">
                    <Check className="w-3.5 h-3.5" />
                    <span>Terpasang di Node</span>
                  </div>
                  <button
                    onClick={() => {
                      sound.playError();
                      onUninstallPlugin(item.id);
                    }}
                    className="pixel-btn px-2.5 py-1.5 bg-[#2c1717] hover:bg-[#3d1f1f] text-red-300 text-xs cursor-pointer"
                  >
                    Hapus
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    sound.playSuccess();
                    onInstallPlugin(item.id);
                  }}
                  className="w-full pixel-btn py-2 px-3 bg-[#10b981] hover:bg-[#059669] text-black font-semibold text-xs flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Pasang Plugin ({item.priceEmerald} EM)</span>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
