import test from 'node:test';
import assert from 'node:assert/strict';
import {
  generateBaileysPairingCode,
  sanitizePhoneNumber,
  formatUptime,
  filterBotFeatures,
  filterLogs,
  exportLogsToText,
  computeSystemStats,
} from './botLogic.ts';
import type { BotFeature, BotLog } from '../types/index.ts';

test('generateBaileysPairingCode creates valid 8-char format with hyphen', () => {
  const code = generateBaileysPairingCode('ALY');
  assert.equal(code.length, 9); // 4 + '-' + 4 = 9 chars
  assert.equal(code.includes('-'), true);
  assert.match(code, /^[A-Z0-9]{4}-[A-Z0-9]{4}$/);
});

test('sanitizePhoneNumber formats Indonesian national numbers to international E.164', () => {
  const res1 = sanitizePhoneNumber('0812-3456-7890');
  assert.equal(res1.isValid, true);
  assert.equal(res1.sanitized, '6281234567890');

  const res2 = sanitizePhoneNumber('+62 899 999 1111');
  assert.equal(res2.isValid, true);
  assert.equal(res2.sanitized, '628999991111');

  const resEmpty = sanitizePhoneNumber('   ');
  assert.equal(resEmpty.isValid, false);
});

test('formatUptime correctly converts seconds', () => {
  assert.equal(formatUptime(45), '0m 45s');
  assert.equal(formatUptime(3665), '1h 1m 5s');
  assert.equal(formatUptime(90000), '1d 1h 0m');
});

test('filterBotFeatures correctly filters by query, category, and tier', () => {
  const dummyFeatures: BotFeature[] = [
    {
      id: 'f1',
      number: 1,
      name: 'Neural Memory System',
      category: 'AI & Intelligence Layer',
      description: 'Bot ingat percakapan user sampai 6 bulan',
      tier: 'Mythic',
      isActive: true,
      usageCount: 120,
      latencyMs: 14,
    },
    {
      id: 'f2',
      number: 2,
      name: 'Quantum Scheduler',
      category: 'Quantum Automation & System Engine',
      description: 'Jadwal pesan otomatis',
      tier: 'Pro',
      isActive: false,
      usageCount: 40,
      latencyMs: 8,
    },
    {
      id: 'f3',
      number: 3,
      name: 'Ghost Mode',
      category: 'Ultra Security & Counter-Forensics',
      description: 'Bot aktif tapi offline di WA',
      tier: 'Free',
      isActive: true,
      usageCount: 300,
      latencyMs: 2,
    },
  ];

  // Search by query
  const searchResults = filterBotFeatures(dummyFeatures, 'Memory', 'All', 'All', 'all');
  assert.equal(searchResults.length, 1);
  assert.equal(searchResults[0].id, 'f1');

  // Filter by Tier
  const proResults = filterBotFeatures(dummyFeatures, '', 'All', 'Pro', 'all');
  assert.equal(proResults.length, 1);
  assert.equal(proResults[0].id, 'f2');

  // Filter by Active status
  const activeResults = filterBotFeatures(dummyFeatures, '', 'All', 'All', 'active');
  assert.equal(activeResults.length, 2);

  // Compute stats
  const stats = computeSystemStats(dummyFeatures);
  assert.equal(stats.total, 3);
  assert.equal(stats.activeCount, 2);
  assert.equal(stats.mythicCount, 1);
});

test('filterLogs and exportLogsToText work accurately', () => {
  const dummyLogs: BotLog[] = [
    {
      id: 'l1',
      timestamp: '18:45:00',
      platform: 'WHATSAPP',
      level: 'INFO',
      message: 'Baileys socket handshake accepted',
    },
    {
      id: 'l2',
      timestamp: '18:45:02',
      platform: 'TELEGRAM',
      level: 'ERROR',
      message: 'Polling timeout received',
    },
  ];

  const errorLogs = filterLogs(dummyLogs, '', 'ERROR');
  assert.equal(errorLogs.length, 1);
  assert.equal(errorLogs[0].level, 'ERROR');

  const textExport = exportLogsToText(dummyLogs);
  assert.equal(textExport.includes('Baileys socket handshake'), true);
  assert.equal(textExport.includes('Polling timeout received'), true);
});

test('BOT_FEATURES has exactly 127 items with sequential numbering and valid categories', async () => {
  const { BOT_FEATURES } = await import('../data/features.ts');
  assert.equal(BOT_FEATURES.length, 127, 'BOT_FEATURES count must be exactly 127');
  
  // Verify numbering and presence of fields
  BOT_FEATURES.forEach((feat, index) => {
    assert.equal(feat.number, index + 1, `Feature #${index + 1} has incorrect number: ${feat.number}`);
    assert.ok(feat.id, `Feature #${index + 1} is missing id`);
    assert.ok(feat.name, `Feature #${index + 1} is missing name`);
    assert.ok(feat.description, `Feature #${index + 1} is missing description`);
    assert.ok(['Free', 'Pro', 'Elite', 'Mythic'].includes(feat.tier), `Feature #${index + 1} has invalid tier: ${feat.tier}`);
    assert.ok(feat.category, `Feature #${index + 1} is missing category`);
  });
});
