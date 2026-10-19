import React, { useState } from 'react';
import {
  Sparkles,
  Search,
  Filter,
  Sliders,
  CheckCircle,
  XCircle,
  Zap,
  Clock,
  Layers,
  ChevronRight,
  Shield,
} from 'lucide-react';
import type { BotFeature, FeatureCategory, FeatureTier } from '../types/index.ts';
import { filterBotFeatures } from '../utils/botLogic.ts';
import { sound } from '../utils/sound.ts';

interface FeatureManagerViewProps {
  features: BotFeature[];
  onToggleFeature: (id: string) => void;
  onOpenConfig: (feature: BotFeature) => void;
}

const CATEGORIES: (FeatureCategory | 'All')[] = [
  'All',
  'AI & Intelligence Layer',
  'Quantum Automation & System Engine',
  'Ultra Security & Counter-Forensics',
  'Dynamic Economy & Web3 Gamification',
  'Creative Synthetics & Studio Engine',
  'Cross-Protocol & Mirror Synchronization',
  'Intelligence Scraping & Deep Data Extraction',
  'Enterprise Infrastructure & High-Frequency Webhooks',
];

const TIERS: (FeatureTier | 'All')[] = ['All', 'Mythic', 'Elite', 'Pro', 'Free'];

export const FeatureManagerView: React.FC<FeatureManagerViewProps> = ({
  features,
  onToggleFeature,
  onOpenConfig,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<FeatureCategory | 'All'>('All');
  const [selectedTier, setSelectedTier] = useState<FeatureTier | 'All'>('All');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');

  const filteredFeatures = filterBotFeatures(
    features,
    searchQuery,
    selectedCategory,
    selectedTier,
    statusFilter
  );

  const activeCount = features.filter((f) => f.isActive).length;

  const getTierBadge = (tier: FeatureTier) => {
    switch (tier) {
      case 'Mythic':
        return (
          <span className="font-pixel text-[8px] bg-[#ec4899]/20 text-[#ec4899] border border-[#ec4899]/60 px-1.5 py-0.5 shadow-[1px_1px_0_#000]">
            MYTHIC
          </span>
        );
      case 'Elite':
        return (
          <span className="font-pixel text-[8px] bg-[#06b6d4]/20 text-[#06b6d4] border border-[#06b6d4]/60 px-1.5 py-0.5 shadow-[1px_1px_0_#000]">
            ELITE
          </span>
        );
      case 'Pro':
        return (
          <span className="font-pixel text-[8px] bg-[#10b981]/20 text-[#10b981] border border-[#10b981]/60 px-1.5 py-0.5 shadow-[1px_1px_0_#000]">
            PRO
          </span>
        );
      case 'Free':
      default:
        return (
          <span className="font-pixel text-[8px] bg-slate-800 text-slate-300 border border-slate-600 px-1.5 py-0.5 shadow-[1px_1px_0_#000]">
            FREE
          </span>
        );
    }
  };

  return (
    <div className="space-y-5 pb-24">
      {/* HUD Header */}
      <div className="pixel-panel p-5 bg-[#10171d] border-2 border-[var(--border-color)]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-pixel text-[9px] bg-[#ec4899] text-black px-1.5 py-0.5 font-bold shadow-[1px_1px_0_#000]">
                TOTAL: 127 FITUR EKSKLUSIF
              </span>
              <span className="text-xs text-[#10b981] font-mono">
                {activeCount} Aktif / {features.length - activeCount} Nonaktif
              </span>
            </div>
            <h1 className="font-pixel text-base sm:text-lg text-[#f5ebe0]">
              MATRIX FITUR BOT ALYTHRA
            </h1>
            <p className="text-xs text-[var(--text-muted)] mt-1">
              Daftar komprehensif 127 kapabilitas premium langka. Nyalakan, matikan, atau konfigurasi parameter tiap modul.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                sound.playSuccess();
                // Turn on all in current filter
                filteredFeatures.forEach((f) => {
                  if (!f.isActive) onToggleFeature(f.id);
                });
              }}
              className="pixel-btn px-3 py-1.5 bg-[#10b981] hover:bg-[#059669] text-black text-xs font-semibold cursor-pointer"
            >
              Aktifkan Terfilter
            </button>
            <button
              onClick={() => {
                sound.playBlip();
                // Turn off all in current filter
                filteredFeatures.forEach((f) => {
                  if (f.isActive) onToggleFeature(f.id);
                });
              }}
              className="pixel-btn px-3 py-1.5 bg-[#253442] hover:bg-[#33475b] text-[#f5ebe0] text-xs font-semibold cursor-pointer"
            >
              Nonaktifkan Terfilter
            </button>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="mt-4 pt-4 border-t border-[var(--border-color)] space-y-3">
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-[var(--text-muted)]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari dari 127 fitur (nama, deskripsi, #nomor)..."
                className="w-full bg-[#0a0e11] border-2 border-[var(--border-color)] pl-9 pr-3 py-2 text-xs sm:text-sm text-[#f5ebe0] font-mono focus:border-[#10b981] focus:outline-hidden"
              />
            </div>

            {/* Status Filter Tabs */}
            <div className="flex items-center gap-1 bg-[#0a0e11] p-1 border border-[var(--border-color)]">
              {(['all', 'active', 'inactive'] as const).map((st) => (
                <button
                  key={st}
                  onClick={() => {
                    sound.playBlip();
                    setStatusFilter(st);
                  }}
                  className={`px-3 py-1 text-xs font-mono capitalize transition-colors cursor-pointer ${
                    statusFilter === st
                      ? 'bg-[#1b2630] text-[#10b981] font-bold border border-[#10b981]/50'
                      : 'text-[var(--text-muted)] hover:text-[#f5ebe0]'
                  }`}
                >
                  {st === 'all' ? 'Semua' : st === 'active' ? 'Aktif' : 'Nonaktif'}
                </button>
              ))}
            </div>
          </div>

          {/* Tier Buttons */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="font-pixel text-[9px] text-[var(--text-muted)] mr-1">
              TIER:
            </span>
            {TIERS.map((tier) => (
              <button
                key={tier}
                onClick={() => {
                  sound.playBlip();
                  setSelectedTier(tier);
                }}
                className={`font-pixel text-[8px] sm:text-[9px] px-2.5 py-1 border transition-all cursor-pointer ${
                  selectedTier === tier
                    ? 'border-[#fbbf24] bg-[#fbbf24]/20 text-[#fbbf24]'
                    : 'border-[var(--border-color)] text-[var(--text-muted)] hover:text-[#f5ebe0]'
                }`}
              >
                {tier.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Category Dropdown / Scroll Bar */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-1">
            <span className="font-pixel text-[9px] text-[var(--text-muted)] shrink-0 mr-1">
              KATEGORI:
            </span>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  sound.playBlip();
                  setSelectedCategory(cat);
                }}
                className={`text-xs px-2.5 py-1 border transition-colors whitespace-nowrap cursor-pointer ${
                  selectedCategory === cat
                    ? 'border-[#10b981] bg-[#10b981]/20 text-[#10b981] font-semibold'
                    : 'border-[var(--border-color)] text-[var(--text-muted)] hover:text-[#f5ebe0] bg-[#0c1217]'
                }`}
              >
                {cat === 'All' ? 'Semua Kategori (8)' : cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Counter summary strip */}
      <div className="flex items-center justify-between text-xs font-mono text-[var(--text-muted)] px-1">
        <span>
          Menampilkan <strong className="text-[#f5ebe0]">{filteredFeatures.length}</strong> dari 127 fitur
        </span>
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="text-[#06b6d4] hover:underline cursor-pointer"
          >
            Reset Pencarian
          </button>
        )}
      </div>

      {/* 127 Features Card Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {filteredFeatures.map((feat) => (
          <div
            key={feat.id}
            className={`pixel-panel p-4 flex flex-col justify-between transition-all ${
              feat.isActive
                ? 'bg-[#111921] border-2 border-[var(--border-color)] hover:border-[#10b981]'
                : 'bg-[#0a0e11] border border-gray-800 opacity-70'
            }`}
          >
            <div>
              {/* Card Header: Number + Tier + Status indicator */}
              <div className="flex items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-1.5">
                  <span className="font-pixel text-[9px] bg-[#1a2530] text-[var(--text-muted)] px-1.5 py-0.5 border border-black">
                    #{String(feat.number).padStart(3, '0')}
                  </span>
                  {getTierBadge(feat.tier)}
                </div>

                {/* Status Dot */}
                <div className="flex items-center gap-1">
                  <span
                    className={`w-2 h-2 inline-block ${
                      feat.isActive
                        ? 'bg-[#10b981] shadow-[0_0_6px_#10b981]'
                        : 'bg-gray-600'
                    }`}
                  />
                  <span className="font-mono text-[10px] text-[var(--text-muted)] uppercase">
                    {feat.isActive ? 'Aktif' : 'Mati'}
                  </span>
                </div>
              </div>

              {/* Title & Category */}
              <h3 className="font-bold text-sm text-[#f5ebe0] leading-snug tracking-tight">
                {feat.name}
              </h3>
              <p className="text-[10px] text-[#06b6d4] font-mono mt-0.5">
                {feat.category}
              </p>

              {/* Description */}
              <p className="text-xs text-[var(--text-muted)] mt-2 line-clamp-3 leading-relaxed">
                {feat.description}
              </p>
            </div>

            {/* Footer: Metrics + Toggle + Config button */}
            <div className="mt-4 pt-3 border-t border-[var(--border-color)]">
              <div className="flex items-center justify-between text-[11px] font-mono text-[var(--text-muted)] mb-2.5">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-gray-500" />
                  <span className="tabular-nums">{feat.latencyMs} ms</span>
                </span>
                <span className="flex items-center gap-1">
                  <Zap className="w-3 h-3 text-amber-500" />
                  <span className="tabular-nums">{feat.usageCount.toLocaleString('id-ID')} calls</span>
                </span>
              </div>

              <div className="flex items-center gap-2">
                {/* Active / Inactive Toggle Button */}
                <button
                  onClick={() => {
                    sound.playToggle(!feat.isActive);
                    onToggleFeature(feat.id);
                  }}
                  className={`flex-1 pixel-btn py-1.5 px-2 text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer ${
                    feat.isActive
                      ? 'bg-[#143224] hover:bg-[#1b4230] text-[#10b981] border-[#10b981]'
                      : 'bg-[#221c1a] hover:bg-[#332a26] text-gray-400 border-gray-700'
                  }`}
                >
                  {feat.isActive ? (
                    <>
                      <CheckCircle className="w-3.5 h-3.5" />
                      <span>Aktif</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-3.5 h-3.5" />
                      <span>Mati</span>
                    </>
                  )}
                </button>

                {/* Config inspector button */}
                <button
                  onClick={() => {
                    sound.playBlip();
                    onOpenConfig(feat);
                  }}
                  title="Konfigurasi parameter fitur"
                  className="pixel-btn p-1.5 bg-[#1b2630] hover:bg-[#273847] text-[#f5ebe0] cursor-pointer"
                >
                  <Sliders className="w-3.5 h-3.5 text-[#06b6d4]" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
