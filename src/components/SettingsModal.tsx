import React, { useState } from 'react';
import { X, Settings, HardDrive, Save, Check, RefreshCw, Volume2 } from 'lucide-react';
import { sound } from '../utils/sound.ts';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  soundMuted: boolean;
  onToggleSound: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  soundMuted,
  onToggleSound,
}) => {
  const [chromiumPath, setChromiumPath] = useState('/usr/bin/chromium-browser');
  const [webhookUrl, setWebhookUrl] = useState('https://api.alythra.internal/v1/webhook');
  const [reconnectInterval, setReconnectInterval] = useState('1800');
  const [rateLimitMax, setRateLimitMax] = useState('30');
  const [saved, setSaved] = useState(false);

  if (!isOpen) return null;

  const handleSave = () => {
    sound.playSuccess();
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-xs"
        onClick={() => {
          sound.playBlip();
          onClose();
        }}
      />

      {/* Modal Dialog */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Pengaturan Sistem"
        className="relative z-10 w-full max-w-lg bg-[var(--bg-surface)] border-4 border-[var(--border-color)] shadow-[8px_8px_0_#000000] flex flex-col max-h-[85vh] overflow-hidden"
      >
        {/* Header */}
        <div className="p-4 bg-[#141d25] border-b-2 border-[var(--border-color)] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-[#ec4899] border border-black flex items-center justify-center text-black">
              <Settings className="w-3.5 h-3.5" />
            </div>
            <div>
              <h2 className="font-pixel text-xs sm:text-sm text-[#f5ebe0]">
                PENGATURAN NODE &amp; UBUNTU
              </h2>
              <p className="text-[10px] text-[var(--text-muted)]">
                Konfigurasi runtime Baileys, browser headless, dan security
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              sound.playBlip();
              onClose();
            }}
            aria-label="Tutup"
            className="pixel-btn p-1 bg-[#253442] text-[#f5ebe0] cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 overflow-y-auto space-y-4 text-xs">
          <div>
            <label className="block font-mono font-semibold text-[#06b6d4] mb-1">
              Ubuntu Chromium Executable Path:
            </label>
            <input
              type="text"
              value={chromiumPath}
              onChange={(e) => setChromiumPath(e.target.value)}
              className="w-full bg-[#0a0e11] border border-[var(--border-color)] px-3 py-2 text-xs text-[#f5ebe0] font-mono focus:border-[#10b981] focus:outline-hidden"
            />
            <p className="text-[10px] text-[var(--text-muted)] mt-1">
              Path absolut executable browser Puppeteer/Playwright pada OS Ubuntu.
            </p>
          </div>

          <div>
            <label className="block font-mono font-semibold text-[#06b6d4] mb-1">
              Global Incoming Webhook URL:
            </label>
            <input
              type="text"
              value={webhookUrl}
              onChange={(e) => setWebhookUrl(e.target.value)}
              className="w-full bg-[#0a0e11] border border-[var(--border-color)] px-3 py-2 text-xs text-[#f5ebe0] font-mono focus:border-[#10b981] focus:outline-hidden"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-mono font-semibold text-[#06b6d4] mb-1">
                Auto-Reconnect (ms):
              </label>
              <input
                type="number"
                value={reconnectInterval}
                onChange={(e) => setReconnectInterval(e.target.value)}
                className="w-full bg-[#0a0e11] border border-[var(--border-color)] px-3 py-2 text-xs text-[#f5ebe0] font-mono"
              />
            </div>
            <div>
              <label className="block font-mono font-semibold text-[#06b6d4] mb-1">
                Max Messages / Sec:
              </label>
              <input
                type="number"
                value={rateLimitMax}
                onChange={(e) => setRateLimitMax(e.target.value)}
                className="w-full bg-[#0a0e11] border border-[var(--border-color)] px-3 py-2 text-xs text-[#f5ebe0] font-mono"
              />
            </div>
          </div>

          {/* Sound settings */}
          <div className="p-3 bg-[#0d141a] border border-[var(--border-color)] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Volume2 className="w-4 h-4 text-[#10b981]" />
              <div>
                <span className="font-semibold block text-[#f5ebe0]">Sound Effects 8-Bit</span>
                <span className="text-[10px] text-[var(--text-muted)]">Audio retro sintetis Web Audio API</span>
              </div>
            </div>
            <button
              onClick={onToggleSound}
              className={`pixel-btn px-3 py-1 font-mono text-xs cursor-pointer ${
                soundMuted ? 'bg-red-950 text-red-300' : 'bg-emerald-950 text-emerald-300'
              }`}
            >
              {soundMuted ? 'Muted' : 'Enabled'}
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 bg-[#121a22] border-t-2 border-[var(--border-color)] flex justify-between">
          <button
            onClick={() => {
              sound.playBlip();
              onClose();
            }}
            className="pixel-btn px-3 py-1.5 bg-[#253442] text-xs text-[#f5ebe0] cursor-pointer"
          >
            Batal
          </button>
          <button
            onClick={handleSave}
            className="pixel-btn px-4 py-1.5 bg-[#10b981] hover:bg-[#059669] text-black font-semibold text-xs flex items-center gap-1.5 cursor-pointer"
          >
            {saved ? <Check className="w-3.5 h-3.5" /> : <Save className="w-3.5 h-3.5" />}
            <span>{saved ? 'Tersimpan!' : 'Simpan Pengaturan'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
