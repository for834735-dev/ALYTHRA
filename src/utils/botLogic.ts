import type { BotFeature, BotLog, FeatureTier, FeatureCategory, LogLevel } from '../types/index.ts';

/**
 * Generates an 8-character Baileys-style pairing code (e.g., 'ALY7-9K2M')
 */
export function generateBaileysPairingCode(customPrefix: string = 'ALY'): string {
  const chars = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
  let randomPart = '';
  for (let i = 0; i < 5; i++) {
    randomPart += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  const combined = (customPrefix + randomPart).toUpperCase().slice(0, 8);
  return `${combined.slice(0, 4)}-${combined.slice(4, 8)}`;
}

/**
 * Validates and sanitizes phone number for Baileys pairing
 */
export function sanitizePhoneNumber(input: string): { isValid: boolean; sanitized: string; error?: string } {
  const digitsOnly = input.replace(/\D/g, '');
  if (!digitsOnly) {
    return { isValid: false, sanitized: '', error: 'Nomor telepon tidak boleh kosong' };
  }
  if (digitsOnly.length < 9) {
    return { isValid: false, sanitized: digitsOnly, error: 'Nomor telepon terlalu pendek (minimal 9 digit)' };
  }
  if (digitsOnly.length > 15) {
    return { isValid: false, sanitized: digitsOnly, error: 'Nomor telepon melebihi standar E.164 (maks 15 digit)' };
  }
  let sanitized = digitsOnly;
  if (sanitized.startsWith('0')) {
    sanitized = '62' + sanitized.substring(1);
  }
  return { isValid: true, sanitized };
}

/**
 * Formats uptime seconds into human-readable pixel/retro string
 */
export function formatUptime(seconds: number): string {
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  if (days > 0) {
    return `${days}d ${hours}h ${minutes}m`;
  }
  if (hours > 0) {
    return `${hours}h ${minutes}m ${secs}s`;
  }
  return `${minutes}m ${secs}s`;
}

/**
 * Filters bot features based on search query, category, and tier
 */
export function filterBotFeatures(
  features: BotFeature[],
  query: string,
  category: FeatureCategory | 'All',
  tier: FeatureTier | 'All',
  statusFilter: 'all' | 'active' | 'inactive' = 'all'
): BotFeature[] {
  const q = query.toLowerCase().trim();

  return features.filter((feat) => {
    const matchesQuery =
      !q ||
      feat.name.toLowerCase().includes(q) ||
      feat.description.toLowerCase().includes(q) ||
      feat.category.toLowerCase().includes(q) ||
      String(feat.number) === q;

    const matchesCategory = category === 'All' || feat.category === category;
    const matchesTier = tier === 'All' || feat.tier === tier;
    const matchesStatus =
      statusFilter === 'all'
        ? true
        : statusFilter === 'active'
        ? feat.isActive
        : !feat.isActive;

    return matchesQuery && matchesCategory && matchesTier && matchesStatus;
  });
}

/**
 * Filters log entries based on search and level
 */
export function filterLogs(
  logs: BotLog[],
  searchQuery: string,
  level: LogLevel | 'ALL'
): BotLog[] {
  const q = searchQuery.toLowerCase().trim();
  return logs.filter((log) => {
    const matchesLevel = level === 'ALL' || log.level === level;
    const matchesSearch =
      !q ||
      log.message.toLowerCase().includes(q) ||
      log.platform.toLowerCase().includes(q) ||
      (log.metadata && log.metadata.toLowerCase().includes(q));
    return matchesLevel && matchesSearch;
  });
}

/**
 * Exports logs to standard text file content
 */
export function exportLogsToText(logs: BotLog[]): string {
  const header = `# ALYTHRA ENGINE CONSOLE LOG EXPORT\n# Generated at: ${new Date().toISOString()}\n# Total Records: ${logs.length}\n----------------------------------------\n`;
  const body = logs
    .map(
      (l) =>
        `[${l.timestamp}] [${l.platform}] [${l.level}] ${l.message}${
          l.metadata ? ` | Meta: ${l.metadata}` : ''
        }`
    )
    .join('\n');
  return header + body;
}

/**
 * Calculate system health metrics
 */
export function computeSystemStats(features: BotFeature[]) {
  const total = features.length;
  const activeCount = features.filter((f) => f.isActive).length;
  const mythicCount = features.filter((f) => f.tier === 'Mythic').length;
  const totalExecutions = features.reduce((acc, f) => acc + f.usageCount, 0);
  const avgLatency =
    total > 0
      ? Math.round(features.reduce((acc, f) => acc + f.latencyMs, 0) / total)
      : 0;

  return {
    total,
    activeCount,
    inactiveCount: total - activeCount,
    mythicCount,
    totalExecutions,
    avgLatency,
    operationalHealthPercentage: total > 0 ? Math.round((activeCount / total) * 100) : 0,
  };
}
