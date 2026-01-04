/* ============================================
   MUSE Pages — Leaderboard & Gamification
   ============================================ */

function renderLeaderboard() {
  const leaderboard = MUSE_DATA.LEADERBOARD;
  const currentUser = AppState.currentUser;
  
  // Find current user's ranking
  const userRanking = leaderboard.find(l => l.id === currentUser.id);
  
  const content = `
    <div class="page-header">
      <div>
        <h1 class="page-title">Leaderboard</h1>
        <p class="page-subtitle">Sales Performance Rankings</p>
      </div>
      <div class="page-actions">
        <select class="form-select" style="width: auto;">
          <option value="monthly">This Month</option>
          <option value="quarterly">This Quarter</option>
          <option value="yearly">This Year</option>
        </select>
      </div>
    </div>
    
    <!-- Your Stats Card -->
    ${userRanking ? renderYourStats(userRanking) : ''}
    
    <!-- Top 3 Podium -->
    <div class="leaderboard-podium">
      ${renderPodium(leaderboard.slice(0, 3))}
    </div>
    
    <!-- Full Leaderboard Table -->
    <div class="card mt-6">
      <div class="card-header">
        <h3 class="font-semibold">Full Rankings</h3>
      </div>
      <div class="card-body p-0">
        <table class="table">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Sales Officer</th>
              <th>Department</th>
              <th>Points</th>
              <th>Won Deals</th>
              <th>Live</th>
              <th>Streak</th>
              <th>Badges</th>
            </tr>
          </thead>
          <tbody>
            ${leaderboard.map((entry, i) => renderLeaderboardRow(entry, i + 1, currentUser.id)).join('')}
          </tbody>
        </table>
      </div>
    </div>
    
    <!-- Points System Info -->
    <div class="card mt-6">
      <div class="card-header">
        <h3 class="font-semibold">📊 Point System</h3>
      </div>
      <div class="card-body">
        <div class="points-grid">
          ${renderPointsSystem()}
        </div>
      </div>
    </div>
    
    <!-- Badges Info -->
    <div class="card mt-6">
      <div class="card-header">
        <h3 class="font-semibold">🏅 Available Badges</h3>
      </div>
      <div class="card-body">
        <div class="badges-grid">
          ${renderBadgesInfo()}
        </div>
      </div>
    </div>
  `;
  
  UI.render(Components.appShell('Leaderboard', content));
}

function renderYourStats(ranking) {
  const user = MUSE_CONFIG.getUserById(ranking.id);
  const badges = ranking.badges.map(b => MUSE_DATA.BADGES[b]).filter(Boolean);
  
  return `
    <div class="your-stats-card card">
      <div class="your-stats-header">
        <div class="your-stats-rank">
          <span class="your-stats-rank-number">#${ranking.rank}</span>
          <span class="your-stats-rank-label">Your Rank</span>
        </div>
        <div class="your-stats-user">
          <div class="avatar avatar-lg">${MUSE_CONFIG.getInitials(user.name)}</div>
          <div>
            <h3 class="font-semibold">${user.name}</h3>
            <p class="text-sm text-muted">${user.department}</p>
          </div>
        </div>
      </div>
      <div class="your-stats-metrics">
        <div class="your-stats-metric">
          <span class="your-stats-metric-value">${ranking.points.toLocaleString()}</span>
          <span class="your-stats-metric-label">Points</span>
        </div>
        <div class="your-stats-metric">
          <span class="your-stats-metric-value">${ranking.wonDeals}</span>
          <span class="your-stats-metric-label">Won Deals</span>
        </div>
        <div class="your-stats-metric">
          <span class="your-stats-metric-value">${ranking.liveDeals}</span>
          <span class="your-stats-metric-label">Live</span>
        </div>
        <div class="your-stats-metric">
          <span class="your-stats-metric-value">${ranking.streak}🔥</span>
          <span class="your-stats-metric-label">Streak</span>
        </div>
      </div>
      ${badges.length > 0 ? `
        <div class="your-stats-badges">
          ${badges.map(b => `
            <span class="badge-icon" title="${b.name}" style="background: ${b.color}20; color: ${b.color}">
              ${b.icon}
            </span>
          `).join('')}
        </div>
      ` : ''}
    </div>
  `;
}

function renderPodium(top3) {
  // Reorder for display: 2nd, 1st, 3rd
  const order = [1, 0, 2];
  
  return `
    <div class="podium-container">
      ${order.map(i => {
        const entry = top3[i];
        if (!entry) return '';
        
        const user = MUSE_CONFIG.getUserById(entry.id);
        const heights = ['200px', '160px', '120px'];
        const colors = ['#daa520', '#c0c0c0', '#cd7f32'];
        const labels = ['🥇', '🥈', '🥉'];
        
        return `
          <div class="podium-item" style="--podium-height: ${heights[i]}">
            <div class="podium-avatar" style="border-color: ${colors[i]}">
              ${MUSE_CONFIG.getInitials(user.name)}
            </div>
            <div class="podium-info">
              <span class="podium-medal">${labels[i]}</span>
              <h4 class="podium-name">${user.name.split(' ')[0]}</h4>
              <p class="podium-points">${entry.points.toLocaleString()} pts</p>
            </div>
            <div class="podium-stand" style="background: linear-gradient(to top, ${colors[i]}, ${adjustColorLight(colors[i], 30)})">
              <span class="podium-rank">${entry.rank}</span>
            </div>
          </div>
        `;
      }).join('')}
    </div>
  `;
}

function renderLeaderboardRow(entry, rank, currentUserId) {
  const user = MUSE_CONFIG.getUserById(entry.id);
  const badges = entry.badges.map(b => MUSE_DATA.BADGES[b]).filter(Boolean);
  const isCurrentUser = entry.id === currentUserId;
  
  return `
    <tr class="${isCurrentUser ? 'current-user-row' : ''}">
      <td>
        <span class="rank-badge rank-${rank <= 3 ? rank : 'default'}">
          ${rank <= 3 ? ['🥇', '🥈', '🥉'][rank-1] : rank}
        </span>
      </td>
      <td>
        <div class="flex items-center gap-3">
          <span class="avatar avatar-sm">${MUSE_CONFIG.getInitials(user.name)}</span>
          <span class="${isCurrentUser ? 'font-semibold' : ''}">${user.name}</span>
        </div>
      </td>
      <td class="text-muted">${user.department}</td>
      <td class="font-semibold">${entry.points.toLocaleString()}</td>
      <td>${entry.wonDeals}</td>
      <td>${entry.liveDeals}</td>
      <td>
        ${entry.streak > 0 ? `<span class="streak-badge">${entry.streak}🔥</span>` : '-'}
      </td>
      <td>
        <div class="flex gap-1">
          ${badges.slice(0, 3).map(b => `
            <span class="badge-icon-sm" title="${b.name}" style="background: ${b.color}20; color: ${b.color}">
              ${b.icon}
            </span>
          `).join('')}
          ${badges.length > 3 ? `<span class="badge-more">+${badges.length - 3}</span>` : ''}
        </div>
      </td>
    </tr>
  `;
}

function renderPointsSystem() {
  const points = [
    { action: 'Won Deal → Live', points: '+100', icon: '🎉' },
    { action: 'Won Deal (PKS Signed)', points: '+50', icon: '📝' },
    { action: 'Stage Progression', points: '+10', icon: '📈' },
    { action: 'Call Report (in 24h)', points: '+5', icon: '📞' },
    { action: 'Meeting/Visit', points: '+5', icon: '🤝' },
    { action: 'First Activity of Day', points: '+2', icon: '☀️' },
    { action: '5-Day Streak Bonus', points: '+20', icon: '🔥' }
  ];
  
  return points.map(p => `
    <div class="point-item">
      <span class="point-icon">${p.icon}</span>
      <span class="point-action">${p.action}</span>
      <span class="point-value">${p.points}</span>
    </div>
  `).join('');
}

function renderBadgesInfo() {
  return Object.entries(MUSE_DATA.BADGES).map(([key, badge]) => `
    <div class="badge-info-item">
      <span class="badge-info-icon" style="background: ${badge.color}20; color: ${badge.color}">
        ${badge.icon}
      </span>
      <div class="badge-info-content">
        <h4 class="badge-info-name">${badge.name}</h4>
        <p class="badge-info-desc">${getBadgeDescription(key)}</p>
      </div>
    </div>
  `).join('');
}

function getBadgeDescription(key) {
  const descriptions = {
    top_performer: 'Ranking #1 dalam leaderboard bulanan',
    fast_closer: 'Menutup deal dalam waktu <14 hari',
    consistent_achiever: 'Mencapai target 3 bulan berturut-turut',
    hot_streak: '5 won deals berturut-turut tanpa drop',
    documentation_hero: '100% call report dalam 24 jam selama 1 bulan',
    big_deal: 'Single deal dengan nilai >1 Miliar',
    rising_star: 'Sales baru (<6 bulan) masuk Top 10',
    team_player: 'Membantu closing 3+ deals tim lain'
  };
  return descriptions[key] || '';
}

function adjustColorLight(color, percent) {
  // Simple lighten function
  return color;
}

// Register route
Router.register('leaderboard', renderLeaderboard);
