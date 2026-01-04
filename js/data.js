/* ============================================
   MUSE Mock Data — Leads, Mandates, Tariffs
   
   ID Convention:
   - Lead ID: LD-YYMM-XXXX (e.g., LD-2601-0001)
   - Mandate ID: MND-YYMM-XXXX (linked to Lead)
   - Tariff Request ID: TRF-YYMM-XXXX (linked to Mandate if needed)
   - Company ID: CMP-XXXXX (permanent after Live)
   ============================================ */

// ========== ID GENERATOR ==========
const IDGenerator = {
  leadCounter: 15,
  mandateCounter: 8,
  tariffCounter: 4,
  companyCounter: 103,
  
  generateLeadId() {
    this.leadCounter++;
    const month = new Date().toISOString().slice(2,4) + new Date().toISOString().slice(5,7);
    return `LD-${month}-${String(this.leadCounter).padStart(4, '0')}`;
  },
  
  generateMandateId() {
    this.mandateCounter++;
    return `MND-2601-${String(this.mandateCounter).padStart(4, '0')}`;
  },
  
  generateTariffId() {
    this.tariffCounter++;
    return `TRF-2601-${String(this.tariffCounter).padStart(4, '0')}`;
  },
  
  generateCompanyId() {
    this.companyCounter++;
    return `CMP-${String(this.companyCounter).padStart(5, '0')}`;
  }
};

// ========== PIPELINE STAGES ==========
const PIPELINE_STAGES = [
  { id: 'opportunity', name: 'Opportunity Gathering', color: '#6366f1' },
  { id: 'solutioning', name: 'Solutioning', color: '#0ea5e9' },
  { id: 'negosiasi', name: 'Negosiasi', color: '#f59e0b' },
  { id: 'won', name: 'Won Deal', color: '#10b981' },
  { id: 'live', name: 'Live', color: '#003d79' }
];

// ========== PRODUCTS ==========
const PRODUCTS = [
  'Cash Management',
  'Trade Finance',
  'Bank Garansi',
  'Supply Chain Financing',
  'Virtual Account',
  'Payroll',
  'Collection'
];

// ========== SEGMENTS ==========
const SEGMENTS = ['Corporate', 'Commercial', 'SME', 'Kelembagaan'];

// ========== LEADS DATA ==========
const LEADS = [
  // ===== OPPORTUNITY GATHERING =====
  {
    id: 'LD-2601-0001',
    company: 'PT Pertamina Persero',
    segment: 'Corporate',
    product: 'Cash Management',
    value: 2500000000,
    stage: 'opportunity',
    assignee: 'so-1',
    daysInStage: 3,
    priority: 'high',
    lastActivity: '2026-01-03',
    nextFollowUp: '2026-01-06',
    followUpAction: 'Jadwalkan meeting pitching ke CFO',
    companyId: null,
    mandateId: null,
    tariffRequestId: null
  },
  {
    id: 'LD-2601-0002',
    company: 'PT PLN Persero',
    segment: 'Corporate',
    product: 'Virtual Account',
    value: 1800000000,
    stage: 'opportunity',
    assignee: 'so-2',
    daysInStage: 5,
    priority: 'high',
    lastActivity: '2026-01-02',
    nextFollowUp: '2026-01-05',
    followUpAction: 'Follow up email proposal VA',
    companyId: null,
    mandateId: null,
    tariffRequestId: null
  },
  {
    id: 'LD-2601-0003',
    company: 'PT Garuda Indonesia',
    segment: 'Corporate',
    product: 'Trade Finance',
    value: 950000000,
    stage: 'opportunity',
    assignee: 'so-3',
    daysInStage: 2,
    priority: 'medium',
    lastActivity: '2026-01-04',
    nextFollowUp: '2026-01-08',
    followUpAction: 'Kirim company profile dan product sheet',
    companyId: null,
    mandateId: null,
    tariffRequestId: null
  },
  
  // ===== SOLUTIONING =====
  {
    id: 'LD-2601-0004',
    company: 'PT Telkom Indonesia',
    segment: 'Corporate',
    product: 'Cash Management',
    value: 3200000000,
    stage: 'solutioning',
    assignee: 'so-1',
    daysInStage: 7,
    priority: 'high',
    lastActivity: '2026-01-01',
    nextFollowUp: '2026-01-04',
    followUpAction: 'Presentasi solusi ke tim finance',
    companyId: null,
    mandateId: null,
    tariffRequestId: null
  },
  {
    id: 'LD-2601-0005',
    company: 'PT Indosat Ooredoo',
    segment: 'Corporate',
    product: 'Supply Chain Financing',
    value: 1500000000,
    stage: 'solutioning',
    assignee: 'so-2',
    daysInStage: 4,
    priority: 'medium',
    lastActivity: '2026-01-03',
    nextFollowUp: '2026-01-07',
    followUpAction: 'Demo produk SCF ke procurement',
    companyId: null,
    mandateId: null,
    tariffRequestId: null
  },
  {
    id: 'LD-2601-0006',
    company: 'Hermina Hospital Group',
    segment: 'Commercial',
    product: 'Payroll',
    value: 750000000,
    stage: 'solutioning',
    assignee: 'so-4',
    daysInStage: 6,
    priority: 'medium',
    lastActivity: '2026-01-02',
    nextFollowUp: '2026-01-06',
    followUpAction: 'Meeting dengan HR Director',
    companyId: null,
    mandateId: null,
    tariffRequestId: null
  },
  
  // ===== NEGOSIASI =====
  {
    id: 'LD-2601-0007',
    company: 'PT Astra International',
    segment: 'Corporate',
    product: 'Bank Garansi',
    value: 5000000000,
    stage: 'negosiasi',
    assignee: 'so-1',
    daysInStage: 12,
    priority: 'high',
    lastActivity: '2025-12-28',
    nextFollowUp: '2026-01-05',
    followUpAction: 'Negosiasi final pricing dengan Treasury',
    companyId: null,
    mandateId: null,
    tariffRequestId: 'TRF-2601-0001'
  },
  {
    id: 'LD-2601-0008',
    company: 'PT Adaro Energy',
    segment: 'Corporate',
    product: 'Trade Finance',
    value: 2800000000,
    stage: 'negosiasi',
    assignee: 'so-3',
    daysInStage: 8,
    priority: 'high',
    lastActivity: '2026-01-01',
    nextFollowUp: '2026-01-04',
    followUpAction: 'Review draft PKS dengan legal',
    companyId: null,
    mandateId: null,
    tariffRequestId: 'TRF-2601-0002'
  },
  {
    id: 'LD-2601-0009',
    company: 'PT Sampoerna',
    segment: 'Corporate',
    product: 'Cash Management',
    value: 1200000000,
    stage: 'negosiasi',
    assignee: 'so-2',
    daysInStage: 5,
    priority: 'medium',
    lastActivity: '2026-01-03',
    nextFollowUp: '2026-01-06',
    followUpAction: 'Finalisasi kontrak',
    companyId: null,
    mandateId: null,
    tariffRequestId: null
  },
  
  // ===== WON DEAL (with Mandate ID) =====
  {
    id: 'LD-2601-0010',
    company: 'PT Bukalapak',
    segment: 'Commercial',
    product: 'Virtual Account',
    value: 890000000,
    stage: 'won',
    assignee: 'so-4',
    daysInStage: 3,
    priority: 'medium',
    lastActivity: '2026-01-02',
    nextFollowUp: '2026-01-05',
    followUpAction: 'Koordinasi implementasi dengan tim IT',
    companyId: null,
    mandateId: 'MND-2601-0001',
    tariffRequestId: null
  },
  {
    id: 'LD-2601-0011',
    company: 'PT Tokopedia',
    segment: 'Corporate',
    product: 'Collection',
    value: 1650000000,
    stage: 'won',
    assignee: 'so-1',
    daysInStage: 2,
    priority: 'high',
    lastActivity: '2026-01-03',
    nextFollowUp: '2026-01-06',
    followUpAction: 'Kick-off meeting implementasi',
    companyId: null,
    mandateId: 'MND-2601-0002',
    tariffRequestId: 'TRF-2601-0003'
  },
  
  // ===== LIVE (with Company ID) =====
  {
    id: 'LD-2512-0012',
    company: 'PT Unilever Indonesia',
    segment: 'Corporate',
    product: 'Payroll',
    value: 2100000000,
    stage: 'live',
    assignee: 'so-2',
    daysInStage: 15,
    priority: 'medium',
    lastActivity: '2025-12-20',
    nextFollowUp: '2026-01-15',
    followUpAction: 'Review performa Q1',
    companyId: 'CMP-00098',
    mandateId: 'MND-2512-0005',
    tariffRequestId: null
  },
  {
    id: 'LD-2512-0013',
    company: 'PT Bank Central Asia',
    segment: 'Kelembagaan',
    product: 'Cash Management',
    value: 4500000000,
    stage: 'live',
    assignee: 'so-5',
    daysInStage: 20,
    priority: 'high',
    lastActivity: '2025-12-15',
    nextFollowUp: '2026-01-10',
    followUpAction: 'Cross-sell produk Trade Finance',
    companyId: 'CMP-00095',
    mandateId: 'MND-2512-0004',
    tariffRequestId: 'TRF-2512-0001'
  },
  {
    id: 'LD-2512-0014',
    company: 'PT Semen Indonesia',
    segment: 'Corporate',
    product: 'Bank Garansi',
    value: 3800000000,
    stage: 'live',
    assignee: 'so-3',
    daysInStage: 25,
    priority: 'medium',
    lastActivity: '2025-12-10',
    nextFollowUp: '2026-01-20',
    followUpAction: 'Evaluasi perpanjangan BG',
    companyId: 'CMP-00092',
    mandateId: 'MND-2512-0003',
    tariffRequestId: null
  },
  {
    id: 'LD-2511-0015',
    company: 'PT Gudang Garam',
    segment: 'Corporate',
    product: 'Trade Finance',
    value: 2200000000,
    stage: 'live',
    assignee: 'so-1',
    daysInStage: 45,
    priority: 'medium',
    lastActivity: '2025-11-20',
    nextFollowUp: '2026-02-01',
    followUpAction: 'Review tahunan',
    companyId: 'CMP-00088',
    mandateId: 'MND-2511-0002',
    tariffRequestId: null
  }
];

// ========== MANDATES DATA ==========
const MANDATES = [
  {
    id: 'MND-2601-0001',
    leadId: 'LD-2601-0010',
    company: 'PT Bukalapak',
    product: 'Virtual Account',
    status: 'in_progress',
    submittedBy: 'so-4',
    submittedAt: '2026-01-02',
    implementorId: 'imp-1',
    documents: { required: 5, complete: 3 },
    targetLive: '2026-01-15'
  },
  {
    id: 'MND-2601-0002',
    leadId: 'LD-2601-0011',
    company: 'PT Tokopedia',
    product: 'Collection',
    status: 'pending_docs',
    submittedBy: 'so-1',
    submittedAt: '2026-01-03',
    implementorId: 'imp-2',
    documents: { required: 6, complete: 4 },
    targetLive: '2026-01-20',
    tariffRequestId: 'TRF-2601-0003'
  },
  {
    id: 'MND-2512-0003',
    leadId: 'LD-2512-0014',
    company: 'PT Semen Indonesia',
    product: 'Bank Garansi',
    status: 'completed',
    submittedBy: 'so-3',
    submittedAt: '2025-12-05',
    implementorId: 'imp-1',
    documents: { required: 4, complete: 4 },
    completedAt: '2025-12-10'
  },
  {
    id: 'MND-2512-0004',
    leadId: 'LD-2512-0013',
    company: 'PT Bank Central Asia',
    product: 'Cash Management',
    status: 'completed',
    submittedBy: 'so-5',
    submittedAt: '2025-12-10',
    implementorId: 'imp-3',
    documents: { required: 5, complete: 5 },
    completedAt: '2025-12-15',
    tariffRequestId: 'TRF-2512-0001'
  },
  {
    id: 'MND-2512-0005',
    leadId: 'LD-2512-0012',
    company: 'PT Unilever Indonesia',
    product: 'Payroll',
    status: 'completed',
    submittedBy: 'so-2',
    submittedAt: '2025-12-15',
    implementorId: 'imp-2',
    documents: { required: 4, complete: 4 },
    completedAt: '2025-12-20'
  }
];

// ========== TARIFF REQUESTS DATA ==========
const TARIFF_REQUESTS = [
  {
    id: 'TRF-2601-0001',
    leadId: 'LD-2601-0007',
    mandateId: null,
    company: 'PT Astra International',
    product: 'Bank Garansi',
    normalFee: 0.5,
    proposedFee: 0.35,
    discountPercent: 30,
    frequency: 12,
    feeLostYear: 180000000,
    minBalance: 4500000000,
    commitmentBalance: 5000000000,
    nii: 200000000,
    netImpact: 20000000,
    status: 'approved',
    submittedBy: 'so-1',
    submittedAt: '2025-12-25',
    approvedBy: 'sh-1',
    approvedAt: '2025-12-28',
    justification: 'Nasabah premium dengan potensi cross-sell produk lain'
  },
  {
    id: 'TRF-2601-0002',
    leadId: 'LD-2601-0008',
    mandateId: null,
    company: 'PT Adaro Energy',
    product: 'Trade Finance',
    normalFee: 0.1,
    proposedFee: 0.08,
    discountPercent: 20,
    frequency: 24,
    feeLostYear: 134400000,
    minBalance: 3360000000,
    commitmentBalance: 3000000000,
    nii: 120000000,
    netImpact: -14400000,
    status: 'rejected',
    submittedBy: 'so-3',
    submittedAt: '2025-12-28',
    rejectedBy: 'ph-1',
    rejectedAt: '2026-01-02',
    rejectReason: 'Komitmen saldo tidak mencukupi BEP'
  },
  {
    id: 'TRF-2601-0003',
    leadId: 'LD-2601-0011',
    mandateId: 'MND-2601-0002',
    company: 'PT Tokopedia',
    product: 'Collection',
    normalFee: 2000,
    proposedFee: 1500,
    discountPercent: 25,
    frequency: 50000,
    feeLostYear: 300000000,
    minBalance: 7500000000,
    commitmentBalance: 8000000000,
    nii: 320000000,
    netImpact: 20000000,
    status: 'approved',
    submittedBy: 'so-1',
    submittedAt: '2026-01-02',
    approvedBy: 'sh-1',
    approvedAt: '2026-01-03',
    justification: 'Volume transaksi tinggi, nasabah strategis'
  },
  {
    id: 'TRF-2601-0004',
    leadId: null,
    mandateId: null,
    company: 'PT XL Axiata',
    product: 'Payroll',
    normalFee: 2500,
    proposedFee: 0,
    discountPercent: 100,
    frequency: 3000,
    feeLostYear: 90000000,
    minBalance: 2250000000,
    commitmentBalance: null,
    nii: null,
    netImpact: null,
    status: 'pending',
    submittedBy: 'so-2',
    submittedAt: '2026-01-03',
    justification: 'Free payroll sebagai gate opener untuk produk lain'
  },
  {
    id: 'TRF-2512-0001',
    leadId: 'LD-2512-0013',
    mandateId: 'MND-2512-0004',
    company: 'PT Bank Central Asia',
    product: 'Cash Management',
    normalFee: 5000,
    proposedFee: 3500,
    discountPercent: 30,
    frequency: 10000,
    feeLostYear: 180000000,
    minBalance: 4500000000,
    commitmentBalance: 6000000000,
    nii: 240000000,
    netImpact: 60000000,
    status: 'approved',
    submittedBy: 'so-5',
    submittedAt: '2025-12-08',
    approvedBy: 'gh-1',
    approvedAt: '2025-12-10',
    justification: 'Strategic account FI segment'
  }
];

// ========== DASHBOARD STATS ==========
const DASHBOARD_STATS = {
  totalPipeline: 24500000000,
  activeLeads: 14,
  wonThisMonth: 3,
  conversionRate: 68,
  targetAchievement: 82,
  pipelineByStage: {
    opportunity: { count: 3, value: 5250000000 },
    solutioning: { count: 3, value: 5450000000 },
    negosiasi: { count: 3, value: 9000000000 },
    won: { count: 2, value: 2540000000 },
    live: { count: 4, value: 12600000000 }
  }
};

// ========== LEADERBOARD ==========
const LEADERBOARD = [
  { id: 'so-1', points: 2850, wonDeals: 8, liveDeals: 12, streak: 5 },
  { id: 'so-2', points: 2420, wonDeals: 7, liveDeals: 10, streak: 3 },
  { id: 'so-3', points: 2180, wonDeals: 6, liveDeals: 9, streak: 4 },
  { id: 'so-4', points: 1950, wonDeals: 5, liveDeals: 8, streak: 2 },
  { id: 'so-5', points: 1820, wonDeals: 5, liveDeals: 7, streak: 3 },
  { id: 'so-6', points: 1680, wonDeals: 4, liveDeals: 7, streak: 1 },
  { id: 'so-7', points: 1520, wonDeals: 4, liveDeals: 6, streak: 2 },
  { id: 'so-8', points: 1450, wonDeals: 4, liveDeals: 5, streak: 0 },
  { id: 'so-9', points: 1380, wonDeals: 3, liveDeals: 6, streak: 1 },
  { id: 'so-10', points: 1290, wonDeals: 3, liveDeals: 5, streak: 2 },
  { id: 'so-11', points: 1150, wonDeals: 3, liveDeals: 4, streak: 0 },
  { id: 'so-12', points: 1080, wonDeals: 2, liveDeals: 5, streak: 1 },
  { id: 'so-13', points: 980, wonDeals: 2, liveDeals: 4, streak: 0 },
  { id: 'so-14', points: 920, wonDeals: 2, liveDeals: 3, streak: 1 },
  { id: 'so-15', points: 850, wonDeals: 2, liveDeals: 3, streak: 0 },
  { id: 'so-16', points: 780, wonDeals: 1, liveDeals: 3, streak: 0 },
  { id: 'so-17', points: 720, wonDeals: 1, liveDeals: 2, streak: 1 },
  { id: 'so-18', points: 650, wonDeals: 1, liveDeals: 2, streak: 0 },
  { id: 'so-19', points: 580, wonDeals: 1, liveDeals: 1, streak: 0 },
  { id: 'imp-1', points: 520, wonDeals: 0, liveDeals: 4, streak: 2 }
];

// ========== ANALYTICS DATA ==========
const ANALYTICS_DATA = {
  revenueTrend: [
    { month: 'Jul 2025', revenue: 12500000000, frequency: 45, volume: 8 },
    { month: 'Agu 2025', revenue: 14200000000, frequency: 52, volume: 10 },
    { month: 'Sep 2025', revenue: 15800000000, frequency: 58, volume: 11 },
    { month: 'Okt 2025', revenue: 18500000000, frequency: 64, volume: 13 },
    { month: 'Nov 2025', revenue: 19200000000, frequency: 68, volume: 14 },
    { month: 'Des 2025', revenue: 21500000000, frequency: 72, volume: 16 }
  ],
  productDistribution: [
    { product: 'Cash Management', deals: 28, value: 35200000000, percentage: 32 },
    { product: 'Trade Finance', deals: 18, value: 22500000000, percentage: 20 },
    { product: 'Virtual Account', deals: 22, value: 18800000000, percentage: 17 },
    { product: 'Bank Garansi', deals: 12, value: 15600000000, percentage: 14 },
    { product: 'Supply Chain Financing', deals: 10, value: 12200000000, percentage: 11 },
    { product: 'Payroll', deals: 8, value: 4500000000, percentage: 4 },
    { product: 'Collection', deals: 5, value: 2200000000, percentage: 2 }
  ],
  kpiSummary: {
    totalRevenue: 111000000000,
    totalDeals: 103,
    avgDealSize: 1078000000,
    avgCycleTime: 32,
    winRate: 68,
    niiContribution: 8500000000
  }
};

// ========== LEADS COMPOSITION ==========
const LEADS_COMPOSITION = {
  summary: {
    totalReceived: 150,
    inProgress: 89,
    dropped: 35,
    converted: 26
  },
  byMonth: [
    { month: 'Jul', received: 22, inProgress: 12, dropped: 5, converted: 5 },
    { month: 'Agu', received: 25, inProgress: 14, dropped: 6, converted: 5 },
    { month: 'Sep', received: 28, inProgress: 16, dropped: 7, converted: 5 },
    { month: 'Okt', received: 24, inProgress: 15, dropped: 5, converted: 4 },
    { month: 'Nov', received: 26, inProgress: 17, dropped: 6, converted: 3 },
    { month: 'Des', received: 25, inProgress: 15, dropped: 6, converted: 4 }
  ],
  dropReasons: [
    { reason: 'Harga tidak cocok', count: 12, percentage: 34 },
    { reason: 'Pilih kompetitor', count: 8, percentage: 23 },
    { reason: 'Kebutuhan berubah', count: 6, percentage: 17 },
    { reason: 'Tidak potensial', count: 5, percentage: 14 },
    { reason: 'Proses internal', count: 4, percentage: 12 }
  ]
};

// ========== TARIFF CONFIG ==========
const TARIFF_CONFIG = {
  ftpRate: 0.04,
  products: {
    'Payroll': { normalFee: 2500, unit: 'per karyawan/bulan', description: 'Disbursement gaji karyawan' },
    'Cash Management': { normalFee: 5000, unit: 'per transaksi', description: 'Layanan cash pooling dan sweeping' },
    'Virtual Account': { normalFee: 3500, unit: 'per transaksi', description: 'Penerimaan pembayaran via VA' },
    'Trade Finance': { normalFee: 0.1, unit: '% dari nilai LC', description: 'Letter of Credit dan trade services' },
    'Bank Garansi': { normalFee: 0.5, unit: '% per tahun', description: 'Jaminan bank untuk tender/proyek' },
    'Supply Chain Financing': { normalFee: 2, unit: '% per tahun', description: 'Pembiayaan supply chain' },
    'Collection': { normalFee: 2000, unit: 'per transaksi', description: 'Penagihan dan inkaso' }
  }
};

// ========== HELPER FUNCTIONS ==========
function getLeadsByStage(stageId) {
  return LEADS.filter(lead => lead.stage === stageId);
}

function getLeadById(leadId) {
  return LEADS.find(lead => lead.id === leadId);
}

function getMandateById(mandateId) {
  return MANDATES.find(m => m.id === mandateId);
}

function getTariffById(tariffId) {
  return TARIFF_REQUESTS.find(t => t.id === tariffId);
}

function getUpcomingFollowUps(userId, limit = 5) {
  const today = new Date().toISOString().split('T')[0];
  return LEADS
    .filter(l => l.assignee === userId && l.nextFollowUp && l.stage !== 'live')
    .sort((a, b) => a.nextFollowUp.localeCompare(b.nextFollowUp))
    .slice(0, limit);
}

function getAgingColor(days) {
  if (days <= 7) return 'success';
  if (days <= 14) return 'warning';
  return 'danger';
}

// ========== EXPORT ==========
window.MUSE_DATA = {
  PIPELINE_STAGES,
  PRODUCTS,
  SEGMENTS,
  LEADS,
  MANDATES,
  TARIFF_REQUESTS,
  DASHBOARD_STATS,
  LEADERBOARD,
  ANALYTICS_DATA,
  LEADS_COMPOSITION,
  TARIFF_CONFIG,
  IDGenerator,
  getLeadsByStage,
  getLeadById,
  getMandateById,
  getTariffById,
  getUpcomingFollowUps,
  getAgingColor
};
