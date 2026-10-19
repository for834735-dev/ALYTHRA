import React from 'react';
import {
  Phone,
  Terminal,
  Radio,
  Cpu,
  RefreshCw,
  HardDrive,
  Database,
  QrCode,
  ShieldCheck,
  CheckCircle2,
  Play,
  Zap,
} from 'lucide-react';
import type { PlatformHealth } from '../types/index.ts';
import { formatUptime } from '../utils/botLogic.ts';
import { sound } from '../utils/sound.ts';

interface BotControlViewProps {
  waHealth: PlatformHealth;
  tgHealth: PlatformHealth;
  onOpenPairing: () => void;
  onRestartWorker: () => void;
  onSyncHandshake: () => void;
  onSendTestMessage: () => void;
  activeFeaturesCount: number;
}

export const BotControlView: React.FC<BotControlViewProps> = ({
  waHealth,
  tgHealth,
  onOpenPairing,
  onRestartWorker,
  onSyncHandshake,
  onSendTestMessage,
  activeFeaturesCount,
}) => {
  return (
    <div className="space-y-6 pb-20">
      {/* Top Banner / Hero HUD */}
      <div className="pixel-panel p-5 bg-gradient-to-r from-[#121b22] via-[#10241c] to-[#121b22] border-2 border-[var(--border-color)]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="font-pixel text-[9px] bg-[#10b981] text-black px-1.5 py-0.5 font-bold shadow-[1px_1px_0_#000]">
                CORE INSTANCE #1
              </span>
              <span className="text-xs text-[var(--text-muted)] font-mono">
                UBUNTU 24.04 LTS (x86_64)
              </span>
            </div>
            <h1 className="font-pixel text-base sm:text-xl text-[#f5ebe0] tracking-wide">
              ALYTHRA BOT ENGINE COMMAND
            </h1>
            <p className="text-xs text-[var(--text-muted)] mt-1 max-w-xl">
              Node pengontrol WhatsApp (@whiskeysockets/baileys) dan Telegram (Grammy) dengan 127 fitur
              eksklusif berarsitektur cloud container.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => {
                sound.playBlip();
                onOpenPairing();
              }}
              className="pixel-btn px-4 py-2 bg-[#10b981] hover:bg-[#059669] text-black font-pixel text-[10px] font-bold flex items-center gap-2 cursor-pointer"
            >
              <QrCode className="w-3.5 h-3.5" />
              <span>PAIRING WHATSAPP</span>
            </button>

            <button
              onClick={() => {
                sound.playBlip();
                onRestartWorker();
              }}
              className="pixel-btn px-3 py-2 bg-[#253442] hover:bg-[#344759] text-[#f5ebe0] text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Restart Worker</span>
            </button>
          </div>
        </div>
      </div>

      {/* Primary Platform Grid (WhatsApp & Telegram) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Card 1: WhatsApp Baileys */}
        <div className="pixel-panel p-5 bg-[#10171d] border-2 border-[#10b981]/50 shadow-[4px_4px_0_#000000]">
          <div className="flex items-center justify-between border-b-2 border-[var(--border-color)] pb-3 mb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 bg-[#10b981]/20 border-2 border-[#10b981] flex items-center justify-center text-[#10b981]">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-pixel text-xs text-[#f5ebe0] flex items-center gap-2">
                  <span>WHATSAPP BAILEYS</span>
                </h3>
                <span className="text-[11px] text-[var(--text-muted)] font-mono">
                  Multi-Device Pairing Auth
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 px-2 py-1 bg-[#0a120e] border border-[#10b981]">
              <span className="w-2 h-2 bg-[#10b981] inline-block shadow-[0_0_6px_#10b981]" />
              <span className="font-pixel text-[9px] text-[#10b981] uppercase">
                {waHealth.status}
              </span>
            </div>
          </div>

          {/* Stats Details */}
          <div className="space-y-3 text-xs">
            <div className="flex justify-between items-center py-1 border-b border-[var(--border-color)]">
              <span className="text-[var(--text-muted)]">Nomor Terhubung:</span>
              <span className="font-mono font-bold text-[#f5ebe0]">
                {waHealth.sessionDetails.phoneNumber || 'Belum Terhubung'}
              </span>
            </div>

            <div className="flex justify-between items-center py-1 border-b border-[var(--border-color)]">
              <span className="text-[var(--text-muted)]">Metode Otentikasi:</span>
              <span className="font-pixel text-[9px] bg-[#10b981]/20 text-[#10b981] px-1.5 py-0.5">
                8-DIGIT PAIRING CODE
              </span>
            </div>

            <div className="flex justify-between items-center py-1 border-b border-[var(--border-color)]">
              <span className="text-[var(--text-muted)]">Uptime Node:</span>
              <span className="font-mono text-[#f5ebe0] tabular-nums">
                {formatUptime(waHealth.uptimeSeconds)}
              </span>
            </div>

            <div className="flex justify-between items-center py-1 border-b border-[var(--border-color)]">
              <span className="text-[var(--text-muted)]">Latency Socket:</span>
              <span className="font-mono text-[#10b981] font-semibold tabular-nums">
                {waHealth.pingMs} ms (Sangat Cepat)
              </span>
            </div>

            <div className="flex justify-between items-center py-1">
              <span className="text-[var(--text-muted)]">Total Pesan Hari Ini:</span>
              <span className="font-mono font-bold text-[#f5ebe0] tabular-nums">
                {waHealth.totalMessagesToday.toLocaleString('id-ID')} msgs
              </span>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t-2 border-[var(--border-color)] flex gap-2">
            <button
              onClick={() => {
                sound.playBlip();
                onOpenPairing();
              }}
              className="flex-1 pixel-btn py-1.5 bg-[#1b2733] hover:bg-[#27384a] text-xs font-semibold text-[#10b981] flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <QrCode className="w-3.5 h-3.5" />
              <span>Re-Pairing WA</span>
            </button>
            <button
              onClick={() => {
                sound.playBlip();
                onSyncHandshake();
              }}
              className="flex-1 pixel-btn py-1.5 bg-[#1b2733] hover:bg-[#27384a] text-xs font-semibold text-[#f5ebe0] flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Radio className="w-3.5 h-3.5 text-[#06b6d4]" />
              <span>Handshake Ping</span>
            </button>
          </div>
        </div>

        {/* Card 2: Telegram Bot Engine */}
        <div className="pixel-panel p-5 bg-[#10171d] border-2 border-[#06b6d4]/50 shadow-[4px_4px_0_#000000]">
          <div className="flex items-center justify-between border-b-2 border-[var(--border-color)] pb-3 mb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 bg-[#06b6d4]/20 border-2 border-[#06b6d4] flex items-center justify-center text-[#06b6d4]">
                <Terminal className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-pixel text-xs text-[#f5ebe0]">
                  TELEGRAM GRAMMY
                </h3>
                <span className="text-[11px] text-[var(--text-muted)] font-mono">
                  High-Throughput Webhook Engine
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 px-2 py-1 bg-[#09151c] border border-[#06b6d4]">
              <span className="w-2 h-2 bg-[#06b6d4] inline-block shadow-[0_0_6px_#06b6d4]" />
              <span className="font-pixel text-[9px] text-[#06b6d4] uppercase">
                {tgHealth.status}
              </span>
            </div>
          </div>

          {/* Stats Details */}
          <div className="space-y-3 text-xs">
            <div className="flex justify-between items-center py-1 border-b border-[var(--border-color)]">
              <span className="text-[var(--text-muted)]">Bot Username:</span>
              <span className="font-mono font-bold text-[#06b6d4]">
                {tgHealth.sessionDetails.botUsername}
              </span>
            </div>

            <div className="flex justify-between items-center py-1 border-b border-[var(--border-color)]">
              <span className="text-[var(--text-muted)]">Protokol Webhook:</span>
              <span className="font-pixel text-[9px] bg-[#06b6d4]/20 text-[#06b6d4] px-1.5 py-0.5">
                PORT 443 TLS 1.3
              </span>
            </div>

            <div className="flex justify-between items-center py-1 border-b border-[var(--border-color)]">
              <span className="text-[var(--text-muted)]">Uptime Node:</span>
              <span className="font-mono text-[#f5ebe0] tabular-nums">
                {formatUptime(tgHealth.uptimeSeconds)}
              </span>
            </div>

            <div className="flex justify-between items-center py-1 border-b border-[var(--border-color)]">
              <span className="text-[var(--text-muted)]">Latency Webhook:</span>
              <span className="font-mono text-[#06b6d4] font-semibold tabular-nums">
                {tgHealth.pingMs} ms (Ultra Fast)
              </span>
            </div>

            <div className="flex justify-between items-center py-1">
              <span className="text-[var(--text-muted)]">Total Pesan Hari Ini:</span>
              <span className="font-mono font-bold text-[#f5ebe0] tabular-nums">
                {tgHealth.totalMessagesToday.toLocaleString('id-ID')} msgs
              </span>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t-2 border-[var(--border-color)] flex gap-2">
            <button
              onClick={() => {
                sound.playBlip();
                onOpenPairing();
              }}
              className="flex-1 pixel-btn py-1.5 bg-[#1b2733] hover:bg-[#27384a] text-xs font-semibold text-[#06b6d4] flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Token Config</span>
            </button>
            <button
              onClick={() => {
                sound.playBlip();
                onSendTestMessage();
              }}
              className="flex-1 pixel-btn py-1.5 bg-[#1b2733] hover:bg-[#27384a] text-xs font-semibold text-[#fbbf24] flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Uji Broadcast</span>
            </button>
          </div>
        </div>
      </div>

      {/* System Infrastructure Telemetry Strip */}
      <div className="pixel-panel p-4 bg-[#0e141a] border-2 border-[var(--border-color)]">
        <div className="flex items-center gap-2 mb-3">
          <Cpu className="w-4 h-4 text-[#10b981]" />
          <h4 className="font-pixel text-[10px] text-[#f5ebe0]">
            UBUNTU HEADLESS ENVIRONMENT &amp; CLUSTER TELEMETRY
          </h4>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
          <div className="p-2.5 bg-[#151e26] border border-[var(--border-color)]">
            <div className="flex items-center gap-1.5 text-[var(--text-muted)] text-[11px] mb-1">
              <HardDrive className="w-3.5 h-3.5 text-[#06b6d4]" />
              <span>Chromium Path:</span>
            </div>
            <div className="text-[11px] text-[#06b6d4] truncate" title="/usr/bin/chromium-browser">
              /usr/bin/chromium-browser
            </div>
          </div>

          <div className="p-2.5 bg-[#151e26] border border-[var(--border-color)]">
            <div className="flex items-center gap-1.5 text-[var(--text-muted)] text-[11px] mb-1">
              <Database className="w-3.5 h-3.5 text-[#10b981]" />
              <span>Dual Database:</span>
            </div>
            <div className="text-[11px] text-[#10b981]">
              MongoDB + Supabase
            </div>
          </div>

          <div className="p-2.5 bg-[#151e26] border border-[var(--border-color)]">
            <div className="flex items-center gap-1.5 text-[var(--text-muted)] text-[11px] mb-1">
              <Cpu className="w-3.5 h-3.5 text-[#fbbf24]" />
              <span>RAM &amp; CPU:</span>
            </div>
            <div className="text-[11px] text-[#f5ebe0]">
              284 MB · 4.2% Load
            </div>
          </div>

          <div className="p-2.5 bg-[#151e26] border border-[var(--border-color)]">
            <div className="flex items-center gap-1.5 text-[var(--text-muted)] text-[11px] mb-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#ec4899]" />
              <span>Fitur Berjalan:</span>
            </div>
            <div className="text-[11px] text-[#ec4899]">
              {activeFeaturesCount} dari 127 Aktif
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
