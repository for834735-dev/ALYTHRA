import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar.tsx';
import { BottomNav, type NavTab } from './components/BottomNav.tsx';
import { SidebarDrawer } from './components/SidebarDrawer.tsx';
import { BotControlView } from './components/BotControlView.tsx';
import { ConsoleView } from './components/ConsoleView.tsx';
import { FeatureManagerView } from './components/FeatureManagerView.tsx';
import { FeatureConfigModal } from './components/FeatureConfigModal.tsx';
import { AnalyticsView } from './components/AnalyticsView.tsx';
import { StoreMarketplaceView } from './components/StoreMarketplaceView.tsx';
import { PairingModal } from './components/PairingModal.tsx';
import { ProfileBillingModal } from './components/ProfileBillingModal.tsx';
import { SettingsModal } from './components/SettingsModal.tsx';
import { FaqModal } from './components/FaqModal.tsx';
import { ToastNotification, type ToastData } from './components/ToastNotification.tsx';
import { BOT_FEATURES } from './data/features.ts';
import {
  INITIAL_WHATSAPP_HEALTH,
  INITIAL_TELEGRAM_HEALTH,
  INITIAL_LOGS,
  MARKETPLACE_ITEMS,
} from './data/mockData.ts';
import type { BotFeature, BotLog, LogLevel, MarketplacePlugin, PlatformHealth } from './types/index.ts';
import { sound } from './utils/sound.ts';

export default function App() {
  // Theme state
  const [theme, setTheme] = useState<string>('dark');

  // Navigation tab state
  const [activeTab, setActiveTab] = useState<NavTab>('bot');

  // Sound FX state
  const [soundMuted, setSoundMuted] = useState(false);

  // Bot Features state (127 items)
  const [features, setFeatures] = useState<BotFeature[]>(BOT_FEATURES);

  // Platform Health
  const [waHealth, setWaHealth] = useState<PlatformHealth>(INITIAL_WHATSAPP_HEALTH);
  const [tgHealth, setTgHealth] = useState<PlatformHealth>(INITIAL_TELEGRAM_HEALTH);

  // Console Logs
  const [logs, setLogs] = useState<BotLog[]>(INITIAL_LOGS);

  // Marketplace items & wallet
  const [marketplaceItems, setMarketplaceItems] = useState<MarketplacePlugin[]>(MARKETPLACE_ITEMS);
  const [emeralds, setEmeralds] = useState<number>(4850);
  const [currentTier, setCurrentTier] = useState<string>('Mythic');

  // Modals state
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isPairingOpen, setIsPairingOpen] = useState(false);
  const [configFeature, setConfigFeature] = useState<BotFeature | null>(null);
  const [isProfileBillingOpen, setIsProfileBillingOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isFaqOpen, setIsFaqOpen] = useState(false);

  // Toast Notification state
  const [toasts, setToasts] = useState<ToastData[]>([]);

  const addToast = (type: 'success' | 'error' | 'info', title: string, message: string) => {
    const newToast: ToastData = {
      id: `toast-${Date.now()}-${Math.random()}`,
      type,
      title,
      message,
    };
    setToasts((prev) => [...prev, newToast]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== newToast.id));
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Sync theme attribute to root
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Periodic heartbeat log simulation
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const timeStr = now.toTimeString().slice(0, 8);
      const simulatedEvents: Array<{
        level: LogLevel;
        platform: 'SYSTEM' | 'WHATSAPP' | 'TELEGRAM';
        message: string;
        metadata: string;
      }> = [
        {
          level: 'INFO',
          platform: 'WHATSAPP',
          message: 'Burst rate check: 24 incoming message packets processed without loss.',
          metadata: 'jitter: 3ms · queue: clean',
        },
        {
          level: 'SUCCESS',
          platform: 'TELEGRAM',
          message: 'Dodeca-Persona: contextual tone match calculated for user session.',
          metadata: 'persona: Cynical Hacker · confidence: 0.96',
        },
        {
          level: 'INFO',
          platform: 'SYSTEM',
          message: 'Ubuntu headless worker: memory RSS stable at 284 MB. No leak detected.',
          metadata: 'cgroup: isolated · node: #1',
        },
      ];

      const chosen = simulatedEvents[Math.floor(Math.random() * simulatedEvents.length)];
      setLogs((prev) => {
        const newLog: BotLog = {
          id: `log-${Date.now()}`,
          timestamp: timeStr,
          level: chosen.level,
          platform: chosen.platform,
          message: chosen.message,
          metadata: chosen.metadata,
        };
        return [...prev.slice(-450), newLog];
      });
    }, 18000);

    return () => clearInterval(interval);
  }, []);

  // Handlers
  const handleToggleSound = () => {
    const muted = sound.toggleMute();
    setSoundMuted(muted);
    addToast(
      'info',
      muted ? 'Audio Dinonaktifkan' : 'Audio 8-Bit Aktif',
      muted ? 'Efek suara retro dimatikan.' : 'Efek suara blip & chimes aktif.'
    );
  };

  const handleToggleFeature = (id: string) => {
    setFeatures((prev) =>
      prev.map((f) => {
        if (f.id === id) {
          const nextState = !f.isActive;
          addToast(
            nextState ? 'success' : 'info',
            nextState ? 'Fitur Diaktifkan' : 'Fitur Dimatikan',
            `${f.name} sekarang ${nextState ? 'berjalan' : 'tidak aktif'}.`
          );
          return { ...f, isActive: nextState };
        }
        return f;
      })
    );
  };

  const handleSaveFeatureConfig = (
    id: string,
    updatedConfig: Record<string, string | number | boolean>
  ) => {
    setFeatures((prev) =>
      prev.map((f) => (f.id === id ? { ...f, config: updatedConfig } : f))
    );
    addToast('success', 'Konfigurasi Tersimpan', 'Parameter runtime berhasil diperbarui di memori node.');
  };

  const handlePairingSuccess = (platform: 'whatsapp' | 'telegram', identifier: string) => {
    if (platform === 'whatsapp') {
      setWaHealth((prev) => ({
        ...prev,
        status: 'online',
        sessionDetails: {
          ...prev.sessionDetails,
          phoneNumber: identifier,
        },
      }));
      addToast('success', 'WhatsApp Terhubung!', `Pairing code diterima. Nomor ${identifier} aktif.`);
      setLogs((prev) => [
        ...prev,
        {
          id: `log-${Date.now()}`,
          timestamp: new Date().toTimeString().slice(0, 8),
          platform: 'WHATSAPP',
          level: 'SUCCESS',
          message: `Baileys socket authenticated successfully with phone ${identifier}`,
          metadata: 'handshake: completed · multi_file_creds: valid',
        },
      ]);
    } else {
      setTgHealth((prev) => ({
        ...prev,
        status: 'online',
        sessionDetails: {
          ...prev.sessionDetails,
          botUsername: identifier,
        },
      }));
      addToast('success', 'Telegram Terhubung!', `Bot token valid. ${identifier} siap menerima webhook.`);
    }
  };

  const handleRestartWorker = () => {
    sound.playBlip();
    setWaHealth((prev) => ({ ...prev, status: 'connecting' }));
    addToast('info', 'Merestart Worker', 'Node Ubuntu memuat ulang container process...');
    setTimeout(() => {
      setWaHealth((prev) => ({ ...prev, status: 'online', uptimeSeconds: 0 }));
      sound.playSuccess();
      addToast('success', 'Worker Siap', 'Semua socket Baileys & Grammy kembali online.');
    }, 1200);
  };

  const handleSyncHandshake = () => {
    sound.playBlip();
    const newPing = Math.floor(Math.random() * 8) + 10;
    setWaHealth((prev) => ({ ...prev, pingMs: newPing, lastSync: 'Baru saja' }));
    addToast('info', 'Ping Sukses', `Handshake socket WhatsApp latency: ${newPing} ms.`);
  };

  const handleSendTestMessage = () => {
    sound.playSuccess();
    setWaHealth((prev) => ({
      ...prev,
      totalMessagesToday: prev.totalMessagesToday + 1,
    }));
    addToast('success', 'Broadcast Uji Coba Terkirim', 'Pesan uji coba berhasil disalurkan ke node tester.');
  };

  const handleClearLogs = () => {
    sound.playBlip();
    setLogs([]);
    addToast('info', 'Console Dibersihkan', 'Buffer log event telah dikosongkan.');
  };

  const handleInjectLog = (
    level: LogLevel,
    message: string,
    platform: 'SYSTEM' | 'WHATSAPP' | 'TELEGRAM'
  ) => {
    const newLog: BotLog = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toTimeString().slice(0, 8),
      platform,
      level,
      message,
      metadata: 'user_injected_event: true',
    };
    setLogs((prev) => [...prev, newLog]);
  };

  const handleInstallPlugin = (id: string) => {
    const item = marketplaceItems.find((p) => p.id === id);
    if (!item) return;
    if (emeralds < item.priceEmerald) {
      sound.playError();
      addToast('error', 'Saldo Emerald Kurang', `Anda membutuhkan ${item.priceEmerald} EM untuk memasang plugin ini.`);
      return;
    }
    setEmeralds((prev) => prev - item.priceEmerald);
    setMarketplaceItems((prev) =>
      prev.map((p) => (p.id === id ? { ...p, installed: true, downloads: p.downloads + 1 } : p))
    );
    addToast('success', 'Plugin Dipasang', `${item.name} berhasil diintegrasikan ke cluster.`);
  };

  const handleUninstallPlugin = (id: string) => {
    setMarketplaceItems((prev) =>
      prev.map((p) => (p.id === id ? { ...p, installed: false } : p))
    );
    addToast('info', 'Plugin Dihapus', 'Modul telah dicopot dari runtime.');
  };

  const handleUpgradeTier = (tier: string) => {
    setCurrentTier(tier);
    addToast('success', 'Langganan Diperbarui', `Akun Anda sekarang berada di tingkat ${tier}.`);
  };

  const handleLogoutSession = () => {
    addToast('info', 'Sesi Direset', 'Cache browser dan session token telah dibersihkan.');
    setIsSidebarOpen(false);
  };

  const activeFeaturesCount = features.filter((f) => f.isActive).length;

  return (
    <div className="min-h-screen bg-[var(--bg-main)] text-[var(--text-primary)] pixel-grid-pattern relative flex flex-col">
      {/* Top Navigation Bar */}
      <Navbar
        onOpenSidebar={() => setIsSidebarOpen(true)}
        soundMuted={soundMuted}
        onToggleSound={handleToggleSound}
        waStatus={waHealth.status}
        tgStatus={tgHealth.status}
        activeFeaturesCount={activeFeaturesCount}
        totalFeaturesCount={features.length}
      />

      {/* Main Container */}
      <main className="flex-1 w-full max-w-6xl mx-auto px-4 pt-5 pb-20">
        {activeTab === 'bot' && (
          <BotControlView
            waHealth={waHealth}
            tgHealth={tgHealth}
            onOpenPairing={() => setIsPairingOpen(true)}
            onRestartWorker={handleRestartWorker}
            onSyncHandshake={handleSyncHandshake}
            onSendTestMessage={handleSendTestMessage}
            activeFeaturesCount={activeFeaturesCount}
          />
        )}

        {activeTab === 'console' && (
          <ConsoleView
            logs={logs}
            onClearLogs={handleClearLogs}
            onInjectLog={handleInjectLog}
          />
        )}

        {activeTab === 'features' && (
          <FeatureManagerView
            features={features}
            onToggleFeature={handleToggleFeature}
            onOpenConfig={(f) => setConfigFeature(f)}
          />
        )}

        {activeTab === 'analytics' && <AnalyticsView />}

        {activeTab === 'store' && (
          <StoreMarketplaceView
            items={marketplaceItems}
            emeralds={emeralds}
            onInstallPlugin={handleInstallPlugin}
            onUninstallPlugin={handleUninstallPlugin}
          />
        )}
      </main>

      {/* Fixed Bottom Navigation Bar */}
      <BottomNav activeTab={activeTab} onSelectTab={(t) => setActiveTab(t)} />

      {/* Sliding Retro Sidebar Drawer */}
      <SidebarDrawer
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        onOpenProfileBilling={() => setIsProfileBillingOpen(true)}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onOpenFaq={() => setIsFaqOpen(true)}
        currentTheme={theme}
        onChangeTheme={(t) => setTheme(t)}
        onLogoutSession={handleLogoutSession}
      />

      {/* Pairing Wizard Modal */}
      <PairingModal
        isOpen={isPairingOpen}
        onClose={() => setIsPairingOpen(false)}
        onPairingSuccess={handlePairingSuccess}
      />

      {/* Feature Config Parameter Inspector Modal */}
      <FeatureConfigModal
        feature={configFeature}
        onClose={() => setConfigFeature(null)}
        onSaveConfig={handleSaveFeatureConfig}
      />

      {/* Profile & Billing Modal */}
      <ProfileBillingModal
        isOpen={isProfileBillingOpen}
        onClose={() => setIsProfileBillingOpen(false)}
        currentTier={currentTier}
        onUpgradeTier={handleUpgradeTier}
      />

      {/* Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        soundMuted={soundMuted}
        onToggleSound={handleToggleSound}
      />

      {/* FAQ & Documentation Modal */}
      <FaqModal isOpen={isFaqOpen} onClose={() => setIsFaqOpen(false)} />

      {/* Pixel Toast Notifications */}
      <ToastNotification toasts={toasts} onDismiss={removeToast} />
    </div>
  );
}
