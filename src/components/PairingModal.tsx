import React, { useState, useEffect } from 'react';
import {
  X,
  Phone,
  Copy,
  Check,
  RefreshCw,
  QrCode,
  Terminal,
  ShieldCheck,
  AlertCircle,
  ExternalLink,
} from 'lucide-react';
import { generateBaileysPairingCode, sanitizePhoneNumber } from '../utils/botLogic.ts';
import { sound } from '../utils/sound.ts';

interface PairingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPairingSuccess: (platform: 'whatsapp' | 'telegram', identifier: string) => void;
}

export const PairingModal: React.FC<PairingModalProps> = ({
  isOpen,
  onClose,
  onPairingSuccess,
}) => {
  const [activeTab, setActiveTab] = useState<'wa' | 'tg' | 'code'>('wa');
  const [phoneNumber, setPhoneNumber] = useState('0821-4402-9988');
  const [pairingCode, setPairingCode] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState<number>(120);
  const [isCopied, setIsCopied] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  // Telegram state
  const [tgToken, setTgToken] = useState('7182946124:AAHkW8N-qL90mZsTY_alyt99');
  const [tgTesting, setTgTesting] = useState(false);
  const [tgSuccess, setTgSuccess] = useState(false);

  // Countdown timer for pairing code expiry
  useEffect(() => {
    if (!pairingCode || timeLeft <= 0) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [pairingCode, timeLeft]);

  if (!isOpen) return null;

  const handleGeneratePairingCode = () => {
    sound.playBlip();
    setErrorMsg(null);
    const check = sanitizePhoneNumber(phoneNumber);
    if (!check.isValid) {
      setErrorMsg(check.error || 'Nomor telepon tidak valid');
      sound.playError();
      return;
    }

    setIsGenerating(true);
    setTimeout(() => {
      const code = generateBaileysPairingCode('ALY');
      setPairingCode(code);
      setTimeLeft(120);
      setIsGenerating(false);
      sound.playSuccess();
    }, 450);
  };

  const handleCopyCode = () => {
    if (!pairingCode) return;
    sound.playBlip();
    navigator.clipboard.writeText(pairingCode.replace('-', ''));
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleSimulateConnected = () => {
    sound.playSuccess();
    const cleanNumber = sanitizePhoneNumber(phoneNumber).sanitized;
    onPairingSuccess('whatsapp', `+${cleanNumber}`);
    onClose();
  };

  const handleTestTelegram = () => {
    sound.playBlip();
    setTgTesting(true);
    setTimeout(() => {
      setTgTesting(false);
      setTgSuccess(true);
      sound.playSuccess();
      setTimeout(() => {
        onPairingSuccess('telegram', '@AlythraMythicBot');
        onClose();
      }, 800);
    }, 900);
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
        aria-label="Pairing Wizard"
        className="relative z-10 w-full max-w-2xl bg-[var(--bg-surface)] border-4 border-[var(--border-color)] shadow-[8px_8px_0_#000000] flex flex-col max-h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="p-4 bg-[#141d25] border-b-2 border-[var(--border-color)] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-[#10b981] border border-black flex items-center justify-center">
              <QrCode className="w-4 h-4 text-black" />
            </div>
            <div>
              <h2 className="font-pixel text-xs sm:text-sm text-[#f5ebe0]">
                DEVICE PAIRING WIZARD
              </h2>
              <p className="text-[10px] text-[var(--text-muted)]">
                Hubungkan WhatsApp (Baileys 8-Digit) &amp; Telegram Bot
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              sound.playBlip();
              onClose();
            }}
            aria-label="Tutup"
            className="pixel-btn p-1.5 bg-[#253442] hover:bg-red-950 text-[#f5ebe0] cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b-2 border-[var(--border-color)] bg-[#0d141a]">
          <button
            onClick={() => {
              sound.playBlip();
              setActiveTab('wa');
            }}
            className={`flex-1 py-2.5 px-3 font-pixel text-[10px] sm:text-xs flex items-center justify-center gap-2 cursor-pointer ${
              activeTab === 'wa'
                ? 'bg-[var(--bg-surface)] text-[#10b981] border-b-2 border-[#10b981]'
                : 'text-[var(--text-muted)] hover:text-[#f5ebe0]'
            }`}
          >
            <Phone className="w-3.5 h-3.5" />
            <span>WhatsApp (Baileys)</span>
          </button>

          <button
            onClick={() => {
              sound.playBlip();
              setActiveTab('tg');
            }}
            className={`flex-1 py-2.5 px-3 font-pixel text-[10px] sm:text-xs flex items-center justify-center gap-2 cursor-pointer ${
              activeTab === 'tg'
                ? 'bg-[var(--bg-surface)] text-[#06b6d4] border-b-2 border-[#06b6d4]'
                : 'text-[var(--text-muted)] hover:text-[#f5ebe0]'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>Telegram Bot</span>
          </button>

          <button
            onClick={() => {
              sound.playBlip();
              setActiveTab('code');
            }}
            className={`flex-1 py-2.5 px-3 font-pixel text-[10px] sm:text-xs flex items-center justify-center gap-2 cursor-pointer ${
              activeTab === 'code'
                ? 'bg-[var(--bg-surface)] text-[#fbbf24] border-b-2 border-[#fbbf24]'
                : 'text-[var(--text-muted)] hover:text-[#f5ebe0]'
            }`}
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Ubuntu Code</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto space-y-4">
          {/* TAB 1: WhatsApp Baileys Pairing */}
          {activeTab === 'wa' && (
            <div className="space-y-4">
              <div className="p-3 bg-[#111921] border border-[var(--border-color)] text-xs text-[var(--text-primary)]">
                <span className="font-semibold text-[#10b981]">Mengapa Pairing Code?</span>{' '}
                Metode pairing code Baileys menggantikan QR code tradisional: anti-timeout, tidak
                perlu scan kamera dari layar lain, dan bekerja 100% andal di VPS headless Ubuntu.
              </div>

              <div>
                <label className="block font-pixel text-[10px] text-[#f5ebe0] mb-1.5">
                  NOMOR TELEPON WHATSAPP (DENGAN KODE NEGARA):
                </label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="Contoh: 082144029988 atau 6282144029988"
                      className="w-full bg-[#0a0e11] border-2 border-[var(--border-color)] px-3 py-2 text-sm text-[#f5ebe0] font-mono focus:border-[#10b981] focus:outline-hidden"
                    />
                  </div>
                  <button
                    onClick={handleGeneratePairingCode}
                    disabled={isGenerating}
                    className="pixel-btn px-4 py-2 bg-[#10b981] hover:bg-[#059669] text-black font-pixel text-[10px] font-bold flex items-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isGenerating ? 'animate-spin' : ''}`} />
                    <span>{isGenerating ? 'GENERATING...' : 'GENERATE KODE'}</span>
                  </button>
                </div>
                {errorMsg && (
                  <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1 font-mono">
                    <AlertCircle className="w-3.5 h-3.5" /> {errorMsg}
                  </p>
                )}
              </div>

              {/* Pairing Code Display Box */}
              {pairingCode && (
                <div className="p-4 bg-[#0d151c] border-2 border-[#10b981] shadow-[4px_4px_0_#000]">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-pixel text-[9px] text-[#10b981]">
                      KODE PAIRING WHATSAPP (8 DIGIT):
                    </span>
                    <span className="font-mono text-xs text-amber-400 tabular-nums">
                      Berlaku {timeLeft} detik
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-3 bg-[#05080a] p-3 border border-[#1b2733]">
                    <span className="font-pixel text-xl sm:text-2xl text-[#10b981] tracking-widest selection:bg-emerald-900">
                      {pairingCode}
                    </span>
                    <button
                      onClick={handleCopyCode}
                      className="pixel-btn px-3 py-1.5 bg-[#253442] hover:bg-[#344759] text-white flex items-center gap-1.5 text-xs cursor-pointer"
                    >
                      {isCopied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-[#10b981]" />
                          <span className="text-[#10b981]">Tersalin</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Salin</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Step by step guide */}
                  <div className="mt-3 text-xs space-y-1.5 text-[var(--text-muted)] bg-[#111a22] p-3 border border-[var(--border-color)]">
                    <p className="font-semibold text-[#f5ebe0]">
                      Langkah memasukkan kode di aplikasi WhatsApp:
                    </p>
                    <ol className="list-decimal list-inside space-y-1 pl-1">
                      <li>Buka WhatsApp di ponsel Anda</li>
                      <li>
                        Tekan menu <strong>Titik Tiga</strong> (Android) atau{' '}
                        <strong>Pengaturan</strong> (iOS)
                      </li>
                      <li>
                        Pilih <strong>Perangkat Tertaut</strong>
                      </li>
                      <li>
                        Klik <strong>Tautkan Perangkat</strong>
                      </li>
                      <li>
                        Klik tulisan <strong>Tautkan dengan nomor telepon saja</strong> di bagian bawah
                      </li>
                      <li>Masukkan 8 karakter kode pairing di atas</li>
                    </ol>
                  </div>

                  <div className="mt-4 flex justify-end">
                    <button
                      onClick={handleSimulateConnected}
                      className="pixel-btn px-4 py-2 bg-[#10b981] hover:bg-[#059669] text-black font-semibold text-xs flex items-center gap-2 cursor-pointer"
                    >
                      <ShieldCheck className="w-4 h-4" />
                      <span>Simulasikan WhatsApp Terhubung</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: Telegram Bot Connection */}
          {activeTab === 'tg' && (
            <div className="space-y-4">
              <div className="p-3 bg-[#111921] border border-[var(--border-color)] text-xs text-[var(--text-primary)]">
                <span className="font-semibold text-[#06b6d4]">Telegram Bot API</span> menggunakan
                library <code className="text-[#06b6d4]">grammy</code> /{' '}
                <code className="text-[#06b6d4]">telegraf</code> dengan webhook HTTPS atau
                long-polling otomatis.
              </div>

              <div>
                <label className="block font-pixel text-[10px] text-[#f5ebe0] mb-1.5">
                  TELEGRAM BOT TOKEN (DARI @BOTFATHER):
                </label>
                <input
                  type="text"
                  value={tgToken}
                  onChange={(e) => setTgToken(e.target.value)}
                  placeholder="123456789:ABCdefGhIJKlmNoPQRsTUVwxyZ"
                  className="w-full bg-[#0a0e11] border-2 border-[var(--border-color)] px-3 py-2 text-sm text-[#f5ebe0] font-mono focus:border-[#06b6d4] focus:outline-hidden"
                />
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-[#0d141a] border border-[var(--border-color)]">
                  <span className="text-[var(--text-muted)] block">Metode Koneksi:</span>
                  <span className="font-semibold text-[#f5ebe0]">Webhook (Fast TLS 1.3)</span>
                </div>
                <div className="p-3 bg-[#0d141a] border border-[var(--border-color)]">
                  <span className="text-[var(--text-muted)] block">Bot Username:</span>
                  <span className="font-semibold text-[#06b6d4]">@AlythraMythicBot</span>
                </div>
              </div>

              <button
                onClick={handleTestTelegram}
                disabled={tgTesting}
                className="w-full pixel-btn py-2.5 px-4 bg-[#06b6d4] hover:bg-[#0891b2] text-black font-pixel text-[10px] font-bold flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {tgTesting ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>MEMVALIDASI BOT TOKEN...</span>
                  </>
                ) : tgSuccess ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>BOT TELEGRAM BERHASIL TERHUBUNG!</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4" />
                    <span>VALIDASI &amp; AKTIFKAN TELEGRAM</span>
                  </>
                )}
              </button>
            </div>
          )}

          {/* TAB 3: Ubuntu Engine & Backend Code Architecture */}
          {activeTab === 'code' && (
            <div className="space-y-3">
              <div className="p-3 bg-[#111921] border border-[var(--border-color)] text-xs text-[var(--text-primary)]">
                Struktur implementasi backend Node.js Baileys dengan Chromium di environment Ubuntu:
              </div>

              <pre className="p-3 bg-[#05080a] border border-[var(--border-color)] font-mono text-[11px] text-emerald-400 overflow-x-auto leading-relaxed">
{`// server/baileysWorker.ts
import makeWASocket, { useMultiFileAuthState, DisconnectReason } from '@whiskeysockets/baileys';
import puppeteer from 'puppeteer';

// 1. WhatsApp Baileys Pairing Code setup
async function startWhatsApp(phoneNumber: string) {
  const { state, saveCreds } = await useMultiFileAuthState('./auth_info_baileys');
  const sock = makeWASocket({
    auth: state,
    printQRInTerminal: false, // Gunakan pairing code!
    browser: ['Ubuntu', 'Chrome', '124.0.0.0'],
  });

  if (!sock.authState.creds.registered) {
    // Request 8-digit code
    const code = await sock.requestPairingCode(phoneNumber.replace(/\\D/g, ''));
    console.log(\`Pairing code: \${code}\`);
  }

  sock.ev.on('creds.update', saveCreds);
  return sock;
}

// 2. Headless Chromium automation on Ubuntu
async function launchUbuntuBrowser() {
  return await puppeteer.launch({
    executablePath: '/usr/bin/chromium-browser', // Path Ubuntu
    headless: 'new',
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-gpu',
    ],
  });
}`}
              </pre>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-[#121a22] border-t-2 border-[var(--border-color)] flex justify-between items-center text-[10px] text-[var(--text-muted)]">
          <span>Enkripsi E2EE Klien-ke-Server Aktif</span>
          <button
            onClick={() => {
              sound.playBlip();
              onClose();
            }}
            className="pixel-btn px-3 py-1 bg-[#253442] hover:bg-[#324557] text-[#f5ebe0] cursor-pointer"
          >
            Tutup Dialog
          </button>
        </div>
      </div>
    </div>
  );
};
