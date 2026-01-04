/* ============================================
   MUSE Pages — Additional Pages (v1.2 Fixed)
   
   Fixes:
   - Line chart untuk trend (bukan bar)
   - Terminologi: Frekuensi = jumlah, Nilai = value
   - Leads digabung ke Pipeline (Kanban + Table view)
   - Tariff tracking status
   ============================================ */

// ========== ANALYTICS PAGE (Includes Lead Composition) ==========
function renderAnalytics() {
  const stats = MUSE_DATA.DASHBOARD_STATS;
  const analytics = MUSE_DATA.ANALYTICS_DATA;
  const composition = MUSE_DATA.LEADS_COMPOSITION;
  
  const content = `
    <div class="page-header">
      <div>
        <h1 class="page-title">Analytics</h1>
        <p class="page-subtitle">Business intelligence dan performance insights</p>
      </div>
      <div class="page-actions">
        <select class="form-select" style="width: auto;">
          <option>6 Bulan Terakhir</option>
          <option>Quarter Ini</option>
          <option>Year to Date</option>
        </select>
        <button class="btn btn-secondary">📥 Export</button>
      </div>
    </div>
    
    <!-- KPI Summary -->
    <div class="analytics-kpi-grid">
      <div class="kpi-card card">
        <div class="kpi-icon">💰</div>
        <div class="kpi-content">
          <span class="kpi-value">${UI.formatCurrency(analytics.kpiSummary.totalRevenue)}</span>
          <span class="kpi-label">Total Revenue YTD</span>
        </div>
      </div>
      <div class="kpi-card card">
        <div class="kpi-icon">📊</div>
        <div class="kpi-content">
          <span class="kpi-value">${analytics.kpiSummary.totalDeals}</span>
          <span class="kpi-label">Total Deals</span>
        </div>
      </div>
      <div class="kpi-card card">
        <div class="kpi-icon">📈</div>
        <div class="kpi-content">
          <span class="kpi-value">${UI.formatCurrency(analytics.kpiSummary.avgDealSize)}</span>
          <span class="kpi-label">Avg Deal Size</span>
        </div>
      </div>
      <div class="kpi-card card">
        <div class="kpi-icon">🎯</div>
        <div class="kpi-content">
          <span class="kpi-value">${analytics.kpiSummary.winRate}%</span>
          <span class="kpi-label">Win Rate</span>
        </div>
      </div>
    </div>
    
    <!-- Pipeline Composition -->
    <div class="card mt-4">
      <div class="card-header">
        <h3 class="font-semibold">📊 Komposisi Pipeline</h3>
      </div>
      <div class="card-body">
        <div class="composition-stats">
          <div class="comp-stat">
            <span class="comp-stat-icon" style="background: var(--color-primary-100); color: var(--color-primary-600);">📥</span>
            <div class="comp-stat-info">
              <span class="comp-stat-value">${composition.summary.totalReceived}</span>
              <span class="comp-stat-label">Total Diterima</span>
            </div>
          </div>
          <div class="comp-stat">
            <span class="comp-stat-icon" style="background: var(--color-info-100); color: var(--color-info-600);">⏳</span>
            <div class="comp-stat-info">
              <span class="comp-stat-value">${composition.summary.inProgress}</span>
              <span class="comp-stat-label">Dalam Proses (${Math.round(composition.summary.inProgress / composition.summary.totalReceived * 100)}%)</span>
            </div>
          </div>
          <div class="comp-stat">
            <span class="comp-stat-icon" style="background: var(--color-success-100); color: var(--color-success-600);">✅</span>
            <div class="comp-stat-info">
              <span class="comp-stat-value">${composition.summary.converted}</span>
              <span class="comp-stat-label">Live (${Math.round(composition.summary.converted / composition.summary.totalReceived * 100)}%)</span>
            </div>
          </div>
          <div class="comp-stat">
            <span class="comp-stat-icon" style="background: var(--color-danger-100); color: var(--color-danger-600);">❌</span>
            <div class="comp-stat-info">
              <span class="comp-stat-value">${composition.summary.dropped}</span>
              <span class="comp-stat-label">Dropped (${Math.round(composition.summary.dropped / composition.summary.totalReceived * 100)}%)</span>
            </div>
          </div>
        </div>
        
        <h4 class="mt-4 mb-3 font-medium text-sm text-muted">Alasan Drop</h4>
        ${renderDropReasons(composition.dropReasons)}
      </div>
    </div>
    
    <!-- Trend Chart (LINE CHART) -->
    <div class="card mt-4">
      <div class="card-header">
        <h3 class="font-semibold">📈 Trend Performance (6 Bulan)</h3>
        <div class="chart-legend">
          <span class="legend-item"><span class="legend-dot" style="background: var(--color-primary-500)"></span> Revenue</span>
          <span class="legend-item"><span class="legend-dot" style="background: var(--color-success-500)"></span> Frekuensi Deal</span>
        </div>
      </div>
      <div class="card-body">
        ${renderLineChart(analytics.revenueTrend)}
      </div>
    </div>
    
    <!-- Two Column: Product + Performers -->
    <div class="analytics-grid mt-4">
      <div class="card">
        <div class="card-header">
          <h3 class="font-semibold">📦 Distribusi Produk</h3>
        </div>
        <div class="card-body">
          ${renderProductDistribution(analytics.productDistribution)}
        </div>
      </div>
      
      <div class="card">
        <div class="card-header">
          <h3 class="font-semibold">🏆 Top Performers</h3>
        </div>
        <div class="card-body">
          ${renderTopPerformers()}
        </div>
      </div>
    </div>
    
    <!-- Conversion Funnel -->
    <div class="card mt-4">
      <div class="card-header">
        <h3 class="font-semibold">Conversion Funnel</h3>
      </div>
      <div class="card-body">
        ${renderConversionFunnel()}
      </div>
    </div>
  `;
  
  UI.render(Components.appShell('Analytics', content));
}

function renderDropReasons(reasons) {
  return `
    <div class="drop-reasons-horizontal">
      ${reasons.map(r => `
        <div class="drop-reason-card">
          <div class="drop-reason-percent-circle">
            <span>${r.percentage}%</span>
          </div>
          <div class="drop-reason-info">
            <span class="drop-reason-name">${r.reason}</span>
            <span class="drop-reason-count">${r.count} leads</span>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

// Line Chart for Trend
function renderLineChart(data) {
  const maxRevenue = Math.max(...data.map(d => d.revenue));
  const maxFreq = Math.max(...data.map(d => d.frequency));
  const chartHeight = 200;
  const chartWidth = 100; // percentage
  const pointSpacing = chartWidth / (data.length - 1);
  
  // Calculate points for revenue line
  const revenuePoints = data.map((d, i) => {
    const x = i * pointSpacing;
    const y = chartHeight - (d.revenue / maxRevenue * chartHeight * 0.85);
    return `${x},${y}`;
  }).join(' ');
  
  // Calculate points for frequency line  
  const freqPoints = data.map((d, i) => {
    const x = i * pointSpacing;
    const y = chartHeight - (d.frequency / maxFreq * chartHeight * 0.85);
    return `${x},${y}`;
  }).join(' ');
  
  return `
    <div class="line-chart-container">
      <div class="line-chart-y-axis">
        <span>${(maxRevenue / 1000000000).toFixed(0)}B</span>
        <span>${(maxRevenue / 2000000000).toFixed(0)}B</span>
        <span>0</span>
      </div>
      <div class="line-chart-wrapper">
        <svg class="line-chart-svg" viewBox="0 0 100 ${chartHeight}" preserveAspectRatio="none">
          <!-- Grid lines -->
          <line x1="0" y1="${chartHeight * 0.25}" x2="100" y2="${chartHeight * 0.25}" stroke="#e5e7eb" stroke-width="0.5"/>
          <line x1="0" y1="${chartHeight * 0.5}" x2="100" y2="${chartHeight * 0.5}" stroke="#e5e7eb" stroke-width="0.5"/>
          <line x1="0" y1="${chartHeight * 0.75}" x2="100" y2="${chartHeight * 0.75}" stroke="#e5e7eb" stroke-width="0.5"/>
          
          <!-- Revenue line (area fill) -->
          <polygon points="0,${chartHeight} ${revenuePoints} 100,${chartHeight}" fill="url(#revenueGradient)" opacity="0.3"/>
          <polyline points="${revenuePoints}" fill="none" stroke="var(--color-primary-500)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          
          <!-- Frequency line -->
          <polyline points="${freqPoints}" fill="none" stroke="var(--color-success-500)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="4,2"/>
          
          <!-- Gradient definition -->
          <defs>
            <linearGradient id="revenueGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style="stop-color:var(--color-primary-500);stop-opacity:0.4"/>
              <stop offset="100%" style="stop-color:var(--color-primary-500);stop-opacity:0"/>
            </linearGradient>
          </defs>
          
          <!-- Data points -->
          ${data.map((d, i) => {
            const x = i * pointSpacing;
            const yRev = chartHeight - (d.revenue / maxRevenue * chartHeight * 0.85);
            const yFreq = chartHeight - (d.frequency / maxFreq * chartHeight * 0.85);
            return `
              <circle cx="${x}" cy="${yRev}" r="3" fill="var(--color-primary-500)"/>
              <circle cx="${x}" cy="${yFreq}" r="3" fill="var(--color-success-500)"/>
            `;
          }).join('')}
        </svg>
        
        <!-- X-axis labels -->
        <div class="line-chart-x-axis">
          ${data.map(d => `<span>${d.month.split(' ')[0]}</span>`).join('')}
        </div>
      </div>
    </div>
    
    <!-- Data table below chart -->
    <div class="chart-data-table mt-4">
      <table class="table table-sm">
        <thead>
          <tr>
            <th>Bulan</th>
            <th class="text-right">Revenue</th>
            <th class="text-right">Frekuensi (Deals)</th>
            <th class="text-right">Volume Won</th>
          </tr>
        </thead>
        <tbody>
          ${data.map(d => `
            <tr>
              <td>${d.month}</td>
              <td class="text-right font-medium">${UI.formatCurrency(d.revenue)}</td>
              <td class="text-right">${d.frequency}</td>
              <td class="text-right">${d.volume}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `;
}

function renderProductDistribution(products) {
  const maxDeals = Math.max(...products.map(p => p.deals));
  const colors = ['#003d79', '#0066cc', '#3498db', '#5dade2', '#85c1e9', '#aed6f1', '#d4e6f1'];
  
  return `
    <div class="product-distribution">
      ${products.map((p, i) => `
        <div class="product-item">
          <div class="product-header">
            <span class="product-name">${p.product}</span>
            <span class="product-deals">${p.deals} deals</span>
          </div>
          <div class="product-bar-wrapper">
            <div class="product-bar" style="width: ${(p.deals / maxDeals) * 100}%; background: ${colors[i]}"></div>
          </div>
          <div class="product-footer">
            <span class="product-value">${UI.formatCurrency(p.value)}</span>
            <span class="product-percent">${p.percentage}%</span>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

function renderConversionFunnel() {
  const funnel = [
    { stage: 'Opportunity Gathering', count: 150, rate: 100 },
    { stage: 'Solutioning', count: 112, rate: 75 },
    { stage: 'Negosiasi', count: 75, rate: 50 },
    { stage: 'Won Deal', count: 52, rate: 35 },
    { stage: 'Live', count: 45, rate: 30 }
  ];
  const colors = ['#6366f1', '#0ea5e9', '#f59e0b', '#10b981', '#003d79'];
  
  return `
    <div class="funnel-chart-horizontal">
      ${funnel.map((f, i) => `
        <div class="funnel-stage">
          <div class="funnel-bar" style="width: ${f.rate}%; background: ${colors[i]}">
            <span class="funnel-label">${f.stage}</span>
          </div>
          <span class="funnel-count">${f.count} (${f.rate}%)</span>
        </div>
      `).join('')}
    </div>
  `;
}

function renderTopPerformers() {
  const top5 = MUSE_DATA.LEADERBOARD.slice(0, 5);
  
  return `
    <div class="top-performers">
      ${top5.map((entry, i) => {
        const user = MUSE_CONFIG.getUserById(entry.id);
        return `
          <div class="performer-item">
            <span class="performer-rank ${i < 3 ? 'top-' + (i+1) : ''}">${i + 1}</span>
            <span class="avatar avatar-sm">${MUSE_CONFIG.getInitials(user?.name || '?')}</span>
            <div class="performer-info">
              <span class="performer-name">${user?.name || 'Unknown'}</span>
              <span class="performer-stats">${entry.wonDeals} won • ${entry.liveDeals} live</span>
            </div>
            <span class="performer-points">${entry.points.toLocaleString()} pts</span>
          </div>
        `;
      }).join('')}
    </div>
  `;
}

// ========== TARIFF REQUEST (Fixed Terminology) ==========
// Frekuensi = jumlah transaksi (count)
// Nilai = value transaksi (Rp)

function renderTariffRequest() {
  const config = MUSE_DATA.TARIFF_CONFIG;
  const products = Object.keys(config.products);
  
  const content = `
    <div class="page-header">
      <div>
        <h1 class="page-title">Pengajuan Tarif Khusus</h1>
        <p class="page-subtitle">Submit special pricing dengan analisis kelayakan BEP</p>
      </div>
      <div class="page-actions">
        <button class="btn btn-secondary" onclick="Router.navigate('tariff-tracking')">
          📋 Lihat Status Pengajuan
        </button>
      </div>
    </div>
    
    <div class="tariff-grid">
      <!-- Form Section -->
      <div class="card">
        <div class="card-header">
          <h3 class="font-semibold">📝 Form Pengajuan</h3>
        </div>
        <div class="card-body">
          <form id="tariff-form" onsubmit="handleTariffSubmit(event)">
            <div class="form-group">
              <label class="form-label">Pilih Lead/Nasabah *</label>
              <select class="form-select" id="tariff-lead" required>
                <option value="">-- Pilih Lead --</option>
                ${MUSE_DATA.LEADS.filter(l => ['negosiasi', 'solutioning'].includes(l.stage)).map(l => 
                  `<option value="${l.id}">${l.company} - ${l.product}</option>`
                ).join('')}
              </select>
            </div>
            
            <div class="form-group">
              <label class="form-label">Produk *</label>
              <select class="form-select" id="tariff-product" onchange="updateProductInfo(this.value)" required>
                <option value="">-- Pilih Produk --</option>
                ${products.map(p => `<option value="${p}">${p}</option>`).join('')}
              </select>
              <p class="form-hint" id="product-desc"></p>
            </div>
            
            <div class="form-row">
              <div class="form-group">
                <label class="form-label">Tarif Normal</label>
                <input type="text" class="form-input" id="tariff-normal" readonly placeholder="Auto">
              </div>
              <div class="form-group">
                <label class="form-label">Tarif Diusulkan *</label>
                <input type="number" class="form-input" id="tariff-proposed" placeholder="0" min="0" oninput="calculateBEP()" required>
              </div>
            </div>
            
            <div class="form-row">
              <div class="form-group">
                <label class="form-label">Frekuensi/Bulan *</label>
                <input type="number" class="form-input" id="tariff-frequency" placeholder="Jumlah transaksi per bulan" min="1" oninput="calculateBEP()" required>
                <p class="form-hint">Berapa kali transaksi per bulan (untuk Payroll = jumlah karyawan)</p>
              </div>
              <div class="form-group">
                <label class="form-label">Diskon</label>
                <input type="text" class="form-input" id="tariff-discount" readonly placeholder="Auto">
              </div>
            </div>
            
            <div class="form-group">
              <label class="form-label">Justifikasi Bisnis *</label>
              <textarea class="form-textarea form-input" id="tariff-justification" rows="3" placeholder="Jelaskan alasan pengajuan tarif khusus..." required></textarea>
            </div>
          </form>
        </div>
      </div>
      
      <!-- BEP Calculator -->
      <div class="card">
        <div class="card-header">
          <h3 class="font-semibold">📊 Trade-Off Analysis (BEP Calculator)</h3>
        </div>
        <div class="card-body">
          <div class="bep-info-box">
            <p>Fee yang hilang harus dikompensasi dengan <strong>komitmen tambahan saldo Giro</strong> yang menghasilkan Net Interest Income (NII).</p>
            <p class="text-sm text-muted mt-2">FTP Rate: <strong>${(config.ftpRate * 100).toFixed(1)}%</strong> per tahun</p>
          </div>
          
          <div class="bep-calc-box">
            <div class="bep-row">
              <span>Fee Normal / Bulan</span>
              <span class="bep-value" id="bep-fee-normal">Rp 0</span>
            </div>
            <div class="bep-row">
              <span>Fee Diusulkan / Bulan</span>
              <span class="bep-value" id="bep-fee-proposed">Rp 0</span>
            </div>
            <div class="bep-row highlight-red">
              <span>Potensi Fee Hilang / Bulan</span>
              <span class="bep-value text-danger" id="bep-fee-lost">Rp 0</span>
            </div>
            <div class="bep-row">
              <span>Potensi Fee Hilang / Tahun</span>
              <span class="bep-value text-danger" id="bep-fee-lost-year">Rp 0</span>
            </div>
            
            <hr class="bep-divider">
            
            <div class="bep-row highlight-blue">
              <span>💰 Minimum Tambahan Saldo Giro</span>
              <span class="bep-value font-bold" id="bep-min-balance">Rp 0</span>
            </div>
            <p class="text-xs text-muted">= Fee Hilang/Tahun ÷ FTP Rate</p>
          </div>
          
          <div class="bep-commitment-box mt-4">
            <label class="form-label">Komitmen Tambahan Saldo Giro dari Nasabah *</label>
            <input type="number" class="form-input" id="bep-commitment" placeholder="Masukkan komitmen saldo Giro" min="0" oninput="evaluateBEP()">
            
            <div class="bep-result-box mt-3" id="bep-result-box">
              <span class="bep-result-icon" id="bep-result-icon">⏳</span>
              <span class="bep-result-text" id="bep-result-text">Masukkan data untuk kalkulasi</span>
            </div>
            
            <div class="bep-summary-box mt-3" id="bep-summary" style="display: none;">
              <div class="bep-row">
                <span>NII dari Komitmen Giro</span>
                <span class="bep-value text-success" id="bep-nii">Rp 0</span>
              </div>
              <div class="bep-row">
                <span>Fee Hilang / Tahun</span>
                <span class="bep-value text-danger" id="bep-fee-compare">Rp 0</span>
              </div>
              <div class="bep-row highlight-result">
                <span>Net Impact</span>
                <span class="bep-value font-bold" id="bep-net-impact">Rp 0</span>
              </div>
            </div>
          </div>
          
          <div class="flex gap-3 mt-6">
            <button type="submit" form="tariff-form" class="btn btn-primary" id="btn-submit-tariff" disabled>Submit Pengajuan</button>
            <button type="button" class="btn btn-secondary" onclick="resetTariffForm()">Reset</button>
          </div>
        </div>
      </div>
    </div>
  `;
  
  UI.render(Components.appShell('Pengajuan Tarif', content));
}

function updateProductInfo(product) {
  const config = MUSE_DATA.TARIFF_CONFIG;
  const info = config.products[product];
  
  if (info) {
    document.getElementById('product-desc').textContent = info.description + ' (' + info.unit + ')';
    
    let normalFee = info.normalFee;
    if (normalFee < 1) {
      document.getElementById('tariff-normal').value = (normalFee * 100).toFixed(2) + '%';
    } else {
      document.getElementById('tariff-normal').value = 'Rp ' + normalFee.toLocaleString('id-ID');
    }
    
    calculateBEP();
  }
}

function calculateBEP() {
  const config = MUSE_DATA.TARIFF_CONFIG;
  const product = document.getElementById('tariff-product').value;
  const proposedFee = parseFloat(document.getElementById('tariff-proposed').value) || 0;
  const frequency = parseFloat(document.getElementById('tariff-frequency').value) || 0;
  
  if (!product || !config.products[product]) return;
  
  const info = config.products[product];
  const normalFee = info.normalFee;
  
  // Calculate discount percentage
  let discount = 0;
  if (normalFee > 0 && normalFee >= proposedFee) {
    discount = ((normalFee - proposedFee) / normalFee * 100).toFixed(1);
  }
  document.getElementById('tariff-discount').value = discount + '%';
  
  // Calculate fees based on frequency
  const feeNormalMonth = normalFee * frequency;
  const feeProposedMonth = proposedFee * frequency;
  const feeLostMonth = feeNormalMonth - feeProposedMonth;
  const feeLostYear = feeLostMonth * 12;
  
  // Calculate minimum balance needed for BEP
  const minBalance = feeLostYear > 0 ? feeLostYear / config.ftpRate : 0;
  
  // Update display
  document.getElementById('bep-fee-normal').textContent = 'Rp ' + Math.round(feeNormalMonth).toLocaleString('id-ID');
  document.getElementById('bep-fee-proposed').textContent = 'Rp ' + Math.round(feeProposedMonth).toLocaleString('id-ID');
  document.getElementById('bep-fee-lost').textContent = 'Rp ' + Math.round(feeLostMonth).toLocaleString('id-ID');
  document.getElementById('bep-fee-lost-year').textContent = 'Rp ' + Math.round(feeLostYear).toLocaleString('id-ID');
  document.getElementById('bep-min-balance').textContent = 'Rp ' + Math.ceil(minBalance).toLocaleString('id-ID');
  
  window.tariffCalc = { feeLostYear, minBalance };
  evaluateBEP();
}

function evaluateBEP() {
  const config = MUSE_DATA.TARIFF_CONFIG;
  const commitment = parseFloat(document.getElementById('bep-commitment').value) || 0;
  const calc = window.tariffCalc || { feeLostYear: 0, minBalance: 0 };
  
  const resultBox = document.getElementById('bep-result-box');
  const resultIcon = document.getElementById('bep-result-icon');
  const resultText = document.getElementById('bep-result-text');
  const summary = document.getElementById('bep-summary');
  const submitBtn = document.getElementById('btn-submit-tariff');
  
  if (commitment <= 0 || calc.feeLostYear <= 0) {
    resultBox.className = 'bep-result-box pending';
    resultIcon.textContent = '⏳';
    resultText.textContent = 'Masukkan komitmen saldo Giro';
    summary.style.display = 'none';
    submitBtn.disabled = true;
    return;
  }
  
  const nii = commitment * config.ftpRate;
  const netImpact = nii - calc.feeLostYear;
  
  document.getElementById('bep-nii').textContent = 'Rp ' + Math.round(nii).toLocaleString('id-ID');
  document.getElementById('bep-fee-compare').textContent = 'Rp ' + Math.round(calc.feeLostYear).toLocaleString('id-ID');
  document.getElementById('bep-net-impact').textContent = 'Rp ' + Math.round(netImpact).toLocaleString('id-ID');
  document.getElementById('bep-net-impact').className = 'bep-value font-bold ' + (netImpact >= 0 ? 'text-success' : 'text-danger');
  summary.style.display = 'block';
  
  if (netImpact >= 0) {
    resultBox.className = 'bep-result-box approved';
    resultIcon.textContent = '✅';
    const surplusText = netImpact > 0 ? ' dengan surplus Rp ' + Math.round(netImpact).toLocaleString('id-ID') : ' (BEP tepat)';
    resultText.innerHTML = '<strong>LAYAK DIAJUKAN</strong><br><span class="text-sm">NII menutup fee yang hilang' + surplusText + '</span>';
    submitBtn.disabled = false;
  } else {
    resultBox.className = 'bep-result-box rejected';
    resultIcon.textContent = '❌';
    resultText.innerHTML = '<strong>TIDAK LAYAK</strong><br><span class="text-sm">Defisit Rp ' + Math.abs(Math.round(netImpact)).toLocaleString('id-ID') + '<br>Tingkatkan komitmen saldo atau kurangi diskon</span>';
    submitBtn.disabled = true;
  }
}

function resetTariffForm() {
  document.getElementById('tariff-form').reset();
  document.getElementById('product-desc').textContent = '';
  document.getElementById('tariff-normal').value = '';
  document.getElementById('tariff-discount').value = '';
  ['bep-fee-normal', 'bep-fee-proposed', 'bep-fee-lost', 'bep-fee-lost-year', 'bep-min-balance'].forEach(id => {
    document.getElementById(id).textContent = 'Rp 0';
  });
  document.getElementById('bep-commitment').value = '';
  document.getElementById('bep-summary').style.display = 'none';
  document.getElementById('bep-result-box').className = 'bep-result-box pending';
  document.getElementById('bep-result-icon').textContent = '⏳';
  document.getElementById('bep-result-text').textContent = 'Masukkan data untuk kalkulasi';
  document.getElementById('btn-submit-tariff').disabled = true;
  window.tariffCalc = null;
}

function handleTariffSubmit(e) {
  e.preventDefault();
  UI.toast('Pengajuan tarif berhasil disubmit!', 'success');
  setTimeout(() => Router.navigate('tariff-tracking'), 1500);
}

// ========== TARIFF TRACKING PAGE ==========
function renderTariffTracking() {
  const requests = [
    { id: 'TR-001', company: 'PT Telkom Indonesia', product: 'Payroll', discount: '100%', status: 'approved', submittedAt: '2 Jan 2026', approvedBy: 'Ashadi Septiaji' },
    { id: 'TR-002', company: 'PT Pertamina', product: 'Cash Management', discount: '30%', status: 'pending', submittedAt: '3 Jan 2026', approvedBy: '-' },
    { id: 'TR-003', company: 'PT PLN', product: 'Virtual Account', discount: '50%', status: 'review', submittedAt: '3 Jan 2026', approvedBy: '-' },
    { id: 'TR-004', company: 'PT Adaro Energy', product: 'Trade Finance', discount: '20%', status: 'rejected', submittedAt: '1 Jan 2026', approvedBy: 'Alfa Masjita', rejectReason: 'Komitmen saldo tidak mencukupi BEP' }
  ];
  
  const statusConfig = {
    pending: { label: 'Menunggu Review', badge: 'warning', icon: '⏳' },
    review: { label: 'Sedang Direview', badge: 'info', icon: '🔍' },
    approved: { label: 'Disetujui', badge: 'success', icon: '✅' },
    rejected: { label: 'Ditolak', badge: 'danger', icon: '❌' }
  };
  
  const content = `
    <div class="page-header">
      <div>
        <h1 class="page-title">Status Pengajuan Tarif</h1>
        <p class="page-subtitle">Pantau status pengajuan tarif khusus Anda</p>
      </div>
      <div class="page-actions">
        <button class="btn btn-primary" onclick="Router.navigate('tariff-request')">
          + Pengajuan Baru
        </button>
      </div>
    </div>
    
    <div class="card">
      <div class="card-body p-0">
        <table class="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nasabah</th>
              <th>Produk</th>
              <th>Diskon</th>
              <th>Tanggal Submit</th>
              <th>Status</th>
              <th>Approver</th>
            </tr>
          </thead>
          <tbody>
            ${requests.map(r => {
              const status = statusConfig[r.status];
              return `
                <tr>
                  <td class="font-mono">${r.id}</td>
                  <td class="font-medium">${r.company}</td>
                  <td>${r.product}</td>
                  <td>${r.discount}</td>
                  <td>${r.submittedAt}</td>
                  <td>
                    <span class="badge badge-${status.badge}">${status.icon} ${status.label}</span>
                    ${r.rejectReason ? `<br><span class="text-xs text-danger">Alasan: ${r.rejectReason}</span>` : ''}
                  </td>
                  <td>${r.approvedBy}</td>
                </tr>
              `;
            }).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
  
  UI.render(Components.appShell('Status Pengajuan Tarif', content));
}

// ========== ROLE-SPECIFIC PAGES ==========

function renderLeadAssignment() {
  const unassignedLeads = MUSE_DATA.LEADS.filter(l => l.stage === 'opportunity').slice(0, 8);
  const user = AppState.currentUser;
  const teamMembers = MUSE_CONFIG.USERS.filter(u => 
    u.role === MUSE_CONFIG.ROLES.SALES_OFFICER && u.headId === user?.id
  );
  const displayTeam = teamMembers.length > 0 ? teamMembers : 
    MUSE_CONFIG.USERS.filter(u => u.role === MUSE_CONFIG.ROLES.SALES_OFFICER).slice(0, 6);
  
  const content = `
    <div class="page-header">
      <div>
        <h1 class="page-title">Lead Assignment</h1>
        <p class="page-subtitle">Distribusikan leads ke tim Anda</p>
      </div>
    </div>
    
    <div class="assignment-grid">
      <div class="card">
        <div class="card-header">
          <h3 class="font-semibold">Leads Tersedia</h3>
          <span class="badge badge-primary">${unassignedLeads.length}</span>
        </div>
        <div class="card-body">
          ${unassignedLeads.length > 0 ? unassignedLeads.map(lead => `
            <div class="assignment-lead-item">
              <div class="assignment-lead-info">
                <h4 class="font-medium">${lead.company}</h4>
                <p class="text-sm text-muted">${lead.product} • ${UI.formatCurrency(lead.value)}</p>
              </div>
              <button class="btn btn-sm btn-primary">Assign</button>
            </div>
          `).join('') : '<p class="text-muted text-center py-4">Tidak ada leads baru</p>'}
        </div>
      </div>
      
      <div class="card">
        <div class="card-header">
          <h3 class="font-semibold">Kapasitas Tim</h3>
        </div>
        <div class="card-body">
          ${displayTeam.map(member => {
            const memberLeads = MUSE_DATA.LEADS.filter(l => l.assignee === member.id);
            const capacity = Math.min(100, memberLeads.length * 15);
            return `
              <div class="capacity-item">
                <div class="capacity-header">
                  <div class="flex items-center gap-2">
                    <span class="avatar avatar-sm">${MUSE_CONFIG.getInitials(member.name)}</span>
                    <span class="font-medium">${member.name}</span>
                  </div>
                  <span class="text-sm text-muted">${memberLeads.length} leads</span>
                </div>
                <div class="progress mt-2">
                  <div class="progress-bar ${capacity > 80 ? 'danger' : capacity > 50 ? 'warning' : 'success'}" style="width: ${capacity}%"></div>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    </div>
  `;
  
  UI.render(Components.appShell('Lead Assignment', content));
}

function renderOnboardingQueue() {
  const mandates = MUSE_DATA.MANDATES;
  
  const content = `
    <div class="page-header">
      <div>
        <h1 class="page-title">Onboarding Queue</h1>
        <p class="page-subtitle">Review kelengkapan dokumen</p>
      </div>
    </div>
    
    <div class="card">
      <div class="card-body p-0">
        <table class="table">
          <thead>
            <tr>
              <th>Mandate ID</th>
              <th>Nasabah</th>
              <th>Produk</th>
              <th>Submitted By</th>
              <th>Dokumen</th>
              <th>Status</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            ${mandates.map(m => {
              const submitter = MUSE_CONFIG.getUserById(m.submittedBy);
              return `
                <tr>
                  <td class="font-mono">${m.id}</td>
                  <td class="font-medium">${m.company}</td>
                  <td>${m.product}</td>
                  <td>
                    <div class="flex items-center gap-2">
                      <span class="avatar avatar-sm">${MUSE_CONFIG.getInitials(submitter?.name || '?')}</span>
                      <span>${submitter?.name || '-'}</span>
                    </div>
                  </td>
                  <td>
                    <div class="flex items-center gap-2">
                      <div class="progress" style="width: 80px;">
                        <div class="progress-bar ${m.documents.complete === m.documents.required ? 'success' : 'warning'}" 
                             style="width: ${(m.documents.complete / m.documents.required) * 100}%"></div>
                      </div>
                      <span class="text-sm">${m.documents.complete}/${m.documents.required}</span>
                    </div>
                  </td>
                  <td><span class="badge badge-warning">Pending Review</span></td>
                  <td>
                    <button class="btn btn-sm btn-success">✓ Approve</button>
                    <button class="btn btn-sm btn-danger">↩ Return</button>
                  </td>
                </tr>
              `;
            }).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
  
  UI.render(Components.appShell('Onboarding Queue', content));
}

// ========== UTILITY PAGES ==========

function renderAccessDenied() {
  const content = `
    <div class="empty-state" style="min-height: 60vh;">
      <div class="empty-state-icon">🚫</div>
      <h2 class="empty-state-title">Akses Tidak Diizinkan</h2>
      <p class="empty-state-description">Anda tidak memiliki akses ke halaman ini.</p>
      <button class="btn btn-primary mt-4" onclick="Router.navigate('dashboard')">← Kembali ke Dashboard</button>
    </div>
  `;
  UI.render(Components.appShell('Access Denied', content));
}

function render404() {
  const content = `
    <div class="empty-state" style="min-height: 60vh;">
      <div class="empty-state-icon">🔍</div>
      <h2 class="empty-state-title">Halaman Tidak Ditemukan</h2>
      <p class="empty-state-description">Halaman yang Anda cari tidak ada.</p>
      <button class="btn btn-primary mt-4" onclick="Router.navigate('dashboard')">← Kembali ke Dashboard</button>
    </div>
  `;
  UI.render(Components.appShell('404', content));
}

function renderPlaceholder(title, description) {
  const content = `
    <div class="page-header">
      <div>
        <h1 class="page-title">${title}</h1>
        <p class="page-subtitle">${description}</p>
      </div>
    </div>
    <div class="card">
      <div class="card-body">
        <div class="empty-state">
          <div class="empty-state-icon">🚧</div>
          <h3 class="empty-state-title">Coming Soon</h3>
          <p class="empty-state-description">Fitur ini sedang dalam pengembangan.</p>
        </div>
      </div>
    </div>
  `;
  UI.render(Components.appShell(title, content));
}

// ========== ROUTE REGISTRATION ==========
Router.register('analytics', renderAnalytics);
Router.register('lead-assignment', renderLeadAssignment);
Router.register('onboarding-queue', renderOnboardingQueue);
Router.register('tariff-request', renderTariffRequest);
Router.register('tariff-tracking', renderTariffTracking);
Router.register('tariff-analysis', () => renderPlaceholder('Analisa Tarif', 'Review dan analisis pengajuan tarif'));
Router.register('tariff-approval', () => renderPlaceholder('Approval Tarif', 'Approve atau reject pengajuan tarif'));
Router.register('tariff-monitor', () => renderPlaceholder('Monitor Tarif', 'Monitoring realisasi komitmen tarif'));
Router.register('mandate-tracking', () => renderPlaceholder('Mandate Tracking', 'Tracking status mandate'));
Router.register('assign-mandate', () => renderPlaceholder('Assign Mandate', 'Assign mandate ke implementor'));
Router.register('implementation-queue', () => renderPlaceholder('Implementation Queue', 'Antrian implementasi'));
Router.register('upload-leads', () => renderPlaceholder('Upload Leads', 'Import leads dari file'));
Router.register('access-denied', renderAccessDenied);
Router.register('404', render404);
