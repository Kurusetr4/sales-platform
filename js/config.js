/* ============================================
   MUSE Configuration — RBAC & Users
   ============================================ */

// ========== ROLE DEFINITIONS ==========
const ROLES = {
  GROUP_HEAD: 'group_head',           // SVP - Observer + Approval Tarif >50%
  SALES_HEAD: 'sales_head',           // VP - Assign Leads, Approval Tarif ≤50%
  SALES_OFFICER: 'sales_officer',     // Staff - Frontline Sales
  PORTFOLIO_HEAD: 'portfolio_head',   // VP - Review Tarif Layer 2
  PORTFOLIO_OFFICER: 'portfolio_officer', // Staff - Analisa Tarif Layer 1
  TL_IMPLEMENTOR: 'tl_implementor',   // Manager - Assign Mandate
  IMPLEMENTOR: 'implementor',         // Staff - Eksekusi + Sales Side Job
  ONBOARDING_CLERK: 'onboarding_clerk' // Pelaksana - Cek Dokumen
};

// ========== ROLE METADATA ==========
const ROLE_INFO = {
  [ROLES.GROUP_HEAD]: {
    label: 'Group Head (SVP)',
    shortLabel: 'GH TBW',
    group: 'Executive',
    icon: '👑',
    color: '#daa520',
    description: 'Observer mode + Final approval tarif >50%'
  },
  [ROLES.SALES_HEAD]: {
    label: 'Sales Head (VP)',
    shortLabel: 'Sales VP',
    group: 'Sales',
    icon: '📊',
    color: '#003d79',
    description: 'Assign leads ke tim, approval tarif ≤50%'
  },
  [ROLES.SALES_OFFICER]: {
    label: 'Sales Officer',
    shortLabel: 'Sales',
    group: 'Sales',
    icon: '💼',
    color: '#0066cc',
    description: 'Frontline sales, manage pipeline'
  },
  [ROLES.PORTFOLIO_HEAD]: {
    label: 'Portfolio Head (VP)',
    shortLabel: 'Portfolio VP',
    group: 'Portfolio',
    icon: '📈',
    color: '#10b981',
    description: 'Review tarif layer 2, monitoring'
  },
  [ROLES.PORTFOLIO_OFFICER]: {
    label: 'Portfolio Officer',
    shortLabel: 'Portfolio',
    group: 'Portfolio',
    icon: '📋',
    color: '#34d399',
    description: 'Analisa tarif layer 1, upload leads'
  },
  [ROLES.TL_IMPLEMENTOR]: {
    label: 'Team Leader Implementor',
    shortLabel: 'TL Impl',
    group: 'Implementation',
    icon: '🎯',
    color: '#f59e0b',
    description: 'Assign mandate ke implementor'
  },
  [ROLES.IMPLEMENTOR]: {
    label: 'Implementor',
    shortLabel: 'Impl',
    group: 'Implementation',
    icon: '🔧',
    color: '#fbbf24',
    description: 'Eksekusi implementasi + side job sales'
  },
  [ROLES.ONBOARDING_CLERK]: {
    label: 'Pelaksana Onboarding',
    shortLabel: 'Onboarding',
    group: 'Onboarding',
    icon: '📝',
    color: '#8b5cf6',
    description: 'Cek kelengkapan dokumen mandate'
  }
};

// ========== MENU DEFINITIONS ==========
const MENUS = {
  dashboard: { 
    id: 'dashboard', 
    label: 'Dashboard', 
    icon: 'dashboard',
    path: 'dashboard'
  },
  pipeline: { 
    id: 'pipeline', 
    label: 'Pipeline', 
    icon: 'view_kanban',
    path: 'pipeline'
  },
  leaderboard: { 
    id: 'leaderboard', 
    label: 'Leaderboard', 
    icon: 'emoji_events',
    path: 'leaderboard'
  },
  analytics: { 
    id: 'analytics', 
    label: 'Analytics', 
    icon: 'analytics',
    path: 'analytics'
  },
  leadAssignment: { 
    id: 'leadAssignment', 
    label: 'Lead Assignment', 
    icon: 'assignment_ind',
    path: 'lead-assignment',
    section: 'Management'
  },
  tariffRequest: { 
    id: 'tariffRequest', 
    label: 'Pengajuan Tarif', 
    icon: 'request_quote',
    path: 'tariff-request',
    section: 'Tariff'
  },
  tariffAnalysis: { 
    id: 'tariffAnalysis', 
    label: 'Analisa Tarif', 
    icon: 'assessment',
    path: 'tariff-analysis',
    section: 'Tariff'
  },
  tariffApproval: { 
    id: 'tariffApproval', 
    label: 'Approval Tarif', 
    icon: 'how_to_reg',
    path: 'tariff-approval',
    section: 'Tariff'
  },
  tariffMonitor: { 
    id: 'tariffMonitor', 
    label: 'Monitor Tarif', 
    icon: 'monitor_heart',
    path: 'tariff-monitor',
    section: 'Tariff'
  },
  mandateTracking: { 
    id: 'mandateTracking', 
    label: 'Mandate Tracking', 
    icon: 'track_changes',
    path: 'mandate-tracking',
    section: 'Operations'
  },
  onboardingQueue: { 
    id: 'onboardingQueue', 
    label: 'Onboarding Queue', 
    icon: 'checklist',
    path: 'onboarding-queue',
    section: 'Operations'
  },
  assignMandate: { 
    id: 'assignMandate', 
    label: 'Assign Mandate', 
    icon: 'assignment_turned_in',
    path: 'assign-mandate',
    section: 'Operations'
  },
  implementationQueue: { 
    id: 'implementationQueue', 
    label: 'Implementation Queue', 
    icon: 'engineering',
    path: 'implementation-queue',
    section: 'Operations'
  },
  uploadLeads: { 
    id: 'uploadLeads', 
    label: 'Upload Leads', 
    icon: 'cloud_upload',
    path: 'upload-leads',
    section: 'Data'
  }
};

// ========== ACCESS MATRIX ==========
const ACCESS_MATRIX = {
  [ROLES.GROUP_HEAD]: [
    'dashboard', 'pipeline', 'leaderboard', 'analytics', 'tariffApproval', 'tariffMonitor'
  ],
  [ROLES.SALES_HEAD]: [
    'dashboard', 'pipeline', 'leaderboard', 'analytics',
    'leadAssignment', 'tariffApproval', 'tariffMonitor', 'mandateTracking'
  ],
  [ROLES.SALES_OFFICER]: [
    'dashboard', 'pipeline', 'leaderboard', 'analytics',
    'tariffRequest', 'mandateTracking'
  ],
  [ROLES.PORTFOLIO_HEAD]: [
    'dashboard', 'pipeline', 'analytics',
    'tariffAnalysis', 'tariffMonitor', 'uploadLeads'
  ],
  [ROLES.PORTFOLIO_OFFICER]: [
    'dashboard', 'pipeline', 'analytics',
    'tariffAnalysis', 'uploadLeads'
  ],
  [ROLES.TL_IMPLEMENTOR]: [
    'dashboard', 'pipeline', 'analytics',
    'assignMandate', 'implementationQueue'
  ],
  [ROLES.IMPLEMENTOR]: [
    'dashboard', 'pipeline', 'leaderboard', 'analytics',
    'tariffRequest', 'mandateTracking', 'implementationQueue'
  ],
  [ROLES.ONBOARDING_CLERK]: [
    'dashboard', 'pipeline', 'analytics', 'onboardingQueue'
  ]
};

// ========== USER DATABASE ==========
const USERS = [
  // ===== EXECUTIVE =====
  {
    id: 'gh-1',
    name: 'Fauziah Anna',
    role: ROLES.GROUP_HEAD,
    department: 'Transaction Banking Wholesale',
    title: 'Group Head',
    level: 'SVP'
  },
  
  // ===== SALES LINE =====
  // Sales Head 1 + Team
  {
    id: 'sh-1',
    name: 'Ashadi Septiaji',
    role: ROLES.SALES_HEAD,
    department: 'Corporate Sales 1',
    title: 'Department Head',
    level: 'VP'
  },
  {
    id: 'so-1',
    name: 'Rizcky Chandrasanjaya',
    role: ROLES.SALES_OFFICER,
    department: 'Corporate Sales 1',
    title: 'Sales Officer',
    headId: 'sh-1'
  },
  {
    id: 'so-2',
    name: 'Asih Rachmayanti',
    role: ROLES.SALES_OFFICER,
    department: 'Corporate Sales 1',
    title: 'Sales Officer',
    headId: 'sh-1'
  },
  {
    id: 'so-3',
    name: 'Miranti Primadhani',
    role: ROLES.SALES_OFFICER,
    department: 'Corporate Sales 1',
    title: 'Sales Officer',
    headId: 'sh-1'
  },
  {
    id: 'so-4',
    name: 'Jimmy Opuntia',
    role: ROLES.SALES_OFFICER,
    department: 'Corporate Sales 1',
    title: 'Sales Officer',
    headId: 'sh-1'
  },
  {
    id: 'so-5',
    name: 'Irlanda Joanartha',
    role: ROLES.SALES_OFFICER,
    department: 'Corporate Sales 1',
    title: 'Sales Officer',
    headId: 'sh-1'
  },
  
  // Sales Head 2 + Team
  {
    id: 'sh-2',
    name: 'Febriano YY Kolanus',
    role: ROLES.SALES_HEAD,
    department: 'Commercial Sales',
    title: 'Department Head',
    level: 'VP'
  },
  {
    id: 'so-6',
    name: 'Ning Sasmita',
    role: ROLES.SALES_OFFICER,
    department: 'Commercial Sales',
    title: 'Sales Officer',
    headId: 'sh-2'
  },
  {
    id: 'so-7',
    name: 'Nico Panjaitan',
    role: ROLES.SALES_OFFICER,
    department: 'Commercial Sales',
    title: 'Sales Officer',
    headId: 'sh-2'
  },
  {
    id: 'so-8',
    name: 'Kevin Adriel',
    role: ROLES.SALES_OFFICER,
    department: 'Commercial Sales',
    title: 'Sales Officer',
    headId: 'sh-2'
  },
  {
    id: 'so-9',
    name: 'Fitriyah',
    role: ROLES.SALES_OFFICER,
    department: 'Commercial Sales',
    title: 'Sales Officer',
    headId: 'sh-2'
  },
  {
    id: 'so-10',
    name: 'Andika Prasetyo',
    role: ROLES.SALES_OFFICER,
    department: 'Commercial Sales',
    title: 'Sales Officer',
    headId: 'sh-2'
  },
  {
    id: 'so-11',
    name: 'Fakhri Zikra',
    role: ROLES.SALES_OFFICER,
    department: 'Commercial Sales',
    title: 'Sales Officer',
    headId: 'sh-2'
  },
  {
    id: 'so-12',
    name: 'Lily Maridha',
    role: ROLES.SALES_OFFICER,
    department: 'Commercial Sales',
    title: 'Sales Officer',
    headId: 'sh-2'
  },
  
  // Sales Head 3 + Team
  {
    id: 'sh-3',
    name: 'R Yuniarti Siddik',
    role: ROLES.SALES_HEAD,
    department: 'Kelembagaan & FI Sales',
    title: 'Department Head',
    level: 'VP'
  },
  {
    id: 'so-13',
    name: 'Ronald Hutapea',
    role: ROLES.SALES_OFFICER,
    department: 'Kelembagaan & FI Sales',
    title: 'Sales Officer',
    headId: 'sh-3'
  },
  {
    id: 'so-14',
    name: 'Omar Sazaki',
    role: ROLES.SALES_OFFICER,
    department: 'Kelembagaan & FI Sales',
    title: 'Sales Officer',
    headId: 'sh-3'
  },
  {
    id: 'so-15',
    name: 'Dwi Eka Putra',
    role: ROLES.SALES_OFFICER,
    department: 'Kelembagaan & FI Sales',
    title: 'Sales Officer',
    headId: 'sh-3'
  },
  {
    id: 'so-16',
    name: 'Ardhian Anggita',
    role: ROLES.SALES_OFFICER,
    department: 'Kelembagaan & FI Sales',
    title: 'Sales Officer',
    headId: 'sh-3'
  },
  {
    id: 'so-17',
    name: 'Alia Hartati',
    role: ROLES.SALES_OFFICER,
    department: 'Kelembagaan & FI Sales',
    title: 'Sales Officer',
    headId: 'sh-3'
  },
  {
    id: 'so-18',
    name: 'Bambang Tripunanto',
    role: ROLES.SALES_OFFICER,
    department: 'Kelembagaan & FI Sales',
    title: 'Sales Officer',
    headId: 'sh-3'
  },
  {
    id: 'so-19',
    name: 'Yohana',
    role: ROLES.SALES_OFFICER,
    department: 'Kelembagaan & FI Sales',
    title: 'Sales Officer',
    headId: 'sh-3'
  },
  
  // ===== PORTFOLIO LINE =====
  // Portfolio Head 1 + Team
  {
    id: 'ph-1',
    name: 'Alfa Masjita',
    role: ROLES.PORTFOLIO_HEAD,
    department: 'Product & Portfolio Corporate',
    title: 'Department Head',
    level: 'VP'
  },
  {
    id: 'po-1',
    name: 'Edwin Patriasani',
    role: ROLES.PORTFOLIO_OFFICER,
    department: 'Product & Portfolio Corporate',
    title: 'Portfolio Officer',
    headId: 'ph-1'
  },
  {
    id: 'po-2',
    name: 'Bella Ahyu Winanti',
    role: ROLES.PORTFOLIO_OFFICER,
    department: 'Product & Portfolio Corporate',
    title: 'Portfolio Officer',
    headId: 'ph-1'
  },
  
  // Portfolio Head 2 + Team
  {
    id: 'ph-2',
    name: 'Sholeh Syuhada',
    role: ROLES.PORTFOLIO_HEAD,
    department: 'Product & Portfolio Commercial',
    title: 'Department Head',
    level: 'VP'
  },
  {
    id: 'po-3',
    name: 'Dicky Yendra',
    role: ROLES.PORTFOLIO_OFFICER,
    department: 'Product & Portfolio Commercial',
    title: 'Portfolio Officer',
    headId: 'ph-2'
  },
  {
    id: 'po-4',
    name: 'Dwi Anita',
    role: ROLES.PORTFOLIO_OFFICER,
    department: 'Product & Portfolio Commercial',
    title: 'Portfolio Officer',
    headId: 'ph-2'
  },
  {
    id: 'po-5',
    name: 'Bianca Marella',
    role: ROLES.PORTFOLIO_OFFICER,
    department: 'Product & Portfolio Commercial',
    title: 'Portfolio Officer',
    headId: 'ph-2'
  },
  
  // Portfolio Head 3 + Team
  {
    id: 'ph-3',
    name: 'Ario Muhammad',
    role: ROLES.PORTFOLIO_HEAD,
    department: 'Product & Portfolio SME',
    title: 'Department Head',
    level: 'VP'
  },
  {
    id: 'po-6',
    name: 'Seth Sembiring',
    role: ROLES.PORTFOLIO_OFFICER,
    department: 'Product & Portfolio SME',
    title: 'Portfolio Officer',
    headId: 'ph-3'
  },
  {
    id: 'po-7',
    name: 'Muthoidah Sabrina',
    role: ROLES.PORTFOLIO_OFFICER,
    department: 'Product & Portfolio SME',
    title: 'Portfolio Officer',
    headId: 'ph-3'
  },
  {
    id: 'po-8',
    name: 'Dion Alexander',
    role: ROLES.PORTFOLIO_OFFICER,
    department: 'Product & Portfolio SME',
    title: 'Portfolio Officer',
    headId: 'ph-3'
  },
  {
    id: 'po-9',
    name: 'Rezananda Salsabila',
    role: ROLES.PORTFOLIO_OFFICER,
    department: 'Product & Portfolio SME',
    title: 'Portfolio Officer',
    headId: 'ph-3'
  },
  
  // ===== IMPLEMENTATION LINE =====
  // TL Implementors
  {
    id: 'tl-1',
    name: 'Dedi Kurniawan',
    role: ROLES.TL_IMPLEMENTOR,
    department: 'Implementation Corporate',
    title: 'Team Leader'
  },
  {
    id: 'tl-2',
    name: 'Arief Harmano',
    role: ROLES.TL_IMPLEMENTOR,
    department: 'Implementation Commercial',
    title: 'Team Leader'
  },
  {
    id: 'tl-3',
    name: 'Ferry Hadi Irawan',
    role: ROLES.TL_IMPLEMENTOR,
    department: 'Implementation Regional',
    title: 'Team Leader'
  },
  
  // Implementors
  {
    id: 'im-1',
    name: 'Dhandi Rizky',
    role: ROLES.IMPLEMENTOR,
    department: 'Implementation Corporate',
    title: 'Implementor',
    headId: 'tl-1'
  },
  {
    id: 'im-2',
    name: 'Ghani Casyidi',
    role: ROLES.IMPLEMENTOR,
    department: 'Implementation Corporate',
    title: 'Implementor',
    headId: 'tl-1'
  },
  {
    id: 'im-3',
    name: 'Indah Sulistyorini',
    role: ROLES.IMPLEMENTOR,
    department: 'Implementation Commercial',
    title: 'Implementor',
    headId: 'tl-2'
  },
  {
    id: 'im-4',
    name: 'Gery Setiaji',
    role: ROLES.IMPLEMENTOR,
    department: 'Implementation Commercial',
    title: 'Implementor',
    headId: 'tl-2'
  },
  {
    id: 'im-5',
    name: 'Riza Ariawan',
    role: ROLES.IMPLEMENTOR,
    department: 'Implementation Regional',
    title: 'Implementor',
    headId: 'tl-3'
  },
  
  // ===== ONBOARDING =====
  {
    id: 'ob-1',
    name: 'Pratiwi Herdyaningsih',
    role: ROLES.ONBOARDING_CLERK,
    department: 'Onboarding',
    title: 'Pelaksana'
  }
];

// ========== HELPER FUNCTIONS ==========

function getUsersByRole(role) {
  return USERS.filter(u => u.role === role);
}

function getUserById(id) {
  return USERS.find(u => u.id === id);
}

function getMenusForRole(role) {
  const allowedMenuIds = ACCESS_MATRIX[role] || [];
  return allowedMenuIds.map(id => MENUS[id]).filter(Boolean);
}

function hasAccess(role, menuId) {
  const allowedMenuIds = ACCESS_MATRIX[role] || [];
  return allowedMenuIds.includes(menuId);
}

function getRoleGroups() {
  const groups = {};
  Object.entries(ROLE_INFO).forEach(([roleKey, info]) => {
    if (!groups[info.group]) {
      groups[info.group] = [];
    }
    groups[info.group].push({
      role: roleKey,
      ...info,
      users: getUsersByRole(roleKey)
    });
  });
  return groups;
}

function getInitials(name) {
  return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
}

// Export for use
window.MUSE_CONFIG = {
  ROLES,
  ROLE_INFO,
  MENUS,
  ACCESS_MATRIX,
  USERS,
  getUsersByRole,
  getUserById,
  getMenusForRole,
  hasAccess,
  getRoleGroups,
  getInitials
};
