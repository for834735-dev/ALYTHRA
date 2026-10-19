import React, { useState, useRef, useEffect } from 'react';
import {
  Terminal,
  Search,
  Trash2,
  Download,
  Play,
  Pause,
  Filter,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Info,
  Radio,
} from 'lucide-react';
import type { BotLog, LogLevel } from '../types/index.ts';
import { filterLogs, exportLogsToText } from '../utils/botLogic.ts';
import { sound } from '../utils/sound.ts';

interface ConsoleViewProps {
  logs: BotLog[];
  onClearLogs: () => void;
  onInjectLog: (level: LogLevel, message: string, platform: 'SYSTEM' | 'WHATSAPP' | 'TELEGRAM') => void;
}

export const ConsoleView: React.FC<ConsoleViewProps> = ({
  logs,
  onClearLogs,
  onInjectLog,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLevel, setSelectedLevel] = useState<LogLevel | 'ALL'>('ALL');
  const [isAutoScroll, setIsAutoScroll] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const filteredLogs = filterLogs(logs, searchQuery, selectedLevel);

  useEffect(() => {
    if (isAutoScroll && !isPaused && scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs, isAutoScroll, isPaused]);

  const handleExport = () => {
    sound.playBlip();
    const content = exportLogsToText(filteredLogs);
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `alythra-console-${new Date().toISOString().slice(0, 10)}.log`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const getLevelBadge = (level: LogLevel) => {
    switch (level) {
      case 'SUCCESS':
        return (
          <span className="px-1.5 py-0.5 bg-emerald-950/80 border border-emerald-500 text-emerald-400 font-pixel text-[8px] flex items-center gap-1">
            <CheckCircle className="w-2.5 h-2.5" /> OK
          </span>
        );
      case 'WARN':
        return (
          <span className="px-1.5 py-0.5 bg-amber-950/80 border border-amber-500 text-amber-400 font-pixel text-[8px] flex items-center gap-1">
            <AlertTriangle className="w-2.5 h-2.5" /> WARN
          </span>
        );
      case 'ERROR':
        return (
          <span className="px-1.5 py-0.5 bg-rose-950/80 border border-rose-500 text-rose-400 font-pixel text-[8px] flex items-center gap-1">
            <XCircle className="w-2.5 h-2.5" /> ERR
          </span>
        );
      case 'INFO':
      default:
        return (
          <span className="px-1.5 py-0.5 bg-sky-950/80 border border-sky-500 text-sky-400 font-pixel text-[8px] flex items-center gap-1">
            <Info className="w-2.5 h-2.5" /> INFO
          </span>
        );
    }
  };

  return (
    <div className="space-y-4 pb-20">
      {/* Console Header Bar */}
      <div className="pixel-panel p-4 bg-[#10171d] border-2 border-[var(--border-color)]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-[#06b6d4]/20 border-2 border-[#06b6d4] flex items-center justify-center text-[#06b6d4]">
              <Terminal className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-pixel text-xs sm:text-sm text-[#f5ebe0]">
                  REAL-TIME SOCKET CONSOLE
                </h2>
                <span className="flex items-center gap-1 font-mono text-[10px] text-[#10b981]">
                  <Radio className="w-3 h-3 animate-pulse" />
                  <span>STREAMING</span>
                </span>
              </div>
              <p className="text-[11px] text-[var(--text-muted)]">
                Log event runtime Baileys, Grammy, Ubuntu Chromium, dan query database
              </p>
            </div>
          </div>

          {/* Action Toolbar */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => {
                sound.playBlip();
                setIsPaused(!isPaused);
              }}
              className={`pixel-btn px-2.5 py-1 text-xs font-mono flex items-center gap-1 cursor-pointer ${
                isPaused ? 'bg-amber-600 text-black' : 'bg-[#1b2630] text-[#f5ebe0]'
              }`}
            >
              {isPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
              <span>{isPaused ? 'Lanjutkan' : 'Jeda Stream'}</span>
            </button>

            <button
              onClick={handleExport}
              className="pixel-btn px-2.5 py-1 bg-[#1b2630] hover:bg-[#283847] text-[#f5ebe0] text-xs font-mono flex items-center gap-1 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-[#06b6d4]" />
              <span>Export .log</span>
            </button>

            <button
              onClick={() => {
                sound.playBlip();
                onClearLogs();
              }}
              className="pixel-btn px-2.5 py-1 bg-[#2e1818] hover:bg-[#451f1f] text-red-300 text-xs font-mono flex items-center gap-1 cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Bersihkan</span>
            </button>
          </div>
        </div>

        {/* Filter Toolbar */}
        <div className="mt-3 pt-3 border-t border-[var(--border-color)] flex flex-col md:flex-row gap-2.5 items-stretch md:items-center justify-between">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-[var(--text-muted)]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari log event (contoh: Baileys, handshake, error, group)..."
              className="w-full bg-[#0a0e11] border border-[var(--border-color)] pl-8 pr-3 py-1.5 text-xs text-[#f5ebe0] font-mono focus:border-[#06b6d4] focus:outline-hidden"
            />
          </div>

          {/* Level Filter Buttons */}
          <div className="flex items-center gap-1 overflow-x-auto pb-1 md:pb-0">
            {(['ALL', 'INFO', 'SUCCESS', 'WARN', 'ERROR'] as const).map((lvl) => (
              <button
                key={lvl}
                onClick={() => {
                  sound.playBlip();
                  setSelectedLevel(lvl);
                }}
                className={`font-pixel text-[8px] sm:text-[9px] px-2 py-1 border transition-all cursor-pointer whitespace-nowrap ${
                  selectedLevel === lvl
                    ? 'border-[#06b6d4] bg-[#06b6d4]/20 text-[#06b6d4]'
                    : 'border-[var(--border-color)] text-[var(--text-muted)] hover:text-[#f5ebe0]'
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Terminal Viewport */}
      <div className="pixel-panel bg-[#070b0e] border-2 border-[var(--border-color)] shadow-[4px_4px_0_#000]">
        <div className="p-2.5 bg-[#0e141a] border-b border-[var(--border-color)] flex items-center justify-between text-[11px] font-mono text-[var(--text-muted)]">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-red-500 border border-black inline-block" />
            <span className="w-2.5 h-2.5 bg-amber-500 border border-black inline-block" />
            <span className="w-2.5 h-2.5 bg-emerald-500 border border-black inline-block" />
            <span className="ml-2 text-xs text-[#f5ebe0]">
              alythra@node-ubuntu:~/baileys-service$ tail -f stdout.log
            </span>
          </div>

          <label className="flex items-center gap-1.5 cursor-pointer">
            <input
              type="checkbox"
              checked={isAutoScroll}
              onChange={(e) => setIsAutoScroll(e.target.checked)}
              className="accent-[#10b981]"
            />
            <span className="text-[10px]">Auto-scroll</span>
          </label>
        </div>

        {/* Scrollable Log Lines */}
        <div
          ref={scrollRef}
          className="p-3 font-mono text-[11px] sm:text-xs h-[420px] overflow-y-auto space-y-2 select-text"
        >
          {filteredLogs.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-[var(--text-muted)]">
              <Terminal className="w-8 h-8 opacity-40 mb-2" />
              <p>Tidak ada log yang cocok dengan filter.</p>
            </div>
          ) : (
            filteredLogs.map((log) => (
              <div
                key={log.id}
                className="flex flex-col sm:flex-row sm:items-baseline gap-1.5 sm:gap-2.5 p-1.5 rounded-xs hover:bg-[#0f171e] transition-colors border-b border-white/5"
              >
                <div className="flex items-center gap-1.5 shrink-0">
                  <span className="text-gray-500 tabular-nums">[{log.timestamp}]</span>
                  <span className="font-pixel text-[8px] text-gray-400 bg-gray-900 px-1 py-0.5 border border-gray-700">
                    {log.platform}
                  </span>
                  {getLevelBadge(log.level)}
                </div>

                <div className="flex-1 break-all">
                  <span
                    className={
                      log.level === 'ERROR'
                        ? 'text-rose-300 font-semibold'
                        : log.level === 'WARN'
                        ? 'text-amber-200'
                        : log.level === 'SUCCESS'
                        ? 'text-emerald-300'
                        : 'text-slate-200'
                    }
                  >
                    {log.message}
                  </span>
                  {log.metadata && (
                    <span className="text-[10px] text-gray-500 block sm:inline sm:ml-2 font-mono">
                      // {log.metadata}
                    </span>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Test Simulator Bar */}
        <div className="p-2.5 bg-[#0c1217] border-t border-[var(--border-color)] flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
          <span className="text-[var(--text-muted)] text-[11px]">
            {filteredLogs.length} baris tercatat · Buffer max 500
          </span>
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] text-[var(--text-muted)]">Uji Log:</span>
            <button
              onClick={() => {
                sound.playBlip();
                onInjectLog(
                  'INFO',
                  'Neural Memory: context synchronized for group [TRADING_VIP_ELITE]',
                  'WHATSAPP'
                );
              }}
              className="pixel-btn px-2 py-0.5 bg-[#1b2630] hover:bg-[#253545] text-sky-300 text-[10px] cursor-pointer"
            >
              +Info
            </button>
            <button
              onClick={() => {
                sound.playSuccess();
                onInjectLog(
                  'SUCCESS',
                  'Omni-Bridge: mirrored message ID #99482 across WhatsApp <-> Telegram',
                  'TELEGRAM'
                );
              }}
              className="pixel-btn px-2 py-0.5 bg-[#1b2630] hover:bg-[#253545] text-emerald-300 text-[10px] cursor-pointer"
            >
              +Success
            </button>
            <button
              onClick={() => {
                sound.playError();
                onInjectLog(
                  'WARN',
                  'Rate limit token bucket triggered by JID 6281299887711 (delay 1.2s)',
                  'WHATSAPP'
                );
              }}
              className="pixel-btn px-2 py-0.5 bg-[#1b2630] hover:bg-[#253545] text-amber-300 text-[10px] cursor-pointer"
            >
              +Warn
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
