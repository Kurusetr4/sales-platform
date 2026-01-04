/* ============================================
   MUSE Pages — Pipeline (Consolidated View)
   
   Combines Kanban Board + Table View with toggle
   Eliminates redundant "Leads" menu
   ============================================ */

// Pipeline view state
let pipelineViewMode = 'kanban'; // 'kanban' or 'table'

function renderPipeline() {
  const stages = MUSE_DATA.PIPELINE_STAGES;
  const leads = MUSE_DATA.LEADS;
  const composition = MUSE_DATA.LEADS_COMPOSITION;
  
  const content = `
    <div class="page-header">
      <div>
        <h1 class="page-title">Pipeline</h1>
        <p class="page-subtitle">Kelola dan pantau progress akuisisi nasabah</p>
      </div>
      <div class="page-actions">
        <!-- View Toggle -->
        <div class="view-toggle">
          <button class="view-toggle-btn ${pipelineViewMode === 'kanban' ? 'active' : ''}" onclick="switchPipelineView('kanban')">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="3" width="7" height="7"></rect>
              <rect x="14" y="3" width="7" height="7"></rect>
              <rect x="14" y="14" width="7" height="7"></rect>
              <rect x="3" y="14" width="7" height="7"></rect>
            </svg>
            Kanban
          </button>
          <button class="view-toggle-btn ${pipelineViewMode === 'table' ? 'active' : ''}" onclick="switchPipelineView('table')">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="8" y1="6" x2="21" y2="6"></line>
              <line x1="8" y1="12" x2="21" y2="12"></line>
              <line x1="8" y1="18" x2="21" y2="18"></line>
              <line x1="3" y1="6" x2="3.01" y2="6"></line>
              <line x1="3" y1="12" x2="3.01" y2="12"></line>
              <line x1="3" y1="18" x2="3.01" y2="18"></line>
            </svg>
            Tabel
          </button>
        </div>
        
        <select class="form-select" style="width: auto;" id="pipeline-filter-stage" onchange="filterPipelineData()">
          <option value="">Semua Stage</option>
          ${stages.map(s => `<option value="${s.id}">${s.name}</option>`).join('')}
        </select>
        <select class="form-select" style="width: auto;" id="pipeline-filter-segment" onchange="filterPipelineData()">
          <option value="">Semua Segmen</option>
          ${MUSE_DATA.SEGMENTS.map(s => `<option value="${s}">${s}</option>`).join('')}
        </select>
        <button class="btn btn-primary">+ Tambah Lead</button>
      </div>
    </div>
    
    <!-- Summary Stats -->
    <div class="pipeline-summary-strip">
      <div class="summary-item">
        <span class="summary-value">${leads.length}</span>
        <span class="summary-label">Total Pipeline</span>
      </div>
      <div class="summary-item">
        <span class="summary-value">${leads.filter(l => l.stage === 'live').length}</span>
        <span class="summary-label">Live</span>
      </div>
      <div class="summary-item">
        <span class="summary-value text-success">${Math.round(composition.summary.converted / composition.summary.totalReceived * 100)}%</span>
        <span class="summary-label">Conversion Rate</span>
      </div>
      <div class="summary-item">
        <span class="summary-value">${UI.formatCurrency(leads.reduce((s, l) => s + l.value, 0))}</span>
        <span class="summary-label">Total Nilai</span>
      </div>
    </div>
    
    <!-- Content Area (switches based on view mode) -->
    <div id="pipeline-content">
      ${pipelineViewMode === 'kanban' ? renderKanbanView(stages) : renderTableView(leads)}
    </div>
    
    <!-- Lead Detail Modal -->
    <div class="modal-backdrop" id="lead-modal-backdrop" onclick="closeLeadModal()"></div>
    <div class="modal" id="lead-modal">
      <div id="lead-modal-content"></div>
    </div>
  `;
  
  UI.render(Components.appShell('Pipeline', content));
}

function switchPipelineView(mode) {
  pipelineViewMode = mode;
  renderPipeline();
}

// ========== KANBAN VIEW ==========
function renderKanbanView(stages) {
  return `
    <div class="pipeline-board">
      ${stages.map(stage => renderPipelineColumn(stage)).join('')}
    </div>
  `;
}

function renderPipelineColumn(stage) {
  const leads = MUSE_DATA.getLeadsByStage(stage.id);
  const totalValue = leads.reduce((sum, l) => sum + l.value, 0);
  
  return `
    <div class="pipeline-column" data-stage="${stage.id}">
      <div class="pipeline-column-header" style="border-color: ${stage.color}; background: linear-gradient(135deg, ${stage.color}, ${adjustColor(stage.color, 20)});">
        <div class="pipeline-column-title">
          <span>${stage.name}</span>
          <span class="pipeline-column-count">${leads.length}</span>
        </div>
        <div class="pipeline-column-value">${UI.formatCurrency(totalValue)}</div>
      </div>
      <div class="pipeline-column-body" 
           ondrop="handleDrop(event, '${stage.id}')" 
           ondragover="handleDragOver(event)">
        ${leads.length > 0 
          ? leads.map(lead => renderPipelineCard(lead, stage)).join('')
          : renderEmptyColumn()
        }
      </div>
    </div>
  `;
}

function renderPipelineCard(lead, stage) {
  const user = MUSE_CONFIG.getUserById(lead.assignee);
  const agingClass = MUSE_DATA.getAgingColor(lead.daysInStage);
  
  return `
    <div class="pipeline-card" 
         draggable="true"
         data-lead-id="${lead.id}"
         ondragstart="handleDragStart(event)"
         onclick="openLeadModal('${lead.id}')">
      <div class="pipeline-card-header">
        <span class="badge badge-${lead.segment.toLowerCase()}">${lead.segment}</span>
        <span class="pipeline-card-aging badge-${agingClass}">${lead.daysInStage}d</span>
      </div>
      <h4 class="pipeline-card-company">${lead.company}</h4>
      <p class="pipeline-card-product">${lead.product}</p>
      <div class="pipeline-card-value">${UI.formatCurrency(lead.value)}</div>
      <div class="pipeline-card-footer">
        <div class="pipeline-card-assignee">
          <span class="avatar avatar-xs">${MUSE_CONFIG.getInitials(user?.name || '?')}</span>
          <span>${user?.name.split(' ')[0] || 'Unassigned'}</span>
        </div>
        <span class="pipeline-card-date">${lead.lastActivity}</span>
      </div>
    </div>
  `;
}

function renderEmptyColumn() {
  return `
    <div class="pipeline-empty">
      <span>Drop lead here</span>
    </div>
  `;
}

// ========== TABLE VIEW ==========
function renderTableView(leads) {
  return `
    <div class="card">
      <div class="card-header">
        <div class="flex items-center gap-3">
          <input type="text" class="form-input" placeholder="Cari perusahaan..." style="width: 250px;" id="pipeline-search" oninput="filterPipelineSearch(this.value)">
        </div>
        <span class="text-sm text-muted">${leads.length} data</span>
      </div>
      <div class="card-body p-0">
        <table class="table" id="pipeline-table">
          <thead>
            <tr>
              <th>Perusahaan</th>
              <th>Segmen</th>
              <th>Produk</th>
              <th>Nilai Potensi</th>
              <th>Stage</th>
              <th>PIC</th>
              <th>Aging</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            ${leads.map(lead => renderTableRow(lead)).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

function renderTableRow(lead) {
  const user = MUSE_CONFIG.getUserById(lead.assignee);
  const stage = MUSE_DATA.PIPELINE_STAGES.find(s => s.id === lead.stage);
  
  return `
    <tr data-stage="${lead.stage}" data-segment="${lead.segment}">
      <td>
        <div class="font-medium">${lead.company}</div>
        <div class="text-xs text-muted">${lead.id}</div>
      </td>
      <td><span class="badge badge-gray">${lead.segment}</span></td>
      <td>${lead.product}</td>
      <td class="font-semibold">${UI.formatCurrency(lead.value)}</td>
      <td><span class="badge" style="background: ${stage?.color}20; color: ${stage?.color}">${stage?.name || lead.stage}</span></td>
      <td>
        <div class="flex items-center gap-2">
          <span class="avatar avatar-sm">${user ? MUSE_CONFIG.getInitials(user.name) : '?'}</span>
          <span class="text-sm">${user?.name.split(' ')[0] || '-'}</span>
        </div>
      </td>
      <td><span class="badge badge-${MUSE_DATA.getAgingColor(lead.daysInStage)}">${lead.daysInStage} hari</span></td>
      <td>
        <button class="btn btn-sm btn-ghost" onclick="openLeadModal('${lead.id}')">👁️</button>
        <button class="btn btn-sm btn-ghost" onclick="UI.toast('Edit ${lead.id}', 'info')">✏️</button>
      </td>
    </tr>
  `;
}

// ========== FILTERS ==========
function filterPipelineData() {
  const stage = document.getElementById('pipeline-filter-stage').value;
  const segment = document.getElementById('pipeline-filter-segment').value;
  
  if (pipelineViewMode === 'table') {
    const rows = document.querySelectorAll('#pipeline-table tbody tr');
    rows.forEach(row => {
      const matchStage = !stage || row.dataset.stage === stage;
      const matchSegment = !segment || row.dataset.segment === segment;
      row.style.display = (matchStage && matchSegment) ? '' : 'none';
    });
  } else {
    // For Kanban, re-render with filtered data
    renderPipeline();
  }
}

function filterPipelineSearch(query) {
  const rows = document.querySelectorAll('#pipeline-table tbody tr');
  const q = query.toLowerCase();
  rows.forEach(row => {
    row.style.display = row.textContent.toLowerCase().includes(q) ? '' : 'none';
  });
}

// ========== DRAG AND DROP ==========
let draggedLeadId = null;

function handleDragStart(event) {
  draggedLeadId = event.target.dataset.leadId;
  event.target.classList.add('dragging');
  event.dataTransfer.effectAllowed = 'move';
}

function handleDragOver(event) {
  event.preventDefault();
  event.dataTransfer.dropEffect = 'move';
  event.currentTarget.classList.add('drag-over');
}

function handleDrop(event, newStage) {
  event.preventDefault();
  event.currentTarget.classList.remove('drag-over');
  
  if (draggedLeadId) {
    const lead = MUSE_DATA.LEADS.find(l => l.id === draggedLeadId);
    if (lead) {
      const oldStage = lead.stage;
      lead.stage = newStage;
      lead.daysInStage = 0;
      
      UI.toast(`${lead.company} dipindahkan ke ${MUSE_DATA.PIPELINE_STAGES.find(s => s.id === newStage)?.name}`, 'success');
      renderPipeline();
    }
  }
  draggedLeadId = null;
}

// ========== MODAL ==========
function openLeadModal(leadId) {
  const lead = MUSE_DATA.LEADS.find(l => l.id === leadId);
  if (!lead) return;
  
  const user = MUSE_CONFIG.getUserById(lead.assignee);
  const stage = MUSE_DATA.PIPELINE_STAGES.find(s => s.id === lead.stage);
  
  document.getElementById('lead-modal-content').innerHTML = `
    <div class="modal-header">
      <h2>${lead.company}</h2>
      <button class="btn btn-icon btn-ghost" onclick="closeLeadModal()">✕</button>
    </div>
    <div class="modal-body">
      <div class="lead-detail-grid">
        <div class="lead-detail-item">
          <span class="lead-detail-label">ID</span>
          <span class="lead-detail-value">${lead.id}</span>
        </div>
        <div class="lead-detail-item">
          <span class="lead-detail-label">Segmen</span>
          <span class="lead-detail-value"><span class="badge badge-gray">${lead.segment}</span></span>
        </div>
        <div class="lead-detail-item">
          <span class="lead-detail-label">Produk</span>
          <span class="lead-detail-value">${lead.product}</span>
        </div>
        <div class="lead-detail-item">
          <span class="lead-detail-label">Nilai Potensi</span>
          <span class="lead-detail-value font-bold">${UI.formatCurrency(lead.value)}</span>
        </div>
        <div class="lead-detail-item">
          <span class="lead-detail-label">Stage</span>
          <span class="lead-detail-value">
            <span class="badge" style="background: ${stage?.color}20; color: ${stage?.color}">${stage?.name}</span>
          </span>
        </div>
        <div class="lead-detail-item">
          <span class="lead-detail-label">Aging</span>
          <span class="lead-detail-value">${lead.daysInStage} hari di stage ini</span>
        </div>
        <div class="lead-detail-item">
          <span class="lead-detail-label">PIC</span>
          <span class="lead-detail-value">
            <div class="flex items-center gap-2">
              <span class="avatar avatar-sm">${MUSE_CONFIG.getInitials(user?.name || '?')}</span>
              ${user?.name || 'Unassigned'}
            </div>
          </span>
        </div>
        <div class="lead-detail-item">
          <span class="lead-detail-label">Last Activity</span>
          <span class="lead-detail-value">${lead.lastActivity}</span>
        </div>
      </div>
      
      <h3 class="mt-6 mb-3 font-semibold">Timeline Aktivitas</h3>
      <div class="activity-timeline">
        <div class="timeline-item">
          <div class="timeline-dot"></div>
          <div class="timeline-content">
            <p class="timeline-text">Lead di-assign ke ${user?.name || 'PIC'}</p>
            <span class="timeline-date">5 Jan 2026</span>
          </div>
        </div>
        <div class="timeline-item">
          <div class="timeline-dot"></div>
          <div class="timeline-content">
            <p class="timeline-text">Status berubah ke ${stage?.name}</p>
            <span class="timeline-date">${lead.lastActivity}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="modal-footer">
      <button class="btn btn-secondary" onclick="closeLeadModal()">Tutup</button>
      <button class="btn btn-primary">Edit Lead</button>
    </div>
  `;
  
  document.getElementById('lead-modal').classList.add('active');
  document.getElementById('lead-modal-backdrop').classList.add('active');
}

function closeLeadModal() {
  document.getElementById('lead-modal').classList.remove('active');
  document.getElementById('lead-modal-backdrop').classList.remove('active');
}

// ========== UTILITY ==========
function adjustColor(color, percent) {
  const num = parseInt(color.replace('#', ''), 16);
  const amt = Math.round(2.55 * percent);
  const R = (num >> 16) + amt;
  const G = (num >> 8 & 0x00FF) + amt;
  const B = (num & 0x0000FF) + amt;
  return '#' + (
    0x1000000 +
    (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
    (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
    (B < 255 ? B < 1 ? 0 : B : 255)
  ).toString(16).slice(1);
}

// ========== REGISTER ==========
Router.register('pipeline', renderPipeline);
