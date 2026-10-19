import React, { useState } from 'react';
import {
  X,
  User,
  CreditCard,
  Key,
  ShieldCheck,
  Check,
  Copy,
  Zap,
  Sparkles,
} from 'lucide-react';
import { sound } from '../utils/sound.ts';

interface ProfileBillingModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentTier: string;
  onUpgradeTier: (tier: string) => void;
}

export const ProfileBillingModal: React.FC<ProfileBillingModalProps> = ({
  isOpen,
  onClose,
  currentTier,
  onUpgradeTier,
}) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'billing'>('profile');
  const [copiedKey, setCopiedKey] = useState(false);

  if (!isOpen) return null;

  const apiKey = 'alythra_live_sec_99482f811b72aa90';

  const tiers = [
    {
      name: 'Free',
      price: 'Rp 0',
      period: 'selamanya',
      features: ['18 Fitur Dasar', '500 pesan/hari', 'Single session WhatsApp', 'Community Support'],
      recommended: false,
    },
    {
      name: 'Pro',
      price: 'Rp 149.000',
      period: 'per bulan',
      features: ['62 Fitur Aktif', '20.000 pesan/hari', 'Baileys Pairing Code', 'Telegram Webhook', 'Priority Queue'],
      recommended: false,
    },
    {
      name: 'Elite',
      price: 'Rp 349.000',
      period: 'per bulan',
      features: ['100 Fitur Aktif', '100.000 pesan/hari', 'Ubuntu Chromium Crawler', 'Dual-Write DB', 'Sub-20ms Latency'],
      recommended: false,
    },
    {
      name: 'Mythic',
      price: 'Rp 799.000',
      period: 'per bulan',
      features: ['SEMUA 127 FITUR', 'Unlimited Messages', 'ZK-Vault & Air-Gap Mode', 'Dedicated Cluster Pod', '24/7 VIP SLA'],
      recommended: true,
    },
  ];

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
        aria-label="Profile &amp; Billing"
        className="relative z-10 w-full max-w-2xl bg-[var(--bg-surface)] border-4 border-[var(--border-color)] shadow-[8px_8px_0_#000000] flex flex-col max-h-[85vh] overflow-hidden"
      >
        {/* Header */}
        <div className="p-4 bg-[#141d25] border-b-2 border-[var(--border-color)] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-[#fbbf24] border border-black flex items-center justify-center text-black">
              <User className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-pixel text-xs sm:text-sm text-[#f5ebe0]">
                OPERATOR PROFILE &amp; SUBSCRIPTION
              </h2>
              <p className="text-[10px] text-[var(--text-muted)]">
                Kredensial API, kuota pesan, dan tingkat lisensi bot
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

        {/* Tab switch */}
        <div className="flex border-b-2 border-[var(--border-color)] bg-[#0d141a]">
          <button
            onClick={() => {
              sound.playBlip();
              setActiveTab('profile');
            }}
            className={`flex-1 py-2.5 px-3 font-pixel text-[10px] flex items-center justify-center gap-2 cursor-pointer ${
              activeTab === 'profile'
                ? 'bg-[var(--bg-surface)] text-[#10b981] border-b-2 border-[#10b981]'
                : 'text-[var(--text-muted)]'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>Profile &amp; Kredensial</span>
          </button>
          <button
            onClick={() => {
              sound.playBlip();
              setActiveTab('billing');
            }}
            className={`flex-1 py-2.5 px-3 font-pixel text-[10px] flex items-center justify-center gap-2 cursor-pointer ${
              activeTab === 'billing'
                ? 'bg-[var(--bg-surface)] text-[#fbbf24] border-b-2 border-[#fbbf24]'
                : 'text-[var(--text-muted)]'
            }`}
          >
            <CreditCard className="w-3.5 h-3.5" />
            <span>Tingkat Langganan (127 Fitur)</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto space-y-4">
          {activeTab === 'profile' && (
            <div className="space-y-4">
              {/* Profile Card */}
              <div className="p-4 bg-[#10171d] border-2 border-[var(--border-color)] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-[#2a1d14] border-2 border-[#10b981] flex items-center justify-center text-[#10b981] font-pixel text-base">
                    OP
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-[#f5ebe0]">Alya Gracias</h3>
                    <p className="text-xs text-[var(--text-muted)] font-mono">alyagracias21@gmail.com</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="font-pixel text-[8px] bg-[#ec4899]/20 text-[#ec4899] px-1.5 py-0.5 border border-[#ec4899]/50">
                        MYTHIC OPERATOR
                      </span>
                      <span className="text-[10px] text-[#10b981] font-mono">ID: ALY-USR-0941</span>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] text-[var(--text-muted)] block font-mono">Saldo Emerald:</span>
                  <span className="font-pixel text-base text-[#10b981]">4,850 EM</span>
                </div>
              </div>

              {/* API Key Box */}
              <div>
                <label className="block font-pixel text-[9px] text-[#f5ebe0] mb-1">
                  API MASTER KEY (BEARER TOKEN):
                </label>
                <div className="flex gap-2">
                  <input
                    type="password"
                    value={apiKey}
                    readOnly
                    className="flex-1 bg-[#0a0e11] border border-[var(--border-color)] px-3 py-2 text-xs font-mono text-[#f5ebe0]"
                  />
                  <button
                    onClick={() => {
                      sound.playBlip();
                      navigator.clipboard.writeText(apiKey);
                      setCopiedKey(true);
                      setTimeout(() => setCopiedKey(false), 2000);
                    }}
                    className="pixel-btn px-3 py-2 bg-[#253442] hover:bg-[#324557] text-white text-xs flex items-center gap-1.5 cursor-pointer"
                  >
                    {copiedKey ? <Check className="w-3.5 h-3.5 text-[#10b981]" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedKey ? 'Tersalin' : 'Salin Key'}</span>
                  </button>
                </div>
                <p className="text-[10px] text-[var(--text-muted)] mt-1">
                  Gunakan key ini untuk otentikasi webhook REST API ke backend Node.js.
                </p>
              </div>

              {/* Quotas & limits */}
              <div className="p-3 bg-[#0c1217] border border-[var(--border-color)] space-y-2 text-xs font-mono">
                <span className="font-pixel text-[8px] text-[var(--text-muted)] block">
                  PENGGUNAAN KUOTA BULAN INI:
                </span>
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span>Pesan Terkirim:</span>
                    <span className="text-[#10b981]">147,420 / Unlimited</span>
                  </div>
                  <div className="w-full bg-gray-900 h-2 border border-black">
                    <div className="bg-[#10b981] h-full w-[35%]" />
                  </div>
                </div>
                <div className="space-y-1 pt-1">
                  <div className="flex justify-between">
                    <span>Embeddings Vector AI:</span>
                    <span className="text-[#06b6d4]">18,400 / Unlimited</span>
                  </div>
                  <div className="w-full bg-gray-900 h-2 border border-black">
                    <div className="bg-[#06b6d4] h-full w-[22%]" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'billing' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {tiers.map((t) => {
                  const isCurrent = currentTier === t.name;
                  return (
                    <div
                      key={t.name}
                      className={`p-3.5 border-2 flex flex-col justify-between ${
                        isCurrent
                          ? 'border-[#ec4899] bg-[#1a111a]'
                          : 'border-[var(--border-color)] bg-[#0d141a]'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between">
                          <h4 className="font-pixel text-xs text-[#f5ebe0]">{t.name}</h4>
                          {isCurrent && (
                            <span className="font-pixel text-[8px] bg-[#ec4899] text-black px-1 py-0.2">
                              AKTIF
                            </span>
                          )}
                        </div>
                        <div className="mt-1">
                          <span className="font-bold text-base text-[#f5ebe0]">{t.price}</span>
                          <span className="text-[10px] text-[var(--text-muted)] ml-1">/{t.period}</span>
                        </div>
                        <ul className="mt-2.5 space-y-1 text-xs text-[var(--text-muted)]">
                          {t.features.map((f, i) => (
                            <li key={i} className="flex items-center gap-1.5">
                              <Check className="w-3 h-3 text-[#10b981] shrink-0" />
                              <span className="text-[11px]">{f}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="mt-4">
                        {isCurrent ? (
                          <div className="py-1 text-center font-pixel text-[9px] text-[#ec4899]">
                            Paket Saat Ini
                          </div>
                        ) : (
                          <button
                            onClick={() => {
                              sound.playSuccess();
                              onUpgradeTier(t.name);
                            }}
                            className="w-full pixel-btn py-1.5 bg-[#10b981] hover:bg-[#059669] text-black font-semibold text-xs cursor-pointer"
                          >
                            Pilih Paket {t.name}
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-[#121a22] border-t-2 border-[var(--border-color)] flex justify-end">
          <button
            onClick={() => {
              sound.playBlip();
              onClose();
            }}
            className="pixel-btn px-4 py-1.5 bg-[#253442] text-[#f5ebe0] text-xs cursor-pointer"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
