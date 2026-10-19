import type { BotLog, MarketplacePlugin, PlatformHealth } from '../types/index.ts';

export const INITIAL_WHATSAPP_HEALTH: PlatformHealth = {
  platform: 'whatsapp',
  name: 'WhatsApp Baileys Node #1',
  status: 'online',
  uptimeSeconds: 384200,
  pingMs: 14,
  totalMessagesToday: 84320,
  lastSync: 'Baru saja',
  sessionDetails: {
    phoneNumber: '+62 821-4402-9988',
    authMethod: 'pairing_code',
    browserEngine: 'Chromium 124.0 (Ubuntu x86_64 headless)',
  },
};

export const INITIAL_TELEGRAM_HEALTH: PlatformHealth = {
  platform: 'telegram',
  name: 'Telegram Grammy Engine #1',
  status: 'online',
  uptimeSeconds: 512000,
  pingMs: 8,
  totalMessagesToday: 63100,
  lastSync: 'Baru saja',
  sessionDetails: {
    botUsername: '@AlythraMythicBot',
    authMethod: 'bot_token',
    browserEngine: 'V8 Isolate Worker (Cluster Node #2)',
  },
};

export const INITIAL_LOGS: BotLog[] = [
  {
    id: 'log-001',
    timestamp: '18:50:01',
    platform: 'SYSTEM',
    level: 'INFO',
    message: 'Ubuntu Chromium environment detected at /usr/bin/chromium-browser with sandbox enabled.',
    metadata: 'PID: 4092 · flags: --no-sandbox --disable-setuid-sandbox --headless=new',
  },
  {
    id: 'log-002',
    timestamp: '18:50:04',
    platform: 'WHATSAPP',
    level: 'SUCCESS',
    message: '@whiskeysockets/baileys multi-file auth creds validated. Socket session alive.',
    metadata: 'jid: 6282144029988@s.whatsapp.net',
  },
  {
    id: 'log-003',
    timestamp: '18:50:12',
    platform: 'TELEGRAM',
    level: 'SUCCESS',
    message: 'Grammy bot webhook verified on 443 with TLS 1.3 encryption.',
    metadata: 'bot: @AlythraMythicBot',
  },
  {
    id: 'log-004',
    timestamp: '18:50:25',
    platform: 'WHATSAPP',
    level: 'INFO',
    message: 'Neural Memory Engine processed 12 context embeddings in group [SULTAN_DEV_CORP].',
    metadata: 'latency: 16ms · model: text-embedding-004',
  },
  {
    id: 'log-005',
    timestamp: '18:50:41',
    platform: 'SYSTEM',
    level: 'INFO',
    message: 'Dynamic Economy Engine executed 4 bonding curve adjustments. Burning 25 emeralds.',
    metadata: 'supply: 48,210 EM · velocity: 1.14',
  },
  {
    id: 'log-006',
    timestamp: '18:51:02',
    platform: 'WHATSAPP',
    level: 'WARN',
    message: 'Burst rate traffic surge detected from JID 628991200331 (18 msgs/sec). Token bucket throttled.',
    metadata: 'action: delayed 400ms · quota preserved',
  },
  {
    id: 'log-007',
    timestamp: '18:51:19',
    platform: 'TELEGRAM',
    level: 'SUCCESS',
    message: 'Omni-Bridge Realtime Mirror forwarded media packet from WhatsApp to Telegram Topic #88.',
    metadata: 'hash: sha256_b48f... · payload: 3.4MB',
  },
  {
    id: 'log-008',
    timestamp: '18:51:30',
    platform: 'SYSTEM',
    level: 'SUCCESS',
    message: 'Dual-write state synced to MongoDB Atlas and Supabase PostgreSQL without drift.',
    metadata: 'lag: 4ms · transactions: 42',
  },
];

export const MARKETPLACE_ITEMS: MarketplacePlugin[] = [
  {
    id: 'plug-01',
    name: 'Zero-Knowledge Biometric Tunnel',
    category: 'Security & Forensics',
    version: 'v3.2.0',
    author: 'Alythra Core Lab',
    description: 'Enkripsi data sesi percakapan dengan biometric master key di hardware Secure Enclave.',
    priceEmerald: 450,
    downloads: 1420,
    rating: 4.9,
    installed: true,
    tag: 'ESSENTIAL',
  },
  {
    id: 'plug-02',
    name: 'Neural Voice Synthesizer v4',
    category: 'Creative Audio',
    version: 'v4.0.1',
    author: 'AcousticAI Team',
    description: 'Modul generasi suara hiper-realistis dengan 42 aksen regional dan emosi adaptif.',
    priceEmerald: 620,
    downloads: 2890,
    rating: 5.0,
    installed: true,
    tag: 'BESTSELLER',
  },
  {
    id: 'plug-03',
    name: 'High-Frequency Flash Arbitrage',
    category: 'Economy & Gamification',
    version: 'v1.8.4',
    author: 'Quantum Quant',
    description: 'Bot lelang otomatis antar grup dengan algoritma anti-sniping dan multi-party escrow.',
    priceEmerald: 890,
    downloads: 940,
    rating: 4.8,
    installed: false,
    tag: 'HOT',
  },
  {
    id: 'plug-04',
    name: 'Ubuntu Stealth Chromium Cluster',
    category: 'Web Scraping',
    version: 'v2.5.0',
    author: 'SysOps Enterprise',
    description: 'Manajemen cluster browser headless otomatis untuk scraping anti-bot Cloudflare Turnstile.',
    priceEmerald: 550,
    downloads: 1810,
    rating: 4.9,
    installed: false,
    tag: 'ENTERPRISE',
  },
  {
    id: 'plug-05',
    name: 'Dodeca-Persona Master Weights',
    category: 'AI Model',
    version: 'v2.1.0',
    author: 'Alythra Intelligence',
    description: 'Preset 12 kepribadian eksklusif dengan kosakata tingkat tinggi dan humor sarkasme elegan.',
    priceEmerald: 300,
    downloads: 4120,
    rating: 4.9,
    installed: true,
    tag: 'FEATURED',
  },
  {
    id: 'plug-06',
    name: 'Sub-Zero Ghost Presence Injector',
    category: 'Privacy Stealth',
    version: 'v1.2.2',
    author: 'Phantom Dev',
    description: 'Sembunyikan status online WhatsApp dan baca chat tanpa tanda centang biru secara permanen.',
    priceEmerald: 400,
    downloads: 3200,
    rating: 4.7,
    installed: false,
    tag: 'PRO',
  },
];

export const FAQ_ITEMS = [
  {
    question: 'Bagaimana cara menghubungkan WhatsApp menggunakan Pairing Code Baileys?',
    answer:
      'Di dashboard ALYTHRA, buka tab "Pairing WhatsApp", masukkan nomor telepon yang terhubung (contoh: 6281234567890), lalu klik "Generate Pairing Code". Buka aplikasi WhatsApp di HP Anda > Menu Titik Tiga (atau Pengaturan) > Perangkat Tertaut > Tautkan Perangkat > pilih "Tautkan dengan nomor telepon saja", lalu ketikkan 8 karakter kode pairing yang tertera di layar dashboard.',
  },
  {
    question: 'Mengapa menggunakan Pairing Code, bukan QR Code konvensional?',
    answer:
      'Pairing Code jauh lebih stabil untuk server cloud (VPS/Docker), tidak memerlukan streaming video QR yang membebani bandwidth, dan terhindar dari bug QR timeout saat latency jaringan berfluktuasi.',
  },
  {
    question: 'Bagaimana konfigurasi Browser Automation di environment Ubuntu?',
    answer:
      'ALYTHRA menggunakan engine Chromium asli Ubuntu yang dioptimalkan untuk server headless. Di backend, Puppeteer/Playwright dikonfigurasi dengan executablePath: "/usr/bin/chromium-browser" (atau "/usr/bin/google-chrome-stable") bersama argumen anti-deteksi: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage", "--headless=new"].',
  },
  {
    question: 'Apakah 127 fitur premium aman dari banned WhatsApp?',
    answer:
      'Ya. ALYTHRA dilengkapi dengan "Micro-Batch Blast Dispatcher" dan "High-Velocity Burst Throttle" yang menyimulasikan interval ketik manusiawi (human typing latency) serta rotasi token bucket, meminimalkan risiko deteksi pola otomatis oleh WhatsApp antispam AI.',
  },
  {
    question: 'Berapa kapasitas penyimpanan Neural Memory Engine?',
    answer:
      'Setiap user memiliki kuota vektor embedding hingga 180 hari riwayat obrolan yang disimpan dalam cluster database terenkripsi AES-256-GCM dengan dual-write MongoDB + Supabase.',
  },
];

export const ANALYTICS_DATA = {
  dailyTraffic: [
    { day: 'Sen', wa: 14200, tg: 9400 },
    { day: 'Sel', wa: 16800, tg: 11200 },
    { day: 'Rab', wa: 18900, tg: 13400 },
    { day: 'Kam', wa: 21400, tg: 15600 },
    { day: 'Jum', wa: 24800, tg: 18200 },
    { day: 'Sab', wa: 31200, tg: 24500 },
    { day: 'Min', wa: 34100, tg: 26800 },
  ],
  latencyTimeline: [
    { time: '12:00', ms: 14 },
    { time: '13:00', ms: 16 },
    { time: '14:00', ms: 12 },
    { time: '15:00', ms: 18 },
    { time: '16:00', ms: 15 },
    { time: '17:00', ms: 22 },
    { time: '18:00', ms: 14 },
  ],
  tierBreakdown: {
    Free: 18,
    Pro: 44,
    Elite: 38,
    Mythic: 27,
  },
};
