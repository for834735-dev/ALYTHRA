export type BotPlatform = 'whatsapp' | 'telegram';

export type BotStatus = 'online' | 'pairing' | 'connecting' | 'offline' | 'error';

export type FeatureTier = 'Free' | 'Pro' | 'Elite' | 'Mythic';

export type FeatureCategory =
  | 'AI & Intelligence Layer'
  | 'Quantum Automation & System Engine'
  | 'Ultra Security & Counter-Forensics'
  | 'Dynamic Economy & Web3 Gamification'
  | 'Creative Synthetics & Studio Engine'
  | 'Cross-Protocol & Mirror Synchronization'
  | 'Intelligence Scraping & Deep Data Extraction'
  | 'Enterprise Infrastructure & High-Frequency Webhooks';

export interface BotFeature {
  id: string;
  number: number;
  name: string;
  category: FeatureCategory;
  description: string;
  tier: FeatureTier;
  isActive: boolean;
  usageCount: number;
  latencyMs: number;
  config?: Record<string, string | number | boolean>;
}

export type LogLevel = 'INFO' | 'WARN' | 'ERROR' | 'SUCCESS';

export interface BotLog {
  id: string;
  timestamp: string;
  platform: 'SYSTEM' | 'WHATSAPP' | 'TELEGRAM';
  level: LogLevel;
  message: string;
  metadata?: string;
}

export interface PlatformHealth {
  platform: BotPlatform;
  name: string;
  status: BotStatus;
  uptimeSeconds: number;
  pingMs: number;
  totalMessagesToday: number;
  lastSync: string;
  sessionDetails: {
    phoneNumber?: string;
    botUsername?: string;
    authMethod: 'pairing_code' | 'bot_token';
    browserEngine: string;
  };
}

export interface MarketplacePlugin {
  id: string;
  name: string;
  category: string;
  version: string;
  author: string;
  description: string;
  priceEmerald: number;
  downloads: number;
  rating: number;
  installed: boolean;
  tag: string;
}
