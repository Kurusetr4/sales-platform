/* ============================================
   MUSE Pages — Dashboard
   ============================================ */

function renderDashboard() {
  const stats = MUSE_DATA.DASHBOARD_STATS;
  const user = AppState.currentUser;
  const roleInfo = MUSE_CONFIG.ROLE_INFO[user.role];
  
  // Get upcoming follow-ups for this user
  const upcomingFollowUps = MUSE_DATA.getUpcomingFollowUps(user.id, 5);
  
  const content = `
    <div class="page-header">
      <div>
        <h1 class="page-title">Selamat datang, ${user.name.split(' ')[0]}!</h1>
        <p class="page-subtitle">${roleInfo.label} • ${user.department}</p>
      </div>
      <div class="page-actions">
        <button class="btn btn-secondary">
          📥 Export Report
        </button>
      </div>
    </div>
    
    <!-- UPCOMING FOLLOW-UPS (First Impression) -->
    ${renderUpcomingFollowUps(upcomingFollowUps)}
    
    <!-- KPI Cards -->
    <div class="dashboard-kpis">
      ${Components.kpiCard(
        'Total Pipeline',
        UI.formatCurrency(stats.totalPipeline),
        'vs last month',
        '+12%',
        '💰'
      )}
      ${Components.kpiCard(
        'Active Leads',
        stats.activeLeads,
        'in pipeline',
        '+3',
        '📋'
      )}
      ${Components.kpiCard(
        'Won This Month',
        stats.wonThisMonth,
        'deals closed',
        '+2',
        '🎉'
      )}
      ${Components.kpiCard(
        'Conversion Rate',
        stats.conversionRate + '%',
        'opportunity to won',
        '+5%',
        '📈'
      )}
    </div>
    
    <!-- Charts Row -->
    <div class="dashboard-charts">
      <div class="card">
        <div class="card-header">
          <h3 class="text-lg font-semibold">Pipeline by Stage</h3>
        </div>
        <div class="card-body">
          ${renderPipelineChart(stats.pipelineByStage)}
        </div>
      </div>
      
      <div class="card">
        <div class="card-header">
          <h3 class="text-lg font-semibold">Recent Activity</h3>
        </div>
        <div class="card-body">
          ${renderRecentActivity()}
        </div>
      </div>
    </div>
    
    <!-- Quick Actions -->
    ${renderQuickActions()}
  `;
  
  UI.render(Components.appShell('Dashboard', content));
}

// ========== UPCOMING FOLLOW-UPS ==========
function renderUpcomingFollowUps(followUps) {
  if (!followUps || followUps.length === 0) {
    return `
      <div class="upcoming-followups-card card mb-4">
        <div class="card-body">
          <div class="empty-state">
            <span class="empty-icon">✅</span>
            <p class="empty-text">Tidak ada follow-up yang tertunda. Great job!</p>
          </div>
        </div>
      </div>
    `;
  }
  
  const today = new Date().toISOString().split('T')[0];
  
  return `
    <div class="upcoming-followups-card card mb-4">
      <div class="card-header">
        <div class="flex items-center gap-2">
          <span class="text-xl">📅</span>
          <h3 class="font-semibold">Upcoming Follow-ups</h3>
          <span class="badge badge-primary">${followUps.length}</span>
        </div>
        <a href="#pipeline" class="btn btn-sm btn-ghost">Lihat Semua →</a>
      </div>
      <div class="card-body p-0">
        <div class="followup-list">
          ${followUps.map(lead => {
            const isOverdue = lead.nextFollowUp < today;
            const isToday = lead.nextFollowUp === today;
            const stage = MUSE_DATA.PIPELINE_STAGES.find(s => s.id === lead.stage);
            
            return `
              <div class="followup-item ${isOverdue ? 'overdue' : ''} ${isToday ? 'today' : ''}">
                <div class="followup-date">
                  <span class="followup-date-label">${isOverdue ? 'OVERDUE' : isToday ? 'TODAY' : formatFollowUpDate(lead.nextFollowUp)}</span>
                  ${isOverdue ? '<span class="followup-days-ago">' + getDaysAgo(lead.nextFollowUp) + '</span>' : ''}
                </div>
                <div class="followup-content">
                  <div class="followup-company">
                    <span class="font-medium">${lead.company}</span>
                    <span class="badge badge-sm" style="background: ${stage?.color}20; color: ${stage?.color}">${stage?.name}</span>
                  </div>
                  <div class="followup-action text-sm text-muted">
                    ${lead.followUpAction || 'Follow up required'}
                  </div>
                  <div class="followup-meta text-xs text-muted">
                    <span>${lead.product}</span>
                    <span>•</span>
                    <span>${UI.formatCurrency(lead.value)}</span>
                    <span>•</span>
                    <span>ID: ${lead.id}</span>
                  </div>
                </div>
                <div class="followup-actions">
                  <button class="btn btn-sm btn-primary" onclick="Router.navigate('pipeline'); setTimeout(() => openLeadModal('${lead.id}'), 100)">
                    Action
                  </button>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    </div>
  `;
}

function formatFollowUpDate(dateStr) {
  const date = new Date(dateStr);
  const options = { weekday: 'short', day: 'numeric', month: 'short' };
  return date.toLocaleDateString('id-ID', options);
}

function getDaysAgo(dateStr) {
  const date = new Date(dateStr);
  const today = new Date();
  const diff = Math.floor((today - date) / (1000 * 60 * 60 * 24));
  return `${diff} hari lalu`;
}

// ========== PIPELINE CHART ==========
function renderPipelineChart(data) {
  // Convert object to array if needed
  const stages = MUSE_DATA.PIPELINE_STAGES;
  const chartData = stages.map(stage => ({
    stage: stage.name,
    count: data[stage.id]?.count || 0,
    value: data[stage.id]?.value || 0,
    color: stage.color
  }));
  
  const maxValue = Math.max(...chartData.map(d => d.value));
  
  return `
    <div class="pipeline-chart">
      ${chartData.map(item => `
        <div class="pipeline-bar-group">
          <div class="pipeline-bar-label">
            <span class="font-medium">${item.stage}</span>
            <span class="text-sm text-muted">${item.count} leads</span>
          </div>
          <div class="pipeline-bar-wrapper">
            <div class="pipeline-bar" 
                 style="width: ${maxValue > 0 ? (item.value / maxValue * 100) : 0}%; background: ${item.color};">
            </div>
            <span class="pipeline-bar-value">${UI.formatCurrency(item.value)}</span>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

// ========== RECENT ACTIVITY ==========
function renderRecentActivity() {
  // Generate mock activities from leads
  const activities = generateRecentActivities();
  
  return `
    <div class="activity-list">
      ${activities.slice(0, 5).map(act => {
        const user = MUSE_CONFIG.getUserById(act.user);
        return `
          <div class="activity-item">
            <div class="activity-icon ${act.type}">
              ${getActivityIcon(act.type)}
            </div>
            <div class="activity-content">
              <p class="activity-text">
                <strong>${user?.name.split(' ')[0] || 'Unknown'}</strong> ${act.action}
              </p>
              <p class="activity-time text-xs text-muted">${act.time}</p>
            </div>
          </div>
        `;
      }).join('')}
    </div>
  `;
}

function generateRecentActivities() {
  return [
    { user: 'so-1', type: 'status_change', action: 'moved PT Tokopedia to Won Deal', time: '2 hours ago' },
    { user: 'so-2', type: 'meeting', action: 'completed meeting with PT PLN', time: '4 hours ago' },
    { user: 'so-3', type: 'call_report', action: 'submitted call report for PT Adaro', time: '5 hours ago' },
    { user: 'so-1', type: 'document', action: 'uploaded PKS for PT Astra International', time: 'Yesterday' },
    { user: 'so-4', type: 'assignment', action: 'was assigned PT Bukalapak', time: 'Yesterday' }
  ];
}

// ========== QUICK ACTIONS ==========
function renderQuickActions() {
  const user = AppState.currentUser;
  const actions = getQuickActionsForRole(user.role);
  
  if (actions.length === 0) return '';
  
  return `
    <div class="dashboard-quick-actions">
      <h3 class="text-lg font-semibold mb-4">Quick Actions</h3>
      <div class="quick-actions-grid">
        ${actions.map(action => `
          <a href="#${action.path}" class="quick-action-card card card-hover">
            <div class="quick-action-icon" style="background: ${action.color}20; color: ${action.color}">
              ${action.icon}
            </div>
            <div class="quick-action-info">
              <h4 class="font-medium">${action.title}</h4>
              <p class="text-sm text-muted">${action.description}</p>
            </div>
          </a>
        `).join('')}
      </div>
    </div>
  `;
}

function getQuickActionsForRole(role) {
  const { ROLES } = MUSE_CONFIG;
  
  const allActions = {
    pipeline: { 
      title: 'Pipeline Board', 
      description: 'Manage your leads', 
      icon: '📋', 
      color: '#6366f1',
      path: 'pipeline',
      roles: [ROLES.SALES_HEAD, ROLES.SALES_OFFICER, ROLES.IMPLEMENTOR]
    },
    leaderboard: { 
      title: 'Leaderboard', 
      description: 'Check your ranking', 
      icon: '🏆', 
      color: '#f59e0b',
      path: 'leaderboard',
      roles: [ROLES.SALES_HEAD, ROLES.SALES_OFFICER, ROLES.IMPLEMENTOR, ROLES.GROUP_HEAD]
    },
    tariffRequest: { 
      title: 'Request Tarif', 
      description: 'Submit special pricing', 
      icon: '📝', 
      color: '#10b981',
      path: 'tariff-request',
      roles: [ROLES.SALES_OFFICER, ROLES.IMPLEMENTOR]
    },
    leadAssignment: { 
      title: 'Assign Leads', 
      description: 'Distribute to team', 
      icon: '👤', 
      color: '#003d79',
      path: 'lead-assignment',
      roles: [ROLES.SALES_HEAD]
    },
    onboarding: { 
      title: 'Onboarding Queue', 
      description: 'Review documents', 
      icon: '☑️', 
      color: '#8b5cf6',
      path: 'onboarding-queue',
      roles: [ROLES.ONBOARDING_CLERK]
    },
    mandate: { 
      title: 'Assign Mandate', 
      description: 'Distribute to team', 
      icon: '📑', 
      color: '#ec4899',
      path: 'assign-mandate',
      roles: [ROLES.TL_IMPLEMENTOR]
    },
    uploadLeads: { 
      title: 'Upload Leads', 
      description: 'Import new leads', 
      icon: '☁️', 
      color: '#0ea5e9',
      path: 'upload-leads',
      roles: [ROLES.PORTFOLIO_HEAD, ROLES.PORTFOLIO_OFFICER]
    }
  };
  
  return Object.values(allActions).filter(a => a.roles.includes(role)).slice(0, 4);
}

function getActivityIcon(type) {
  const icons = {
    status_change: '📋',
    meeting: '🤝',
    call_report: '📞',
    document: '📄',
    assignment: '👤',
    note: '📝'
  };
  return icons[type] || '📌';
}

// Register route
Router.register('dashboard', renderDashboard);
