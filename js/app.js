/* ============================================
   MUSE App Core — Router & State Management
   ============================================ */

// ========== APP STATE ==========
const AppState = {
  currentUser: null,
  currentPage: 'dashboard',
  sidebarOpen: true,
  notifications: [],
  
  // Getters
  get isLoggedIn() {
    return this.currentUser !== null;
  },
  
  get userRole() {
    return this.currentUser?.role || null;
  },
  
  get allowedMenus() {
    if (!this.currentUser) return [];
    return MUSE_CONFIG.getMenusForRole(this.currentUser.role);
  }
};

// ========== AUTHENTICATION ==========
const Auth = {
  login(userId, password) {
    // Demo passwords: 'demo' or '123456'
    if (password !== 'demo' && password !== '123456') {
      return { success: false, error: 'Password salah' };
    }
    
    const user = MUSE_CONFIG.getUserById(userId);
    if (!user) {
      return { success: false, error: 'User tidak ditemukan' };
    }
    
    AppState.currentUser = user;
    localStorage.setItem('muse_user', JSON.stringify(user));
    return { success: true };
  },
  
  logout() {
    AppState.currentUser = null;
    localStorage.removeItem('muse_user');
    Router.navigate('login');
  },
  
  checkSession() {
    const saved = localStorage.getItem('muse_user');
    if (saved) {
      try {
        AppState.currentUser = JSON.parse(saved);
        return true;
      } catch (e) {
        localStorage.removeItem('muse_user');
      }
    }
    return false;
  }
};

// ========== ROUTER ==========
const Router = {
  routes: {},
  
  register(path, handler) {
    this.routes[path] = handler;
  },
  
  navigate(path) {
    window.location.hash = path;
  },
  
  getCurrentPath() {
    return window.location.hash.slice(1) || 'login';
  },
  
  handleRoute() {
    const path = this.getCurrentPath();
    
    // Auth guard
    if (path !== 'login' && !AppState.isLoggedIn) {
      this.navigate('login');
      return;
    }
    
    // Already logged in, redirect from login
    if (path === 'login' && AppState.isLoggedIn) {
      this.navigate('dashboard');
      return;
    }
    
    // Access control
    if (path !== 'login') {
      const menuId = this.pathToMenuId(path);
      if (menuId && !MUSE_CONFIG.hasAccess(AppState.userRole, menuId)) {
        this.navigate('access-denied');
        return;
      }
    }
    
    AppState.currentPage = path;
    this.render(path);
  },
  
  pathToMenuId(path) {
    const menuEntry = Object.entries(MUSE_CONFIG.MENUS).find(([id, menu]) => menu.path === path);
    return menuEntry ? menuEntry[0] : null;
  },
  
  render(path) {
    const handler = this.routes[path];
    if (handler) {
      handler();
    } else if (this.routes['404']) {
      this.routes['404']();
    }
  },
  
  init() {
    // Listen for hash changes
    window.addEventListener('hashchange', () => this.handleRoute());
    
    // Check existing session
    Auth.checkSession();
    
    // Force navigate to login if no hash and not logged in
    if (!window.location.hash && !AppState.isLoggedIn) {
      window.location.hash = 'login';
    }
    
    // Initial route
    this.handleRoute();
  }
};

// ========== UI HELPERS ==========
const UI = {
  // Get container
  getApp() {
    return document.getElementById('app');
  },
  
  // Render HTML to app
  render(html) {
    this.getApp().innerHTML = html;
  },
  
  // Show toast notification
  toast(message, type = 'info') {
    const container = document.getElementById('toast-container') || this.createToastContainer();
    const toast = document.createElement('div');
    toast.className = `toast toast-${type} animate-slide-in-right`;
    toast.innerHTML = `
      <span class="toast-icon">${this.getToastIcon(type)}</span>
      <span class="toast-message">${message}</span>
    `;
    container.appendChild(toast);
    
    setTimeout(() => {
      toast.style.opacity = '0';
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  },
  
  createToastContainer() {
    const container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'toast-container';
    document.body.appendChild(container);
    return container;
  },
  
  getToastIcon(type) {
    const icons = {
      success: '✓',
      error: '✕',
      warning: '⚠',
      info: 'ℹ'
    };
    return icons[type] || icons.info;
  },
  
  // Format helpers
  formatCurrency: MUSE_DATA.formatCurrency,
  formatDate: MUSE_DATA.formatDate,
  getInitials: MUSE_CONFIG.getInitials
};

// ========== COMPONENT BUILDERS ==========
const Components = {
  
  // Sidebar component
  sidebar() {
    const user = AppState.currentUser;
    const roleInfo = MUSE_CONFIG.ROLE_INFO[user.role];
    const menus = AppState.allowedMenus;
    
    // Group menus by section
    const mainMenus = menus.filter(m => !m.section);
    const groupedMenus = {};
    menus.filter(m => m.section).forEach(m => {
      if (!groupedMenus[m.section]) groupedMenus[m.section] = [];
      groupedMenus[m.section].push(m);
    });
    
    return `
      <aside class="sidebar" id="sidebar">
        <div class="sidebar-header">
          <div class="sidebar-logo">M</div>
          <div class="sidebar-brand">
            <h1>MUSE</h1>
            <p>Sales Ecosystem</p>
          </div>
        </div>
        
        <nav class="sidebar-nav">
          <div class="nav-section">
            <div class="nav-section-title">Main Menu</div>
            ${mainMenus.map(menu => this.navItem(menu)).join('')}
          </div>
          
          ${Object.entries(groupedMenus).map(([section, items]) => `
            <div class="nav-section">
              <div class="nav-section-title">${section}</div>
              ${items.map(menu => this.navItem(menu)).join('')}
            </div>
          `).join('')}
        </nav>
        
        <div class="sidebar-user">
          <div class="sidebar-user-info">
            <div class="sidebar-user-avatar">${UI.getInitials(user.name)}</div>
            <div class="sidebar-user-details">
              <div class="sidebar-user-name">${user.name}</div>
              <div class="sidebar-user-role">${roleInfo.shortLabel}</div>
            </div>
          </div>
          <button class="logout-btn" onclick="Auth.logout()">
            <span>⎋</span> Logout
          </button>
        </div>
      </aside>
    `;
  },
  
  navItem(menu) {
    const isActive = AppState.currentPage === menu.path;
    const badge = menu.id === 'onboardingQueue' ? '<span class="nav-badge">3</span>' : '';
    
    return `
      <a href="#${menu.path}" class="nav-item ${isActive ? 'active' : ''}">
        <span class="nav-icon material-icon">${this.getIcon(menu.icon)}</span>
        <span class="nav-label">${menu.label}</span>
        ${badge}
      </a>
    `;
  },
  
  // Header component
  header(title) {
    const notifications = MUSE_DATA.NOTIFICATIONS || [];
    const unreadCount = notifications.filter(n => !n.read).length || 5;
    
    return `
      <header class="header">
        <div class="header-left">
          <button class="btn btn-icon btn-ghost" onclick="toggleSidebar()" id="menu-toggle">
            ☰
          </button>
          <h1 class="header-title">${title}</h1>
        </div>
        <div class="header-right">
          <div class="header-search">
            <span class="header-search-icon">🔍</span>
            <input type="text" placeholder="Search leads, companies..." />
          </div>
          <div class="header-notifications">
            <button class="notification-bell" onclick="toggleNotifications()" title="Notifikasi">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
              </svg>
              ${unreadCount > 0 ? `<span class="notification-badge">${unreadCount}</span>` : ''}
            </button>
            <div class="notification-dropdown" id="notification-dropdown">
              <div class="notification-header">
                <span class="notification-title">Notifikasi</span>
                <button class="notification-mark-all" onclick="markAllRead()">Tandai dibaca</button>
              </div>
              <div class="notification-list">
                ${this.renderNotifications()}
              </div>
            </div>
          </div>
          <div class="header-user" onclick="toggleUserMenu()">
            <span class="header-user-avatar">${UI.getInitials(AppState.currentUser?.name || '?')}</span>
          </div>
        </div>
      </header>
    `;
  },
  
  renderNotifications() {
    const notifications = [
      { id: 1, text: 'Lead baru di-assign: PT Telkom Indonesia', time: '5 menit lalu', unread: true },
      { id: 2, text: 'Tarif khusus Anda disetujui', time: '1 jam lalu', unread: true },
      { id: 3, text: 'Mandate implementasi selesai: PT Astra', time: '2 jam lalu', unread: true },
      { id: 4, text: 'Reminder: Follow-up PT PLN besok', time: '3 jam lalu', unread: false },
      { id: 5, text: 'Weekly report sudah tersedia', time: '1 hari lalu', unread: false }
    ];
    
    return notifications.map(n => `
      <div class="notification-item ${n.unread ? 'unread' : ''}">
        <div class="notification-dot"></div>
        <div class="notification-content">
          <p class="notification-text">${n.text}</p>
          <span class="notification-time">${n.time}</span>
        </div>
      </div>
    `).join('');
  },
  
  // App shell
  appShell(title, content) {
    return `
      <div class="app-container">
        ${this.sidebar()}
        <main class="main-content">
          ${this.header(title)}
          <div class="page-content animate-fade-in">
            ${content}
          </div>
        </main>
      </div>
    `;
  },
  
  // Lead card for pipeline
  leadCard(lead) {
    const user = MUSE_CONFIG.getUserById(lead.assignee);
    const agingClass = MUSE_DATA.getAgingColor(lead.daysInStage);
    
    return `
      <div class="lead-card card-hover" onclick="showLeadDetail('${lead.id}')">
        <div class="lead-card-header">
          <span class="badge badge-${lead.priority === 'high' ? 'danger' : lead.priority === 'medium' ? 'warning' : 'gray'}">
            ${lead.priority}
          </span>
          <span class="lead-card-days badge-${agingClass}">${lead.daysInStage}d</span>
        </div>
        <h4 class="lead-card-company">${lead.company}</h4>
        <p class="lead-card-product text-sm text-muted">${lead.product}</p>
        <div class="lead-card-value">${UI.formatCurrency(lead.value)}</div>
        <div class="lead-card-footer">
          <div class="lead-card-assignee">
            <span class="avatar avatar-sm">${user ? UI.getInitials(user.name) : '?'}</span>
            <span class="text-xs text-muted">${user?.name.split(' ')[0] || 'Unassigned'}</span>
          </div>
        </div>
      </div>
    `;
  },
  
  // KPI Card
  kpiCard(title, value, subtitle, trend, icon) {
    const trendClass = trend > 0 ? 'success' : trend < 0 ? 'danger' : '';
    const trendIcon = trend > 0 ? '↑' : trend < 0 ? '↓' : '';
    
    return `
      <div class="card kpi-card">
        <div class="kpi-icon">${icon}</div>
        <div class="kpi-content">
          <p class="kpi-title text-sm text-muted">${title}</p>
          <h3 class="kpi-value">${value}</h3>
          <p class="kpi-subtitle text-xs">
            ${subtitle}
            ${trend ? `<span class="text-${trendClass}">${trendIcon} ${Math.abs(trend)}%</span>` : ''}
          </p>
        </div>
      </div>
    `;
  },
  
  // Simple icon mapping (using emoji for simplicity)
  getIcon(name) {
    const icons = {
      dashboard: '📊',
      view_kanban: '📋',
      group: '👥',
      emoji_events: '🏆',
      analytics: '📈',
      assignment_ind: '👤',
      request_quote: '📝',
      assessment: '📊',
      how_to_reg: '✅',
      monitor_heart: '💓',
      track_changes: '🎯',
      checklist: '☑️',
      assignment_turned_in: '📑',
      engineering: '⚙️',
      cloud_upload: '☁️'
    };
    return icons[name] || '📄';
  }
};

// ========== GLOBAL FUNCTIONS ==========
function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  sidebar.classList.toggle('open');
}

function toggleNotifications() {
  const dropdown = document.getElementById('notification-dropdown');
  if (dropdown) {
    dropdown.classList.toggle('show');
  }
}

function markAllRead() {
  UI.toast('Semua notifikasi ditandai sudah dibaca', 'success');
  const badge = document.querySelector('.notification-badge');
  if (badge) badge.style.display = 'none';
  document.querySelectorAll('.notification-item.unread').forEach(item => {
    item.classList.remove('unread');
  });
}

function toggleUserMenu() {
  UI.toast('User menu coming soon', 'info');
}

function showLeadDetail(leadId) {
  UI.toast(`Lead detail: ${leadId}`, 'info');
}

// Initialize will be called from index.html after all scripts loaded

// ========== EXPORT TO WINDOW ==========
window.AppState = AppState;
window.Auth = Auth;
window.Router = Router;
window.UI = UI;
window.Components = Components;
