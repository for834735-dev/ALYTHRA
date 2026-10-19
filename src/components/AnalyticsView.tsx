import React from 'react';
import {
  BarChart3,
  Activity,
  Zap,
  TrendingUp,
  Cpu,
  Layers,
  Shield,
  Smartphone,
  Send,
} from 'lucide-react';
import { ANALYTICS_DATA } from '../data/mockData.ts';

export const AnalyticsView: React.FC = () => {
  const maxDayTraffic = Math.max(
    ...ANALYTICS_DATA.dailyTraffic.map((d) => d.wa + d.tg)
  );

  return (
    <div className="space-y-6 pb-24">
      {/* HUD Header */}
      <div className="pixel-panel p-5 bg-[#10171d] border-2 border-[var(--border-color)]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-pixel text-[9px] bg-[#f59e0b] text-black px-1.5 py-0.5 font-bold shadow-[1px_1px_0_#000]">
                TELEMETRY ENGINE
              </span>
              <span className="text-xs text-[var(--text-muted)] font-mono">
                Cluster Node #1 Metrics
              </span>
            </div>
            <h1 className="font-pixel text-base sm:text-lg text-[#f5ebe0]">
              ANALYTICS &amp; TRAFFIC RADAR
            </h1>
            <p className="text-xs text-[var(--text-muted)] mt-1">
              Analisis throughput pesan real-time, rasio beban WhatsApp vs Telegram, dan latency sistem.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-[#10b981] bg-[#0c1318] p-2.5 border border-[var(--border-color)]">
            <Activity className="w-4 h-4 text-[#10b981] animate-pulse" />
            <span>Throughput: 98.4 msg/s</span>
          </div>
        </div>
      </div>

      {/* KPI Cards Strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
        <div className="pixel-panel p-4 bg-[#111921] border-2 border-[var(--border-color)]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-[var(--text-muted)]">Total Pesan Hari Ini</span>
            <Send className="w-4 h-4 text-[#10b981]" />
          </div>
          <div className="font-pixel text-lg sm:text-xl text-[#f5ebe0] tabular-nums">
            147,420
          </div>
          <div className="text-[11px] text-[#10b981] font-mono mt-1">
            +18.4% vs kemarin
          </div>
        </div>

        <div className="pixel-panel p-4 bg-[#111921] border-2 border-[var(--border-color)]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-[var(--text-muted)]">Rata-rata Latency</span>
            <Zap className="w-4 h-4 text-[#06b6d4]" />
          </div>
          <div className="font-pixel text-lg sm:text-xl text-[#06b6d4] tabular-nums">
            14.2 ms
          </div>
          <div className="text-[11px] text-[var(--text-muted)] font-mono mt-1">
            Sub-20ms threshold
          </div>
        </div>

        <div className="pixel-panel p-4 bg-[#111921] border-2 border-[var(--border-color)]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-[var(--text-muted)]">Rasio Sukses Delivery</span>
            <TrendingUp className="w-4 h-4 text-[#fbbf24]" />
          </div>
          <div className="font-pixel text-lg sm:text-xl text-[#fbbf24] tabular-nums">
            99.94%
          </div>
          <div className="text-[11px] text-[#10b981] font-mono mt-1">
            Zero-drop guarantees
          </div>
        </div>

        <div className="pixel-panel p-4 bg-[#111921] border-2 border-[var(--border-color)]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-[var(--text-muted)]">Total Fitur Terpasang</span>
            <Layers className="w-4 h-4 text-[#ec4899]" />
          </div>
          <div className="font-pixel text-lg sm:text-xl text-[#ec4899] tabular-nums">
            127 / 127
          </div>
          <div className="text-[11px] text-[var(--text-muted)] font-mono mt-1">
            100% Modul Loaded
          </div>
        </div>
      </div>

      {/* Main Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Pixel Bar Chart: Volume 7 Hari */}
        <div className="pixel-panel p-5 bg-[#10171d] border-2 border-[var(--border-color)] shadow-[4px_4px_0_#000]">
          <div className="flex items-center justify-between mb-4 border-b border-[var(--border-color)] pb-3">
            <div>
              <h3 className="font-pixel text-xs text-[#f5ebe0]">
                VOLUME PESAN 7 HARI TERAKHIR
              </h3>
              <p className="text-[11px] text-[var(--text-muted)]">
                WhatsApp vs Telegram per hari
              </p>
            </div>
            <div className="flex items-center gap-3 text-xs font-mono">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 bg-[#10b981] border border-black inline-block" />
                <span>WA</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 bg-[#06b6d4] border border-black inline-block" />
                <span>Telegram</span>
              </span>
            </div>
          </div>

          {/* Pixel-Style Bar visualization */}
          <div className="space-y-3 pt-2">
            {ANALYTICS_DATA.dailyTraffic.map((item) => {
              const waWidth = Math.round((item.wa / maxDayTraffic) * 100);
              const tgWidth = Math.round((item.tg / maxDayTraffic) * 100);

              return (
                <div key={item.day} className="space-y-1">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="font-bold text-[#f5ebe0] w-10">{item.day}</span>
                    <span className="text-[var(--text-muted)] tabular-nums">
                      WA: {item.wa.toLocaleString('id-ID')} · TG: {item.tg.toLocaleString('id-ID')}
                    </span>
                  </div>

                  <div className="flex h-5 bg-[#080d11] border border-[#1b2733] overflow-hidden p-0.5 gap-1">
                    <div
                      style={{ width: `${waWidth}%` }}
                      className="bg-[#10b981] border-r border-black flex items-center justify-end pr-1 text-[9px] font-pixel text-black"
                    />
                    <div
                      style={{ width: `${tgWidth}%` }}
                      className="bg-[#06b6d4] flex items-center justify-end pr-1 text-[9px] font-pixel text-black"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Tier Distribution & Latency Spectrum */}
        <div className="space-y-5">
          {/* Tier breakdown card */}
          <div className="pixel-panel p-5 bg-[#10171d] border-2 border-[var(--border-color)] shadow-[4px_4px_0_#000]">
            <h3 className="font-pixel text-xs text-[#f5ebe0] mb-3">
              DISTRIBUSI TIER 127 FITUR
            </h3>

            <div className="grid grid-cols-2 gap-3 text-xs font-mono">
              <div className="p-3 bg-[#0d141a] border border-[#ec4899]/40">
                <div className="text-[#ec4899] font-pixel text-[9px] mb-1">
                  MYTHIC (27)
                </div>
                <div className="text-xl font-bold text-[#f5ebe0] tabular-nums">
                  21.2%
                </div>
                <span className="text-[10px] text-[var(--text-muted)]">
                  Fitur AI neural &amp; ZK-Vault
                </span>
              </div>

              <div className="p-3 bg-[#0d141a] border border-[#06b6d4]/40">
                <div className="text-[#06b6d4] font-pixel text-[9px] mb-1">
                  ELITE (38)
                </div>
                <div className="text-xl font-bold text-[#f5ebe0] tabular-nums">
                  29.9%
                </div>
                <span className="text-[10px] text-[var(--text-muted)]">
                  Otomasi cuaca &amp; escrow
                </span>
              </div>

              <div className="p-3 bg-[#0d141a] border border-[#10b981]/40">
                <div className="text-[#10b981] font-pixel text-[9px] mb-1">
                  PRO (44)
                </div>
                <div className="text-xl font-bold text-[#f5ebe0] tabular-nums">
                  34.6%
                </div>
                <span className="text-[10px] text-[var(--text-muted)]">
                  Scraping &amp; multi-instance
                </span>
              </div>

              <div className="p-3 bg-[#0d141a] border border-gray-700">
                <div className="text-gray-300 font-pixel text-[9px] mb-1">
                  FREE (18)
                </div>
                <div className="text-xl font-bold text-[#f5ebe0] tabular-nums">
                  14.2%
                </div>
                <span className="text-[10px] text-[var(--text-muted)]">
                  Essential group utilities
                </span>
              </div>
            </div>
          </div>

          {/* Latency Timeline Strip */}
          <div className="pixel-panel p-4 bg-[#10171d] border-2 border-[var(--border-color)]">
            <div className="flex items-center justify-between mb-2">
              <span className="font-pixel text-[9px] text-[#f5ebe0]">
                LATENCY MONITOR (6 JAM TERAKHIR)
              </span>
              <span className="font-mono text-xs text-[#10b981]">Jitter: &plusmn;2ms</span>
            </div>

            <div className="flex items-end justify-between h-20 bg-[#080d11] p-2 border border-[#1b2733] gap-2">
              {ANALYTICS_DATA.latencyTimeline.map((pt) => {
                const heightPercent = Math.min(100, Math.round((pt.ms / 30) * 100));
                return (
                  <div key={pt.time} className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
                    <span className="font-mono text-[9px] text-[#10b981]">{pt.ms}</span>
                    <div
                      style={{ height: `${heightPercent}%` }}
                      className="w-full bg-[#10b981]/80 border-t-2 border-emerald-300 hover:bg-[#10b981]"
                    />
                    <span className="font-mono text-[8px] text-[var(--text-muted)]">{pt.time}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
